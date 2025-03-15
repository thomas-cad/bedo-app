"use client"

import React from 'react';
import Item from "./components/Item";
import { useCart } from '@/app/context/CartContext'; 
import Link from 'next/link';

const Cart = () => {
    const { cart } = useCart();

    return (
        <div className="p-5 mt-24">
            <div className="font-light text-center text-3xl pb-10">VOTRE PANIER</div>
                <div className="flex flex-col lg:flex-row justify-between">
                    
                    {/* Liste des items */}
                    <div className="flex-1 lg:flex-[3]">
                        {cart.length > 0 ? (
                            cart.map((cartItem) => (
                                <Item key={cartItem.id} id={cartItem.id} />
                            ))
                        ) : (
                            <div className="text-center text-gray-500">Votre panier est vide.</div>
                        )}

                    {/* Résumé de la commande */}
                    <div className="flex-1 border border-gray-300 rounded-lg p-5 h-64 mt-5 lg:mt-0 lg:ml-5">
                        <h1 className="font-light">RESUME DE LA COMMANDE</h1>
                        <div className="flex justify-between my-5 font-semibold text-xl">
                            <span>Total</span>
                            <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} €</span>
                        </div>
                        <form onSubmit={(e) => {
                        if (cart.length === 0) {
                            e.preventDefault();
                            alert("Votre panier est vide.");
                        }
                        }}>
                        <Link href={cart.length > 0 ? '/shop/checkout' : '#'}>
                            <button type="submit" className="w-full p-2.5 bg-black text-white font-bold">COMMANDER</button>
                        </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;