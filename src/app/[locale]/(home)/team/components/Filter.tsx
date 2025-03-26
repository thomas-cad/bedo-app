'use client'

import { useEffect, useState } from 'react';
import { Pole } from '@/interfaces';

export default function Filter({ 
  t, 
  locale,
  selectedPole,
  onPoleChange
}: { 
  t: {team:{select:string, all:string}}, 
  locale: string,
  selectedPole: string,
  onPoleChange: (poleId: string) => void
}) {
  const [poles, setPoles] = useState<Pole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoles = async () => {
      try {
        const response = await fetch('/api/pole');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des pôles');
        }
        const data = await response.json();
        setPoles(data.poles);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setLoading(false);
      }
    };

    fetchPoles();
  }, []);

  const handlePoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const poleId = event.target.value;
    onPoleChange(poleId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <select
          id="pole-select"
          onChange={handlePoleChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0CFF21] focus:border-[#0CFF21]"
          value={selectedPole}
        >
          <option value="" disabled>{t.team.select}</option>
          <option value="all">{t.team.all}</option>
          {poles.map((pole) => (
            <option key={pole.id} value={pole.id}>
              {locale === 'fr' ? pole.name_fr : pole.name_en}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}