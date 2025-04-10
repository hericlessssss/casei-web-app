import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'application/json'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Inicializa o cliente Supabase usando as variáveis de ambiente
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Faz uma consulta simples na tabela settings
    const { data, error } = await supabase
      .from('settings')
      .select('rsvp_enabled')
      .limit(1);

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        status: 'success', 
        message: 'Database connection active',
        timestamp: new Date().toISOString(),
        data 
      }),
      {
        headers: corsHeaders,
        status: 200,
      }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({ 
        status: 'error', 
        message: error.message 
      }),
      {
        headers: corsHeaders,
        status: 500,
      }
    );
  }
});