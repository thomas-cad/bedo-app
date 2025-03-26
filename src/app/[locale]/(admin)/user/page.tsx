"use client";
import { useState } from 'react';
import { TextField, Button, Alert, CircularProgress, Typography, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async () => {
    if (!email) {
      setError('Veuillez entrer une adresse email');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la recherche');
      }
      
      const userData: User = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async () => {
    if (!user) return;

    if (user.isAdmin) {
      setError('Cet utilisateur est déjà admin');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/user?id=${encodeURIComponent(user.id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: true }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la mise à jour');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setSuccess('Utilisateur promu admin avec succès');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 mt-24">
      <Paper className="max-w-2xl mx-auto p-6" elevation={3}>
        <Typography variant="h4" component="h1" className="mb-6 text-center" gutterBottom>
          Panel d'Administration
        </Typography>

        <Box className="mb-6 py-6">
          <Typography variant="h6" component="h2" className="mb-4">
            Rechercher un utilisateur
          </Typography>
          
          <div className="flex gap-2 py-6">
            <TextField
              fullWidth
              label="Email de l'utilisateur"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
              startIcon={<SearchIcon />}
            >
              Rechercher
            </Button>
          </div>
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}

        {loading && (
          <div className="flex justify-center my-4">
            <CircularProgress />
          </div>
        )}

        {user && (
          <div className="mt-6 p-4 border rounded-lg bg-white">
            <Typography variant="h6" component="h3" className="mb-2">
              Informations de l'utilisateur
            </Typography>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Typography variant="subtitle2">Nom</Typography>
                <Typography>{user.last_name}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2">Prénom</Typography>
                <Typography>{user.first_name}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2">Email</Typography>
                <Typography>{user.email}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2">Téléphone</Typography>
                <Typography>{user.phone || 'Non renseigné'}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2">Statut</Typography>
                <Typography className={user.isAdmin ? 'text-green-600 font-bold' : ''}>
                  {user.isAdmin ? 'Administrateur' : 'Utilisateur standard'}
                </Typography>
              </div>
            </div>

            {!user.isAdmin && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleMakeAdmin}
                disabled={loading}
                startIcon={<AdminPanelSettingsIcon />}
                className="mt-2"
              >
                Passer en Admin
              </Button>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
}