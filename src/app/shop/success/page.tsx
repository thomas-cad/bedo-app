import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CommandePage = () => {
    const router = useRouter();
    const { id } = router.query; // Récupère l'ID de la commande depuis l'URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return; // Attend que l'ID soit disponible

        // Appel à l'API pour vérifier l'existence de la commande
        const checkOrderExistence = async () => {
            try {
                const response = await fetch(`/api/checkout/exist/${id}`);
                const data = await response.json();

                if (data.success) {
                    // Si la commande existe, on affiche un message de succès
                    setError(null);
                } else {
                    // Si la commande n'existe pas, on redirige vers la home page
                    router.push('/');
                }
            } catch (err) {
                setError('Une erreur est survenue lors de la vérification de la commande.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        checkOrderExistence();
    }, [id, router]);

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Commande validée !</h1>
            <p>Votre commande avec l'ID <strong>{id}</strong> a été confirmée.</p>
        </div>
    );
};

export default CommandePage;