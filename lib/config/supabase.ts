export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
}

export const fileUploadConfig = {
  maxSizeAudio: parseInt(process.env.MAX_FILE_SIZE_AUDIO || '52428800'), // 50MB
  maxSizeVideo: parseInt(process.env.MAX_FILE_SIZE_VIDEO || '209715200'), // 200MB
  allowedAudioFormats: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-m4a'],
  allowedVideoFormats: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
  allowedCloudProviders: ['drive.google.com', 'dropbox.com', 'onedrive.live.com'],
}

export const bucketNames = {
  performances: 'performances',
  avatars: 'avatars',
  thumbnails: 'thumbnails',
} as const

// Validate required environment variables
export function validateEnvironment() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}