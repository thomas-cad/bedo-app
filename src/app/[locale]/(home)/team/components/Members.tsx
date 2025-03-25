"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import Member from './Member';
import {Membre} from "@/interfaces"

export default function Members({locale, poleFilter} : {locale : string, poleFilter?: string}) {
  const [membres, setMembres] = useState<Membre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/membre')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch membres');
        }
        return response.json();
      })
      .then((data) => {
        setMembres(data.membres);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredMembers = poleFilter && poleFilter !== 'all' 
    ? membres.filter(membre => 
        membre.poles.some(pole => pole.id === poleFilter))
    : membres;

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

return (
    <div className="flex flex-col items-center">
            <Card 
            sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    margin: '2rem 2rem',
                    padding: '1.5rem',
                    width: '100%', // Set width to 100%
                    maxWidth: '1200px' // Fixed maximum width
            }}
            variant="outlined"
            className='bg-gray-400'
            >
            <CardContent>
                    <Grid container spacing={3}>
                    {filteredMembers.map((membre) => (
                            <Grid item xs={12} sm={6} md={4} key={membre.id}>
                                    <Member membre={membre} locale={locale} />
                            </Grid>
                    ))}
                    </Grid>
            </CardContent>
            </Card>
    </div>
);
}