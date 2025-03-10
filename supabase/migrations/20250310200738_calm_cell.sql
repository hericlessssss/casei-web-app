/*
  # Criar tabela de presentes

  1. Nova Tabela
    - `gifts`
      - `id` (uuid, chave primária)
      - `name` (texto, não nulo)
      - `price` (decimal, não nulo)
      - `image` (texto, não nulo)
      - `description` (texto, não nulo)
      - `suggested_stores` (jsonb, não nulo)
      - `reserved` (booleano, padrão false)
      - `reserved_by` (texto, opcional)
      - `created_at` (timestamp com timezone, padrão now())

  2. Segurança
    - Habilitar RLS na tabela `gifts`
    - Adicionar políticas para:
      - Leitura pública
      - Inserção/atualização/deleção apenas por admins
*/

-- Criar a tabela de presentes
CREATE TABLE IF NOT EXISTS gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  suggested_stores jsonb NOT NULL,
  reserved boolean DEFAULT false,
  reserved_by text,
  created_at timestamptz DEFAULT now(),
  -- Garantir que se reserved for false, reserved_by deve ser null
  CONSTRAINT gift_reservation_check CHECK (
    (reserved = false AND reserved_by IS NULL) OR
    (reserved = true AND reserved_by IS NOT NULL)
  )
);

-- Habilitar Row Level Security
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Público pode visualizar presentes"
  ON gifts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Público pode reservar presentes"
  ON gifts
  FOR UPDATE
  TO public
  USING (reserved = false)
  WITH CHECK (reserved = true);

CREATE POLICY "Admins podem inserir presentes"
  ON gifts
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM admins WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins podem atualizar presentes"
  ON gifts
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admins podem deletar presentes"
  ON gifts
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admins WHERE user_id = auth.uid()
  ));