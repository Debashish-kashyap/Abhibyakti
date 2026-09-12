-- Seed data for development and testing

-- Insert sample users (these will be created through Supabase Auth in real usage)
INSERT INTO users (id, email, display_name, age_group, parent_consent_verified, privacy_settings, notification_preferences) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@abhivyakti.com', 'Admin User', 'adult', true, '{"profile_visibility": "public", "allow_comments": true, "allow_direct_messages": true, "show_in_search": true}', '{"email_notifications": true, "submission_updates": true, "interaction_notifications": true, "community_updates": true}'),
  ('550e8400-e29b-41d4-a716-446655440002', 'parent@example.com', 'Parent User', 'adult', true, '{"profile_visibility": "group", "allow_comments": true, "allow_direct_messages": false, "show_in_search": true}', '{"email_notifications": true, "submission_updates": true, "interaction_notifications": true, "community_updates": false}'),
  ('550e8400-e29b-41d4-a716-446655440003', 'child@example.com', 'Child User', 'child', true, '{"profile_visibility": "group", "allow_comments": true, "allow_direct_messages": false, "show_in_search": false}', '{"email_notifications": false, "submission_updates": true, "interaction_notifications": true, "community_updates": false}');

-- Set parent relationship
UPDATE users SET parent_email = 'parent@example.com' WHERE email = 'child@example.com';

-- Insert sample performances
INSERT INTO performances (id, user_id, title, description, category, file_type, moderation_status, visibility) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Beautiful Classical Song', 'A wonderful rendition of a classical piece', 'music', 'upload', 'approved', 'group'),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'My First Poem', 'A poem about friendship and kindness', 'poetry', 'upload', 'pending', 'group'),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'Story Time Adventure', 'An exciting adventure story for children', 'storytelling', 'link', 'approved', 'group');

-- Insert sample interactions
INSERT INTO interactions (user_id, performance_id, interaction_type) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'like'),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'like'),
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'view'),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'view');

-- Insert sample moderation log
INSERT INTO moderation_log (performance_id, moderator_id, action, reason, notes) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'approve', 'Content appropriate for all ages', 'Beautiful performance, well executed'),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'approve', 'Educational and entertaining', 'Great storytelling for children');

-- Update like counts based on interactions
UPDATE performances SET like_count = (
  SELECT COUNT(*) FROM interactions 
  WHERE interactions.performance_id = performances.id 
  AND interactions.interaction_type = 'like'
);

-- Update view counts based on interactions
UPDATE performances SET view_count = (
  SELECT COUNT(*) FROM interactions 
  WHERE interactions.performance_id = performances.id 
  AND interactions.interaction_type = 'view'
);