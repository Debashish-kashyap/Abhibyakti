import { NextResponse } from 'next/server'
import { validateEnvironment } from '@/lib/config/supabase'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const timestamp = new Date().toISOString()
    const services = {
      database: false,
      auth: false,
      storage: false,
      environment: false,
    }

    // Check environment variables
    try {
      validateEnvironment()
      services.environment = true
    } catch (error) {
      console.error('Environment check failed:', error)
    }

    // Basic connectivity check without using cookies
    try {
      // Simple check that doesn't require authentication
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
        }
      })
      services.database = response.ok
      services.auth = response.ok
      services.storage = response.ok
    } catch (error) {
      console.error('Supabase connectivity check failed:', error)
    }

    const allHealthy = Object.values(services).every(Boolean)
    
    const healthResult = {
      status: allHealthy ? 'healthy' : 'unhealthy' as const,
      timestamp,
      services,
      details: allHealthy ? undefined : 'One or more services are not responding correctly'
    }
    
    return NextResponse.json(healthResult, {
      status: healthResult.status === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}