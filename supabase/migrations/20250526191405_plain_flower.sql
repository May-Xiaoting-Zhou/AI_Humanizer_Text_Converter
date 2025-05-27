/*
  # Initial Schema Setup

  1. New Tables
    - `user_credits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `credits_remaining` (integer)
      - `plan` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `rewrites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `input_text` (text)
      - `output_text` (text)
      - `created_at` (timestamp)
      
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
*/

-- User Credits Table
CREATE TABLE user_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  credits_remaining integer NOT NULL DEFAULT 10,
  plan text NOT NULL DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credits"
  ON user_credits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits"
  ON user_credits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Rewrites Table
CREATE TABLE rewrites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  input_text text NOT NULL,
  output_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rewrites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewrites"
  ON rewrites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rewrites"
  ON rewrites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert contact messages"
  ON contact_messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to create initial credits for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_credits (user_id, credits_remaining, plan)
  VALUES (new.id, 10, 'free');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create initial credits for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();