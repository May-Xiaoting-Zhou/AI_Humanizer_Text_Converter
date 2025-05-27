import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface CreditsState {
  credits: number;
  plan: string;
  loading: boolean;
  fetchCredits: () => Promise<void>;
  useCredit: () => Promise<void>;
}

export const useCreditsStore = create<CreditsState>((set, get) => ({
  credits: 0,
  plan: 'free',
  loading: true,
  
  fetchCredits: async () => {
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits_remaining, plan')
      .single();
      
    if (error) throw error;
    
    set({
      credits: data.credits_remaining,
      plan: data.plan,
      loading: false,
    });
  },
  
  useCredit: async () => {
    const currentCredits = get().credits;
    if (currentCredits <= 0) throw new Error('No credits remaining');
    
    const { error } = await supabase
      .from('user_credits')
      .update({ credits_remaining: currentCredits - 1 })
      .single();
      
    if (error) throw error;
    set({ credits: currentCredits - 1 });
  },
}));