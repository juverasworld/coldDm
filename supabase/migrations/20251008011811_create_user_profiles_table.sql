/*
  # User Profiles and Wizard Responses

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable for anonymous users)
      - `session_id` (text, unique identifier for localStorage sync)
      - `wizard_completed` (boolean, default false)
      - `goal` (text, user's primary goal)
      - `niche` (text, user's industry/niche)
      - `experience_level` (text, beginner/intermediate/advanced)
      - `budget_preference` (text, free/paid/both)
      - `email_volume` (text, low/medium/high)
      - `current_tools` (jsonb, array of tools they already use)
      - `preferences` (jsonb, additional custom preferences)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policies for users to manage their own profiles
    - Allow anonymous users to create and update profiles via session_id

  3. Indexes
    - Add index on session_id for fast lookups
    - Add index on user_id for authenticated users
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text UNIQUE NOT NULL,
  wizard_completed boolean DEFAULT false,
  goal text,
  niche text,
  experience_level text,
  budget_preference text,
  email_volume text,
  current_tools jsonb DEFAULT '[]'::jsonb,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile by session_id"
  ON user_profiles FOR SELECT
  USING (
    session_id = current_setting('request.jwt.claims', true)::json->>'session_id'
    OR user_id = auth.uid()
  );

CREATE POLICY "Anyone can create profile"
  ON user_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile by session_id"
  ON user_profiles FOR UPDATE
  USING (
    session_id = current_setting('request.jwt.claims', true)::json->>'session_id'
    OR user_id = auth.uid()
  )
  WITH CHECK (
    session_id = current_setting('request.jwt.claims', true)::json->>'session_id'
    OR user_id = auth.uid()
  );

CREATE INDEX IF NOT EXISTS idx_user_profiles_session_id ON user_profiles(session_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
