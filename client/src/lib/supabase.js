import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

const noopSubscription = {
  data: {
    subscription: {
      unsubscribe: () => {},
    },
  },
};

const createFallbackClient = () => {
  const makeQueryBuilder = () => {
    const builder = {
      select: () => builder,
      eq: () => builder,
      order: async () => ({ data: [], error: null }),
      insert: async () => ({
        error: new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'),
      }),
    };

    return builder;
  };

  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => noopSubscription,
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({
        error: new Error('Supabase is not configured. Login is disabled.'),
      }),
      signUp: async () => ({
        error: new Error('Supabase is not configured. Signup is disabled.'),
      }),
    },
    from: () => makeQueryBuilder(),
  };
};

if (!isSupabaseConfigured) {
  console.warn('Supabase environment variables are missing. Auth and saved packages are disabled.');
}

export { isSupabaseConfigured };
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createFallbackClient();
