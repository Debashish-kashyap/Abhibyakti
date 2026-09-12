import { createClient } from '@/lib/supabase/server'
import { validateEnvironment } from '@/lib/config/supabase'

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  services: {
    database: boolean
    auth: boolean
    storage: boolean
    environment: boolean
  }
  details?: string
}

export async function performHealthCheck(): Promise<HealthCheckResult> {
  const timestamp = new Date().toISOString()
  const services = {
    database: false,
    auth: false,
    storage: false,
    environment: false,
  }

  try {
    // Check environment variables
    validateEnvironment()
    services.environment = true
  } catch (error) {
    console.error('Environment check failed:', error)
  }

  try {
    const supabase = createClient()

    // Check database connection
    const { error: dbError } = await supabase.from('users').select('count').limit(1)
    services.database = !dbError

    // Check auth service
    const { data: authData, error: authError } = await supabase.auth.getSession()
    services.auth = !authError

    // Check storage service (basic connectivity)
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
    services.storage = !storageError

  } catch (error) {
    console.error('Health check failed:', error)
  }

  const allHealthy = Object.values(services).every(Boolean)
  
  return {
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp,
    services,
    details: allHealthy ? undefined : 'One or more services are not responding correctly'
  }
}