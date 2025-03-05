"use client";

import React, { useEffect, useState } from "react";
import Return from "./components/Return";
import Image from "./components/Image";
import Description from "./components/Description";
import AddToCard from "./components/AddToCard";
import { useSearchParams } from 'next/navigation';
import error from "next/error";

import type { Metadata } from 'next';

const Product = () => {

    const [item, setItems] = useState<{ id: string;
        title: string;
        description: string;
        price: number;
        image: string; }[]>([]);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/item/' + id);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                return(<div>Error</div>)
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="flex flex-col items-center px-10">
            <div className="h-8 w-full"></div>
            
            {/* Return reste aligné à gauche */}
            <div className="w-full pt-16">
                <Return />
            </div>

            {/* Container Produit*/}
            <div className="flex flex-col lg:flex-row w-full max-w-4xl items-center justify-center gap-8">
                {/* Image component */}
                <div>
                    <Image images_path={item.image} />
                </div>

                {/* Description component*/}
                <div className="mt-0 lg:mt-8">
                    <Description item={item} />
                    <AddToCard item={item} />
                </div>
            </div>
        </div>
    );
};

export default Product;