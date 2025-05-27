import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Rewrite {
  id: string;
  input_text: string;
  output_text: string;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [rewrites, setRewrites] = useState<Rewrite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRewrites = async () => {
      if (!user) {
        setLoading(false);
        // Should be handled by protected route, but good to have a check
        setError("User not authenticated."); 
        return;
      }

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('rewrites')
          .select('id, input_text, output_text, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }
        setRewrites(data || []);
      } catch (err: any) {
        console.error('Error fetching rewrites:', err);
        setError(err.message || 'Failed to fetch rewrites.');
      } finally {
        setLoading(false);
      }
    };

    fetchRewrites();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 text-center">
          <p className="text-xl text-gray-700">Loading your dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 text-center">
          <p className="text-xl text-red-600">Error: {error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Your Rewrites Dashboard
          </h1>
          {rewrites.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              You haven't saved any rewrites yet. Start by using the text processor!
            </p>
          ) : (
            <div className="space-y-6">
              {rewrites.map((rewrite) => (
                <div key={rewrite.id} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Original Text:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap bg-gray-100 p-3 rounded-md">{rewrite.input_text}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Rewritten Text:</h3>
                    <p className="text-blue-700 whitespace-pre-wrap bg-blue-50 p-3 rounded-md">{rewrite.output_text}</p>
                  </div>
                  <p className="text-xs text-gray-400 text-right">
                    Saved on: {new Date(rewrite.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;