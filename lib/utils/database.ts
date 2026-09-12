import { createClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/lib/types'

export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await operation()
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Database operation failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('users').select('count').limit(1)
    return !error
  } catch (error) {
    console.error('Database connection check failed:', error)
    return false
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize
}

export function validateFileType(mimeType: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(mimeType)
}

// Child safety and parental consent utilities
export function validateChildAccountData(userData: {
  age_group: 'child' | 'adult'
  parent_email?: string | null
  parent_consent_verified?: boolean
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (userData.age_group === 'child') {
    if (!userData.parent_email) {
      errors.push('Child accounts must have a parent email')
    }
    
    if (!userData.parent_consent_verified) {
      errors.push('Child accounts require parental consent verification')
    }
    
    if (userData.parent_email && !validateEmail(userData.parent_email)) {
      errors.push('Parent email must be a valid email address')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Performance validation utilities
export function validatePerformanceData(performanceData: {
  file_type: 'upload' | 'link'
  file_url?: string | null
  cloud_link?: string | null
  category: string
  title: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (performanceData.file_type === 'upload') {
    if (!performanceData.file_url) {
      errors.push('Upload type performances must have a file URL')
    }
    if (performanceData.cloud_link) {
      errors.push('Upload type performances should not have a cloud link')
    }
  } else if (performanceData.file_type === 'link') {
    if (!performanceData.cloud_link) {
      errors.push('Link type performances must have a cloud link')
    }
    if (performanceData.file_url) {
      errors.push('Link type performances should not have a file URL')
    }
  }
  
  if (!performanceData.title.trim()) {
    errors.push('Performance title is required')
  }
  
  const validCategories = ['music', 'poetry', 'storytelling', 'acting']
  if (!validCategories.includes(performanceData.category)) {
    errors.push('Invalid performance category')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Interaction validation utilities
export function validateInteractionData(interactionData: {
  interaction_type: 'like' | 'view' | 'comment'
  comment_text?: string | null
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (interactionData.interaction_type === 'comment') {
    if (!interactionData.comment_text || !interactionData.comment_text.trim()) {
      errors.push('Comment interactions must have comment text')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// RLS policy helper functions
export async function checkUserPermissions(
  userId: string,
  action: 'view' | 'create' | 'update' | 'delete',
  resourceType: 'performance' | 'interaction' | 'profile',
  resourceId?: string
): Promise<{ hasPermission: boolean; reason?: string }> {
  try {
    const supabase = createClient()
    
    // Get user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('age_group, parent_consent_verified')
      .eq('id', userId)
      .single()
    
    if (userError || !user) {
      return { hasPermission: false, reason: 'User not found' }
    }
    
    // Check child account permissions
    if (user.age_group === 'child' && !user.parent_consent_verified) {
      return { hasPermission: false, reason: 'Parental consent required' }
    }
    
    // Additional resource-specific checks can be added here
    return { hasPermission: true }
  } catch (error) {
    console.error('Permission check failed:', error)
    return { hasPermission: false, reason: 'Permission check failed' }
  }
}

// Moderation utilities
export async function checkModerationStatus(performanceId: string): Promise<{
  status: 'pending' | 'approved' | 'rejected' | 'flagged' | null
  canView: boolean
}> {
  try {
    const supabase = createClient()
    
    const { data: performance, error } = await supabase
      .from('performances')
      .select('moderation_status')
      .eq('id', performanceId)
      .single()
    
    if (error || !performance) {
      return { status: null, canView: false }
    }
    
    return {
      status: performance.moderation_status,
      canView: performance.moderation_status === 'approved'
    }
  } catch (error) {
    console.error('Moderation status check failed:', error)
    return { status: null, canView: false }
  }
}