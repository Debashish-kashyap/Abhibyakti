export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string
          age_group: 'child' | 'adult'
          parent_email: string | null
          parent_consent_verified: boolean
          profile_image_url: string | null
          bio: string | null
          privacy_settings: Json
          notification_preferences: Json
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          display_name: string
          age_group: 'child' | 'adult'
          parent_email?: string | null
          parent_consent_verified?: boolean
          profile_image_url?: string | null
          bio?: string | null
          privacy_settings?: Json
          notification_preferences?: Json
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          age_group?: 'child' | 'adult'
          parent_email?: string | null
          parent_consent_verified?: boolean
          profile_image_url?: string | null
          bio?: string | null
          privacy_settings?: Json
          notification_preferences?: Json
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      performances: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: 'music' | 'poetry' | 'storytelling' | 'acting'
          file_url: string | null
          cloud_link: string | null
          file_type: 'upload' | 'link'
          file_size: number | null
          duration_seconds: number | null
          thumbnail_url: string | null
          visibility: 'group' | 'public'
          moderation_status: 'pending' | 'approved' | 'rejected' | 'flagged'
          moderation_notes: string | null
          moderated_by: string | null
          moderated_at: string | null
          view_count: number
          like_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: 'music' | 'poetry' | 'storytelling' | 'acting'
          file_url?: string | null
          cloud_link?: string | null
          file_type: 'upload' | 'link'
          file_size?: number | null
          duration_seconds?: number | null
          thumbnail_url?: string | null
          visibility?: 'group' | 'public'
          moderation_status?: 'pending' | 'approved' | 'rejected' | 'flagged'
          moderation_notes?: string | null
          moderated_by?: string | null
          moderated_at?: string | null
          view_count?: number
          like_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: 'music' | 'poetry' | 'storytelling' | 'acting'
          file_url?: string | null
          cloud_link?: string | null
          file_type?: 'upload' | 'link'
          file_size?: number | null
          duration_seconds?: number | null
          thumbnail_url?: string | null
          visibility?: 'group' | 'public'
          moderation_status?: 'pending' | 'approved' | 'rejected' | 'flagged'
          moderation_notes?: string | null
          moderated_by?: string | null
          moderated_at?: string | null
          view_count?: number
          like_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      interactions: {
        Row: {
          id: string
          user_id: string
          performance_id: string
          interaction_type: 'like' | 'view' | 'comment'
          comment_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          performance_id: string
          interaction_type: 'like' | 'view' | 'comment'
          comment_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          performance_id?: string
          interaction_type?: 'like' | 'view' | 'comment'
          comment_text?: string | null
          created_at?: string
        }
      }
      moderation_log: {
        Row: {
          id: string
          performance_id: string
          moderator_id: string | null
          action: 'approve' | 'reject' | 'flag' | 'unflag'
          reason: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          performance_id: string
          moderator_id?: string | null
          action: 'approve' | 'reject' | 'flag' | 'unflag'
          reason?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          performance_id?: string
          moderator_id?: string | null
          action?: 'approve' | 'reject' | 'flag' | 'unflag'
          reason?: string | null
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}