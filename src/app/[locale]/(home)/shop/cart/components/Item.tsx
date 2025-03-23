"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '@/app/[locale]/context/CartContext';
import Image from 'next/image';
import {Product} from "@/interfaces"

const ProductItem = ({ id, locale, t }: { id: string, locale: string, t: { cart: { "cart": string, "error": string, "loading": string, "product": string, "size": string, "delete": string } } }) => {
    const [product, setProduct] = useState<Product>();
    const [error, setError] = useState<string | null>(null);

    const { cart, removeFromCart, AddOneToCart, RemoveOneFromCart } = useCart();

    const getArticleQuantity = useCallback((uniqueProductId: string): number => {
        const articleInCart = cart.find((product) => product.id === uniqueProductId);
        return articleInCart ? articleInCart.quantity : 0;
    }, [cart]);

    const quantity = useMemo(() => getArticleQuantity(id), [id, getArticleQuantity]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/product?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data.products);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchProduct();
    }, [id]);

    if (error) {
        return <div className="text-red-500">{t.cart.error}: {error}</div>;
    }

    if (!product) {
        return <div>{t.cart.loading}</div>;
    }

    return (
        <div className="flex-1 lg:flex-[3]">
            <div className="flex flex-col md:flex-row justify-between mb-5">
                <div className="relative flex flex-col md:flex-row flex-[2]">
                    <Image
                        className="w-52 mx-auto md:mx-0"
                        width={150}
                        height={150}
                        src={"/image" + product.image + "/1.png"}
                        alt={locale === 'fr' ? product.title_fr : product.title_en}
                    />

                    <div className="p-5 flex flex-col justify-around">
                        <span><b>{t.cart.product}:</b> {locale === 'fr' ? product.title_fr : product.title_en}</span>
                        <span><b>ID:</b> {product.id}</span>
                        <span><b>{t.cart.size}:</b> {product.size}</span>
                    </div>

                    <div className="p-5 flex flex-col justify-center items-center ml-auto">
                        <span className="text-2xl font-light pb-4">{product.price}€</span>

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
                            aria-label={t.cart.delete}
                        >
                            <DeleteIcon fontSize="small" /> {t.cart.delete}
                        </button>
                    </div>
                </div>
            </div>
            <hr className="bg-gray-300 border-none h-px" />
        </div>
    );
};

export default ProductItem;