"use client"

import { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface Pole {
  id: string;
  name_fr: string;
}

export default function PoleSelector({ onPoleSelect }: { onPoleSelect: (id: string) => void }) {
  const [poles, setPoles] = useState<Pole[]>([]);
  const [selectedPoleId, setSelectedPoleId] = useState('');

  useEffect(() => {
    fetch('/api/pole')
      .then(res => res.json())
      .then(data => setPoles(data.poles))
      .catch(err => console.error('Failed to fetch poles:', err));
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const poleId = event.target.value as string;
    setSelectedPoleId(poleId);
    onPoleSelect(poleId);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="pole-select-label">Sélectionnez un pôle</InputLabel>
      <Select
        labelId="pole-select-label"
        value={selectedPoleId}
        label="Sélectionnez un pôle"
        onChange={handleChange}
      >
        {poles.map(pole => (
          <MenuItem key={pole.id} value={pole.id}>{pole.name_fr}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}