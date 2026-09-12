-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  age_group TEXT CHECK (age_group IN ('child', 'adult')) NOT NULL,
  parent_email TEXT,
  parent_consent_verified BOOLEAN DEFAULT FALSE,
  profile_image_url TEXT,
  bio TEXT,
  privacy_settings JSONB DEFAULT '{"profile_visibility": "group", "allow_comments": true, "allow_direct_messages": false, "show_in_search": true}',
  notification_preferences JSONB DEFAULT '{"email_notifications": true, "submission_updates": true, "interaction_notifications": true, "community_updates": false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create performances table
CREATE TABLE performances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('music', 'poetry', 'storytelling', 'acting')) NOT NULL,
  file_url TEXT,
  cloud_link TEXT,
  file_type TEXT CHECK (file_type IN ('upload', 'link')) NOT NULL,
  file_size BIGINT,
  duration_seconds INTEGER,
  thumbnail_url TEXT,
  visibility TEXT CHECK (visibility IN ('group', 'public')) DEFAULT 'group',
  moderation_status TEXT CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')) DEFAULT 'pending',
  moderation_notes TEXT,
  moderated_by UUID REFERENCES users(id),
  moderated_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interactions table
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  performance_id UUID REFERENCES performances(id) ON DELETE CASCADE,
  interaction_type TEXT CHECK (interaction_type IN ('like', 'view', 'comment')) NOT NULL,
  comment_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, performance_id, interaction_type)
);

-- Create moderation_log table
CREATE TABLE moderation_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  performance_id UUID REFERENCES performances(id) ON DELETE CASCADE,
  moderator_id UUID REFERENCES users(id),
  action TEXT CHECK (action IN ('approve', 'reject', 'flag', 'unflag')) NOT NULL,
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age_group ON users(age_group);
CREATE INDEX idx_performances_user_id ON performances(user_id);
CREATE INDEX idx_performances_category ON performances(category);
CREATE INDEX idx_performances_moderation_status ON performances(moderation_status);
CREATE INDEX idx_performances_created_at ON performances(created_at);
CREATE INDEX idx_interactions_user_id ON interactions(user_id);
CREATE INDEX idx_interactions_performance_id ON interactions(performance_id);
CREATE INDEX idx_interactions_type ON interactions(interaction_type);
CREATE INDEX idx_moderation_log_performance_id ON moderation_log(performance_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_performances_updated_at BEFORE UPDATE ON performances
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE performances ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_log ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Users can view approved performances
CREATE POLICY "Users can view approved performances" ON performances
    FOR SELECT USING (moderation_status = 'approved');

-- Users can view their own performances regardless of status
CREATE POLICY "Users can view own performances" ON performances
    FOR SELECT USING (auth.uid()::text = user_id::text);

-- Users can insert their own performances
CREATE POLICY "Users can create performances" ON performances
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Users can update their own performances (before approval)
CREATE POLICY "Users can update own performances" ON performances
    FOR UPDATE USING (auth.uid()::text = user_id::text AND moderation_status = 'pending');

-- Users can view interactions on approved performances
CREATE POLICY "Users can view interactions on approved performances" ON interactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM performances 
            WHERE performances.id = interactions.performance_id 
            AND performances.moderation_status = 'approved'
        )
    );

-- Users can create interactions
CREATE POLICY "Users can create interactions" ON interactions
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Users can delete their own interactions
CREATE POLICY "Users can delete own interactions" ON interactions
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Only moderators can view moderation logs (this will be refined with role-based access)
CREATE POLICY "Moderators can view moderation logs" ON moderation_log
    FOR SELECT USING (true); -- This will be updated when we implement role-based access