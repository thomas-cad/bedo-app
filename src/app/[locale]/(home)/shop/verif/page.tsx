"use client"

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';


const VerifPageContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [error, setError] = useState('');
    const [id, setId] = useState("")

    useEffect(() => {
        if (!token) return; // Attend que l'ID soit disponible

        // Appel        l'API pour v      rifier l'existence de la commande
        const checkOrderExistence = async () => {
            try {
                const response = await fetch(`/api/checkout/verif?token=${token}`);
                const data = await response.json();

                if (data.success) {
                    setError('');
                    setId(data.id)
                } else {
                    router.push('/');
                }
            } catch (err) {
                setError('Une erreur est survenue lors de la vérification de la commande.');
                console.error(err);
            }
        };

        checkOrderExistence();
    }, [token, router]);

    if (error) {
        return <p className="text-center text-red-500 mt-20">{error}</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">👻 Votre commande a été validée 👻</h1>
                <p className="text-gray-600 mb-4">
                    Votre commande avec l&apos;ID{' '}
                    <strong style={{ color: '#0CFF21' }}>{id}</strong> a bien été confirmée.
                </p>
                <p>Si tes produits sont en stocks nous t&apos;attendons dès maintenant. Si tes produits sont en <strong style={{ color: '#0CFF21' }}>précommandes ta commande ne sera validée qu&apos;après réception de ton paiement</strong>.</p>
            </div>
        </div>
    );
};

const VerifPage = () => {
    return (
      <Suspense>
        <VerifPageContent />
      </Suspense>
    )
}

export default VerifPage;