import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  
  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  },
  
  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },
  
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
}));

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    useAuthStore.getState().setUser({
      id: session.user.id,
      email: session.user.email!,
    });
  } else {
    useAuthStore.getState().setUser(null);
  }
});