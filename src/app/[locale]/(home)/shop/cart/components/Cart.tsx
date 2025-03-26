"use client"

import React from 'react';
import Item from "./Item";
import { useCart } from '@/app/[locale]/context/CartContext'; 
import Link from 'next/link';

const Cart = ({ locale, t }: { locale: string; t: { cart: { "cart": string, "error": string, "loading": string, "product": string, "size": string, "delete": string, "summary":string, "order":string, "empty":string} } }) => {
    const { cart } = useCart();

    return (
        <div className="p-5 mt-24">
            <div className="font-light text-center text-3xl pb-10">{t.cart.cart}</div>
            <div className="flex flex-col lg:flex-row justify-between">
                
                {/* Liste des items */}
                <div className="flex-1 lg:flex-[3]">
                    {cart.length > 0 ? (
                        cart.map((cartItem) => (
                            <Item key={cartItem.id} id={cartItem.id} t={t} locale={locale} />
                        ))
                    ) : (
                        <div className="text-center text-gray-500">{t.cart.empty}</div>
                    )}
                </div>

                {/* Résumé de la commande */}
                <div className="flex-1 border border-gray-300 rounded-lg p-5 h-64 mt-5 lg:mt-0 lg:ml-5">
                    <h1 className="font-light">{t.cart.summary}</h1>
                    <div className="flex justify-between my-5 font-semibold text-xl">
                        <span>Total</span>
                        <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} €</span>
                    </div>
                    <form
                        onSubmit={(e) => {
                            if (cart.length === 0) {
                                e.preventDefault();
                                alert(t.cart.empty);
                            }
                        }}
                    >
                        <Link href={cart.length > 0 ? '/shop/checkout' : '#'}>
                            <button type="submit" className="w-full p-2.5 bg-black text-white font-bold">
                                {t.cart.order}
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Cart;