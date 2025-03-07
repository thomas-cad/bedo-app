"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';

interface Item {
    id: string;
    title: string;
    size: string;
    price: number;
    image: string;
    unique_item_size_id: string;
}

const Item = ({ id }: { id: string }) => {
    const [item, setItem] = useState<Item | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const { cart, removeFromCart, AddOneToCart, RemoveOneFromCart } = useCart();

    const getArticleQuantity = useCallback((uniqueItemId: string): number => {
        const articleInCart = cart.find((item) => item.id === uniqueItemId);
        return articleInCart ? articleInCart.quantity : 0;
    }, [cart]);

    const quantity = useMemo(() => getArticleQuantity(id), [id, getArticleQuantity]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/item_stock/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item details');
                }
                const data = await response.json();
                setItem(data);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchItem();
    }, [id]);

    if (error) {
        return <div className="text-red-500">Erreur: {error}</div>;
    }

    if (!item) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="flex-1 lg:flex-[3]">
            <div className="flex flex-col md:flex-row justify-between mb-5">
                <div className="relative flex flex-col md:flex-row flex-[2]">
                <Image
                    className="w-52 mx-auto md:mx-0"
                    width={150}
                    height={150}
                    src={"/image/" + item.image + "/1.png"}
                    alt={item.title}
                />


                    <div className="p-5 flex flex-col justify-around">
                        <span><b>Product:</b> {item.title}</span>
                        <span><b>ID:</b> {item.unique_item_size_id}</span>
                        <span><b>Size:</b> {item.size}</span>
                    </div>

                    <div className="p-5 flex flex-col justify-center items-center ml-auto">
                        <span className="text-2xl font-light pb-4">{item.price}€</span>

                        <div className="flex items-center space-x-3 mt-2">
                            <Remove
                                className={`hover:cursor-pointer hover:text-red-500 ${quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={quantity === 0 ? undefined : () => RemoveOneFromCart(id)}
                            />
                            <span className="text-xl">{quantity}</span>
                            <Add
                                className="hover:cursor-pointer hover:text-green-500"
                                onClick={() => AddOneToCart(id)}
                            />
                        </div>

                        <button
                            className="mt-3 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-700"
                            onClick={() => removeFromCart(id)}
                            aria-label="Supprimer l'article"
                        >
                            <DeleteIcon fontSize="small" /> Supprimer
                        </button>
                    </div>
                </div>
            </div>
            <hr className="bg-gray-300 border-none h-px" />
        </div>
    );
};

export default Item;