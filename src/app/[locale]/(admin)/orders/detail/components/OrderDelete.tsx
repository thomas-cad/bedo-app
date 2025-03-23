import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function OrderDelete({ id }: { id: string }) {
  const router = useRouter(); // Move useRouter to the top level of the component

  const deleteOrder = async () => {
    if (window.confirm('Etes-vous sûr de vouloir supprimer la commande ?')) {
      try {
        await fetch(`/api/order?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        router.push('/orders'); // Use the router instance here
      } catch (err) {
        console.error(err);
        alert('Une erreur est survenue lors de la suppression de la commande.');
      }
    }
  };

  return (
    <div className="py-3">
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        sx={{ color: 'red', borderColor: 'red' }}
        onClick={deleteOrder}
      >
        Supprimer
      </Button>
    </div>
  );
}
