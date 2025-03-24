"use client"

import { useState } from 'react';
import PoleForm from './components/PoleForm';
import PoleSelector from './components/PoleSelector';


export default function AdminPage() {
  const [selectedPoleId, setSelectedPoleId] = useState('');

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-2xl font-bold mb-4">Administration des Pôles</h1>
      <div className='py-6'>
         <PoleSelector onPoleSelect={setSelectedPoleId} />
      </div>
      <div className='py-6'>
        {selectedPoleId && <PoleForm poleId={selectedPoleId} />}
      </div>
    </div>
  );
}