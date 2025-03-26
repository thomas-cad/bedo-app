import { useState, useEffect } from 'react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';

interface PoleFormProps {
  poleId: string;
}

export default function PoleForm({ poleId }: PoleFormProps) {
  const [descriptionFr, setDescriptionFr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (poleId) {
      fetch(`/api/pole?id=${poleId}`)
        .then(res => res.json())
        .then(data => {
          setDescriptionFr(data.poles.description_fr || '');
          setDescriptionEn(data.poles.description_en || '');
          setShow(data.poles.show || false);
        });
    }
  }, [poleId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`/api/pole?id=${poleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description_fr: descriptionFr,
        description_en: descriptionEn,
        show: show,
      }),
    });
    if (!response.ok) {
      alert('Failed to update pole');
    } else {
      alert('Pole updated successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        label="Description FR"
        value={descriptionFr}
        onChange={(e) => setDescriptionFr(e.target.value)}
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label="Description EN"
        value={descriptionEn}
        onChange={(e) => setDescriptionEn(e.target.value)}
        multiline
        rows={4}
      />
      <FormControlLabel
        control={
          <Switch
            checked={show}
            onChange={(e) => setShow(e.target.checked)}
            color="primary"
          />
        }
        label="Show"
      />
      <Button type="submit" variant="contained" color="primary">
        Mettre à jour
      </Button>
    </form>
  );
}