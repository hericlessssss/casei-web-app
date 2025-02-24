/*
  # Update policies for better security and access control

  This migration safely handles policy updates by:
  1. Dropping existing policies if they exist
  2. Recreating them with updated definitions
  3. Ensuring no conflicts with existing policies
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Gifts policies
  DROP POLICY IF EXISTS "Público pode visualizar presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem inserir presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem atualizar presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem deletar presentes" ON gifts;

  -- Settings policies
  DROP POLICY IF EXISTS "Público pode visualizar configurações" ON settings;
  DROP POLICY IF EXISTS "Admins podem atualizar configurações" ON settings;

  -- RSVP policies
  DROP POLICY IF EXISTS "Público pode inserir RSVP" ON rsvp;
  DROP POLICY IF EXISTS "Admins podem visualizar RSVP" ON rsvp;

  -- Messages policies
  DROP POLICY IF EXISTS "Público pode inserir mensagens" ON messages;
  DROP POLICY IF EXISTS "Admins podem visualizar mensagens" ON messages;
  DROP POLICY IF EXISTS "Admins podem deletar mensagens" ON messages;

  -- Admin policies
  DROP POLICY IF EXISTS "Admins podem visualizar lista de admins" ON admins;
END $$;

-- Recreate all policies with updated definitions
-- Gift policies
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
CREATE POLICY "Público pode visualizar configurações" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Admins podem atualizar configurações" ON settings
  FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- RSVP policies
CREATE POLICY "Público pode inserir RSVP" ON rsvp
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins podem visualizar RSVP" ON rsvp
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );

-- Messages policies
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
CREATE POLICY "Admins podem visualizar lista de admins" ON admins
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admins)
  );