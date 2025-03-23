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
    const [order, setOrder] = useState<Order | null>(null); // Track the order
    const [error, setError] = useState(false); // Track the error state
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (!id) {
            console.log("Order " + id + " not found");
            return;
        }

        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/order?id=${id}`);
                if (!response.ok) {
                    setError(true); // Set error state
                    console.log(await response.json());
                    return;
                }
                const data = await response.json();
                setOrder(data["order"]); // Set the order data
                if (!order){
                    setError(true); // Set error state
                    console.log("Order not found");
                }
            } catch (error) {
                setError(true); // Set error state
                console.log(error);
            }
        };

        fetchItem();
    }, [id]);

    if (!order) {
        return <div className="flex flex-col items-center px-1 mt-20">Chargement...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center px-1 mt-20 text-red-500">
                Une erreur s&apos;est produite
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
                <OrderInfo order={order} key={order.id} />
            </div>  
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Detail de la commande
                    </h2>
                </div>
                <OrderDetail productsOrder={order.products} key={order.id} />
            </div>
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Mettre à jour le statut
                    </h2>
                </div>
                <OrderStatus status={order.orderStatus} id={order.id} key={order.id} />
            </div>    
            <div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Supprimer la commande
                    </h2>
                </div>
                <OrderDelete id={order.id} key={order.id} />
            </div>          
        </div>
    );
};

const OrderContentExport = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <OrderContent />
        </Suspense>
    );
};

export default OrderContentExport;