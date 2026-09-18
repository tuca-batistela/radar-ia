import { createClient } from "@supabase/supabase-js";

function criarCliente() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return { supabase: null, isSupabaseConfigured: false };
  }

  try {
    return {
      supabase: createClient(url, anonKey),
      isSupabaseConfigured: true,
    };
  } catch {
    return { supabase: null, isSupabaseConfigured: false };
  }
}

export const { supabase, isSupabaseConfigured } = criarCliente();
