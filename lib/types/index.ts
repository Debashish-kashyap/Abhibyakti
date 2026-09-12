import { Database } from './database'

export type User = Database['public']['Tables']['users']['Row']
export type Performance = Database['public']['Tables']['performances']['Row']
export type Interaction = Database['public']['Tables']['interactions']['Row']
export type ModerationLog = Database['public']['Tables']['moderation_log']['Row']

export interface PrivacySettings {
  profile_visibility: 'public' | 'group' | 'private'
  allow_comments: boolean
  allow_direct_messages: boolean
  show_in_search: boolean
}

export interface NotificationPreferences {
  email_notifications: boolean
  submission_updates: boolean
  interaction_notifications: boolean
  community_updates: boolean
}

export interface PerformanceWithUser extends Performance {
  user?: User
}

export interface InteractionWithUser extends Interaction {
  user?: User
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// File Upload Types
export interface FileUploadConfig {
  maxSizeAudio: number
  maxSizeVideo: number
  allowedAudioFormats: string[]
  allowedVideoFormats: string[]
  allowedCloudProviders: string[]
}

// Moderation Types
export interface ModerationAction {
  action: 'approve' | 'reject' | 'flag' | 'unflag'
  reason?: string
  notes?: string
}

// Search and Filter Types
export interface SearchFilters {
  category?: 'music' | 'poetry' | 'storytelling' | 'acting'
  age_group?: 'child' | 'adult'
  date_from?: string
  date_to?: string
  moderation_status?: 'pending' | 'approved' | 'rejected' | 'flagged'
}

export interface SearchParams extends SearchFilters {
  query?: string
  page?: number
  limit?: number
  sort_by?: 'created_at' | 'updated_at' | 'view_count' | 'like_count'
  sort_order?: 'asc' | 'desc'
}