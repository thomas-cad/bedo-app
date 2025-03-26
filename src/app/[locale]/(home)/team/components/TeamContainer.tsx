'use client'

import { useState } from 'react';
import Members from "./Members";
import Filter from "./Filter";

export default function TeamContainer({ locale, t }: { 
  locale: string, 
  t: {team:{select:string, all:string}} 
}) {
  const [selectedPole, setSelectedPole] = useState('all');

  return (
    <>
      <div>
        <Filter 
          locale={locale} 
          t={t} 
          selectedPole={selectedPole}
          onPoleChange={setSelectedPole}
        />
      </div>
      <div>
        <Members 
          locale={locale} 
          poleFilter={selectedPole !== 'all' ? selectedPole : undefined} 
        />
      </div>
    </>
  );
}