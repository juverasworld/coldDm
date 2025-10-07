/*
  # Cold Email OS Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `goal` (text)
      - `stage` (text) - Current stage in the setup process
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `templates`
      - `id` (uuid, primary key)
      - `name` (text)
      - `framework` (text) - PAS, AIDA, BAB
      - `subject` (text)
      - `content` (text)
      - `variables` (jsonb) - Dynamic variables in the template
      - `created_at` (timestamptz)
    
    - `tools`
      - `id` (uuid, primary key)
      - `category` (text) - lead_generation, email_sending, tracking, etc.
      - `name` (text)
      - `description` (text)
      - `link` (text)
      - `is_free` (boolean)
      - `icon` (text) - Icon name from lucide-react
      - `created_at` (timestamptz)
    
    - `questions`
      - `id` (uuid, primary key)
      - `step` (integer)
      - `text` (text)
      - `type` (text) - text, select, multiselect
      - `options` (jsonb)
      - `next_step` (integer)
      - `created_at` (timestamptz)
    
    - `user_responses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `question_id` (uuid, foreign key)
      - `response` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for templates, tools, and questions
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text DEFAULT '',
  goal text DEFAULT '',
  stage text DEFAULT 'welcome',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  framework text NOT NULL,
  subject text NOT NULL,
  content text NOT NULL,
  variables jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read templates"
  ON templates FOR SELECT
  TO authenticated
  USING (true);

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  link text NOT NULL,
  is_free boolean DEFAULT true,
  icon text DEFAULT 'Tool',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read tools"
  ON tools FOR SELECT
  TO authenticated
  USING (true);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step integer NOT NULL,
  text text NOT NULL,
  type text NOT NULL,
  options jsonb DEFAULT '[]'::jsonb,
  next_step integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

-- User responses table
CREATE TABLE IF NOT EXISTS user_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  response jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own responses"
  ON user_responses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses"
  ON user_responses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own responses"
  ON user_responses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own responses"
  ON user_responses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_responses_user_id ON user_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_step ON questions(step);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);