-- Add institutional user fields to existing user_profiles table
-- Run this migration if you already have the user_profiles table created

-- Add user_type column
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS user_type TEXT;

-- Add institutional fields
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS institution_type TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS primary_use_case TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS assets_under_management TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS team_size TEXT;

-- Update existing records to have 'individual' as default user_type
UPDATE user_profiles SET user_type = 'individual' WHERE user_type IS NULL;
