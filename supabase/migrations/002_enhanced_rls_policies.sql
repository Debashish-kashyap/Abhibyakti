-- Enhanced Row Level Security Policies and Constraints for Child Safety
-- Migration: 002_enhanced_rls_policies.sql

-- Drop existing policies to replace with enhanced versions
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can view approved performances" ON performances;
DROP POLICY IF EXISTS "Users can view own performances" ON performances;
DROP POLICY IF EXISTS "Users can create performances" ON performances;
DROP POLICY IF EXISTS "Users can update own performances" ON performances;
DROP POLICY IF EXISTS "Users can view interactions on approved performances" ON interactions;
DROP POLICY IF EXISTS "Users can create interactions" ON interactions;
DROP POLICY IF EXISTS "Users can delete own interactions" ON interactions;
DROP POLICY IF EXISTS "Moderators can view moderation logs" ON moderation_log;

-- Additional constraints for data integrity and child safety
ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS check_parent_email_for_child 
    CHECK (
        (age_group = 'child' AND parent_email IS NOT NULL) OR 
        (age_group = 'adult')
    );

ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS check_child_consent_verification
    CHECK (
        (age_group = 'child' AND parent_consent_verified = true) OR 
        (age_group = 'adult')
    );

ALTER TABLE performances ADD CONSTRAINT IF NOT EXISTS check_file_url_or_cloud_link
    CHECK (
        (file_type = 'upload' AND file_url IS NOT NULL AND cloud_link IS NULL) OR
        (file_type = 'link' AND cloud_link IS NOT NULL AND file_url IS NULL)
    );

ALTER TABLE interactions ADD CONSTRAINT IF NOT EXISTS check_comment_text_for_comment_type
    CHECK (
        (interaction_type = 'comment' AND comment_text IS NOT NULL) OR
        (interaction_type IN ('like', 'view'))
    );

-- Enhanced RLS Policies

-- Users table policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Parents can view child profile" ON users
    FOR SELECT USING (
        parent_email IN (
            SELECT email FROM users WHERE auth.uid()::text = id::text
        )
    );

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (
        auth.uid()::text = id::text AND
        (age_group = 'adult' OR parent_consent_verified = true)
    );

-- Performances table policies
CREATE POLICY "Users can view approved performances" ON performances
    FOR SELECT USING (moderation_status = 'approved');

CREATE POLICY "Users can view own performances" ON performances
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Parents can view child performances" ON performances
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM users 
            WHERE parent_email IN (
                SELECT email FROM users WHERE auth.uid()::text = id::text
            )
        )
    );

CREATE POLICY "Users can create performances" ON performances
    FOR INSERT WITH CHECK (
        auth.uid()::text = user_id::text AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND (age_group = 'adult' OR parent_consent_verified = true)
        )
    );

CREATE POLICY "Users can update own performances" ON performances
    FOR UPDATE USING (
        auth.uid()::text = user_id::text AND 
        moderation_status = 'pending' AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND (age_group = 'adult' OR parent_consent_verified = true)
        )
    );

-- Interactions table policies
CREATE POLICY "Users can view interactions on approved performances" ON interactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM performances 
            WHERE performances.id = interactions.performance_id 
            AND performances.moderation_status = 'approved'
        )
    );

CREATE POLICY "Users can view own interactions" ON interactions
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create interactions" ON interactions
    FOR INSERT WITH CHECK (
        auth.uid()::text = user_id::text AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND (age_group = 'adult' OR parent_consent_verified = true)
        ) AND
        EXISTS (
            SELECT 1 FROM performances 
            WHERE id = performance_id 
            AND moderation_status = 'approved'
        )
    );

CREATE POLICY "Users can delete own interactions" ON interactions
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Moderation log policies
CREATE POLICY "Moderators can view moderation logs" ON moderation_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE auth.uid()::text = id::text 
            AND age_group = 'adult'
            -- Additional moderator role check would go here when implemented
        )
    );

CREATE POLICY "Moderators can create moderation logs" ON moderation_log
    FOR INSERT WITH CHECK (
        auth.uid()::text = moderator_id::text AND
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND age_group = 'adult'
            -- Additional moderator role check would go here when implemented
        )
    );

-- Create function to validate parental consent for child accounts
CREATE OR REPLACE FUNCTION validate_child_account_operations()
RETURNS TRIGGER AS $$
BEGIN
    -- For child accounts, ensure parent consent is verified
    IF NEW.age_group = 'child' THEN
        IF NEW.parent_email IS NULL THEN
            RAISE EXCEPTION 'Child accounts must have a parent email';
        END IF;
        
        IF NEW.parent_consent_verified = false THEN
            RAISE EXCEPTION 'Child accounts require parental consent verification';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for child account validation
CREATE TRIGGER validate_child_account_trigger
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION validate_child_account_operations();

-- Create function to automatically set moderation status for new performances
CREATE OR REPLACE FUNCTION set_performance_moderation_status()
RETURNS TRIGGER AS $$
BEGIN
    -- All new performances start as pending moderation
    NEW.moderation_status = 'pending';
    NEW.view_count = 0;
    NEW.like_count = 0;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for performance moderation status
CREATE TRIGGER set_performance_moderation_trigger
    BEFORE INSERT ON performances
    FOR EACH ROW
    EXECUTE FUNCTION set_performance_moderation_status();

-- Create function to update performance counts when interactions change
CREATE OR REPLACE FUNCTION update_performance_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment counts for new interactions
        IF NEW.interaction_type = 'like' THEN
            UPDATE performances 
            SET like_count = like_count + 1 
            WHERE id = NEW.performance_id;
        ELSIF NEW.interaction_type = 'view' THEN
            UPDATE performances 
            SET view_count = view_count + 1 
            WHERE id = NEW.performance_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement counts for deleted interactions
        IF OLD.interaction_type = 'like' THEN
            UPDATE performances 
            SET like_count = GREATEST(like_count - 1, 0) 
            WHERE id = OLD.performance_id;
        ELSIF OLD.interaction_type = 'view' THEN
            UPDATE performances 
            SET view_count = GREATEST(view_count - 1, 0) 
            WHERE id = OLD.performance_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for performance count updates
CREATE TRIGGER update_performance_counts_trigger
    AFTER INSERT OR DELETE ON interactions
    FOR EACH ROW
    EXECUTE FUNCTION update_performance_counts();

-- Create function to log moderation actions
CREATE OR REPLACE FUNCTION log_moderation_action()
RETURNS TRIGGER AS $$
BEGIN
    -- Log moderation status changes
    IF OLD.moderation_status IS DISTINCT FROM NEW.moderation_status THEN
        INSERT INTO moderation_log (
            performance_id, 
            moderator_id, 
            action, 
            notes
        ) VALUES (
            NEW.id,
            NEW.moderated_by,
            CASE 
                WHEN NEW.moderation_status = 'approved' THEN 'approve'
                WHEN NEW.moderation_status = 'rejected' THEN 'reject'
                WHEN NEW.moderation_status = 'flagged' THEN 'flag'
                ELSE 'update'
            END,
            NEW.moderation_notes
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for moderation logging
CREATE TRIGGER log_moderation_action_trigger
    AFTER UPDATE ON performances
    FOR EACH ROW
    EXECUTE FUNCTION log_moderation_action();