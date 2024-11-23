import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;  // Acessando a variável de ambiente
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;  // Acessando a chave do Supabase

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL ou SUPABASE_KEY não configurados no arquivo .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
