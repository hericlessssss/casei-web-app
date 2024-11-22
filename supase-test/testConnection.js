import { supabase } from './supabaseClient.js';

const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('guests').select('*');
    if (error) {
      console.error('Erro ao conectar ao Supabase:', error);
    } else {
      console.log('Conexão bem-sucedida! Dados:', data);
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
};

testConnection();