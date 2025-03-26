"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import OrderInfo from "./components/OrderInfo";
import OrderDetail from "./components/OrderDetail";
import { Order } from "@/interfaces";
import OrderStatus from "./components/OrderStatus";
import OrderDelete from "./components/OrderDelete";
import { Suspense } from "react";

const OrderContent = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | boolean>(false);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (!id) {
            setError(new Error("ID de commande manquant dans l'URL"));
            setIsLoading(false);
            return;
        }

        const fetchItem = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/order?id=${id}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                if (!data.order) {
                    throw new Error("Commande introuvable dans la réponse");
                }
                setOrder(data.order);
                setError(false);
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Erreur inconnue");
                console.error(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (isLoading) {
        return <div className="flex flex-col items-center px-1 mt-20">Chargement...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center px-1 mt-20 text-red-500">
                Une erreur s'est produite
                {error instanceof Error && (
                    <div className="mt-2 text-sm text-gray-600">
                        {error.message}
                    </div>
                )}
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col items-center px-1 mt-20">
                Commande introuvable
            </div>
        );
    }

    return (
        <div className="mt-24 pb-5">
            <div className="pb-5">
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Informations sur la commande
                    </h2>
                </div>
                <OrderInfo order={order} />
            </div>  
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Detail de la commande
                    </h2>
                </div>
                <OrderDetail productsOrder={order.products} />
            </div>
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Mettre à jour le statut
                    </h2>
                </div>
                <OrderStatus status={order.orderStatus} id={order.id} />
            </div>    
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Supprimer la commande
                    </h2>
                </div>
                <OrderDelete id={order.id} />
            </div>          
        </div>
    );
};

const OrderPage = () => {
    return (
        <Suspense fallback={<div className="flex flex-col items-center px-1 mt-20">Chargement...</div>}>
            <OrderContent />
        </Suspense>
    );
};

export default OrderPage;