import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Ajuda a diagnosticar deploy sem variáveis de ambiente configuradas
  console.error('Supabase: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não definidos.');
}

export const supabase = createClient(url, anonKey);
