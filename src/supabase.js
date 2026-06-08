// ============================================
//  SMT — Conexión a Supabase
//  Este archivo conecta la app con la base de datos.
// ============================================
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vwdviikyhimzikxoasjd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3ZHZpaWt5aGltemlreG9hc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDgzMjIsImV4cCI6MjA5NDUyNDMyMn0.-xf4-d2-rFEC299v2udYawm9tIjs1SyS5BRvw0hHXT8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,        // guarda la sesión aunque cierres la app
    autoRefreshToken: true,      // mantiene la sesión viva
    detectSessionInUrl: false,
  },
});
