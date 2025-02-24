/*
  # Initial Database Schema Setup

  This migration creates the complete database structure for the wedding website including:
  
  1. Tables
    - gifts (wedding gift registry)
    - settings (application settings)
    - rsvp (guest confirmations)
    - messages (guest messages)
    - admins (administrative users)
  
  2. Security
    - Row Level Security (RLS) enabled for all tables
    - Appropriate policies for public and admin access
  
  3. Initial Data
    - Default settings
*/

-- Create gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  suggested_stores jsonb NOT NULL,
  reserved boolean DEFAULT false,
  reserved_by text,
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id serial PRIMARY KEY,
  rsvp_enabled boolean DEFAULT false
);

-- Create RSVP table
CREATE TABLE IF NOT EXISTS rsvp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  guests_count integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid references auth.users NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Gift policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Público pode visualizar presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem inserir presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem atualizar presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem deletar presentes" ON gifts;
END $$;

CREATE POLICY "Público pode visualizar presentes" ON gifts
  FOR SELECT USING (true);

CREATE POLICY "Admins podem inserir presentes" ON gifts
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM admins)
  );

CREATE POLICY "Admins podem atualizar presentes" ON gifts
  FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

CREATE POLICY "Admins podem deletar presentes" ON gifts
  FOR DELETE USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- Settings policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Público pode visualizar configurações" ON settings;
  DROP POLICY IF EXISTS "Admins podem atualizar configurações" ON settings;
END $$;

CREATE POLICY "Público pode visualizar configurações" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Admins podem atualizar configurações" ON settings
  FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- RSVP policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Público pode inserir RSVP" ON rsvp;
  DROP POLICY IF EXISTS "Admins podem visualizar RSVP" ON rsvp;
END $$;

CREATE POLICY "Público pode inserir RSVP" ON rsvp
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins podem visualizar RSVP" ON rsvp
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- Messages policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Público pode inserir mensagens" ON messages;
  DROP POLICY IF EXISTS "Admins podem visualizar mensagens" ON messages;
  DROP POLICY IF EXISTS "Admins podem deletar mensagens" ON messages;
END $$;

CREATE POLICY "Público pode inserir mensagens" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins podem visualizar mensagens" ON messages
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

CREATE POLICY "Admins podem deletar mensagens" ON messages
  FOR DELETE USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- Admin policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Admins podem visualizar lista de admins" ON admins;
END $$;

CREATE POLICY "Admins podem visualizar lista de admins" ON admins
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- Insert initial settings
INSERT INTO settings (id, rsvp_enabled) VALUES (1, false)
ON CONFLICT (id) DO NOTHING;

-- Add gift reservation check constraint
DO $$ 
BEGIN
  ALTER TABLE gifts DROP CONSTRAINT IF EXISTS gift_reservation_check;
  ALTER TABLE gifts
    ADD CONSTRAINT gift_reservation_check 
    CHECK (
      (reserved = false AND reserved_by IS NULL) OR 
      (reserved = true AND reserved_by IS NOT NULL)
    );
END $$;