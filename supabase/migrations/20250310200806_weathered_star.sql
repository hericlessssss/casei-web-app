/*
  # Criar e configurar tabela de presentes

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

-- Criar a tabela de presentes se não existir
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'gifts') THEN
    CREATE TABLE gifts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      price decimal NOT NULL,
      image text NOT NULL,
      description text NOT NULL,
      suggested_stores jsonb NOT NULL,
      reserved boolean DEFAULT false,
      reserved_by text,
      created_at timestamptz DEFAULT now(),
      CONSTRAINT gift_reservation_check CHECK (
        (reserved = false AND reserved_by IS NULL) OR
        (reserved = true AND reserved_by IS NOT NULL)
      )
    );
  END IF;
END $$;

-- Habilitar Row Level Security
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houverem
DO $$ BEGIN
  DROP POLICY IF EXISTS "Público pode visualizar presentes" ON gifts;
  DROP POLICY IF EXISTS "Público pode reservar presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem inserir presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem atualizar presentes" ON gifts;
  DROP POLICY IF EXISTS "Admins podem deletar presentes" ON gifts;
END $$;

-- Criar novas políticas
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