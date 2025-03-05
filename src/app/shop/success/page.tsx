"use client"

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Metadata } from 'next';


const CommandePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
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
                    setError('');
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
        return <p className="text-center text-gray-600">Chargement en cours...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">👻 Commande validée ! 👻</h1>
                <p className="text-gray-600 mb-4">
                    Votre commande avec l'ID{' '}
                    <strong style={{ color: '#0CFF21' }}>{id}</strong> a été confirmée.
                </p>
                <p className="text-gray-600 mb-6">
                    Vous avez reçu un email pour confirmer votre commande. Vous avez{' '}
                    <strong style={{ color: '#0CFF21' }}>1 heure</strong> pour valider votre
                    commande, sinon elle sera automatiquement supprimée.
                </p>
            </div>
        </div>
    );
};

export default CommandePage;