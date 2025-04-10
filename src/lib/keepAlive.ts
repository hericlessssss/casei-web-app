import { supabase } from './supabaseClient';

export const setupKeepAlive = () => {
  const INTERVAL = 5 * 60 * 1000; // 5 minutos
  
  // Get the base URL without any trailing slashes
  const baseUrl = import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, '');
  const apiUrl = `${baseUrl}/functions/v1/keep-alive`;

  const keepAlive = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Keep-alive request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Keep-alive successful:', data);
    } catch (error) {
      console.error('Keep-alive error:', error);
    }
  };

  // Executa imediatamente na primeira vez
  keepAlive();

  // Configura o intervalo
  const intervalId = setInterval(keepAlive, INTERVAL);

  // Retorna uma função de limpeza para quando o componente for desmontado
  return () => clearInterval(intervalId);
};