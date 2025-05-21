'use client';

import { spyCatsApi } from '@/components/spy-cats/api';
import { SpyCat } from '@/components/spy-cats/schemas';
import { SpyCatForm } from '@/components/spy-cats/SpyCatForm';
import { SpyCatsList } from '@/components/spy-cats/SpyCatsList';
import { useEffect, useState } from 'react';

export default function Home() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCats = async () => {
    try {
      setIsLoading(true);
      const data = await spyCatsApi.getAll();
      setCats(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch spy cats');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Spy Cats Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add New Spy Cat</h2>
          <SpyCatForm onSuccess={fetchCats} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Spy Cats List</h2>
          {isLoading ? (
            <p>Loading spy cats...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <SpyCatsList cats={cats} onUpdate={fetchCats} />
          )}
        </div>
      </div>
    </div>
  );
}
