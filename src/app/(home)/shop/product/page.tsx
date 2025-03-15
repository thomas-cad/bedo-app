"use client";

import React, { useEffect, useState } from "react";
import Return from "./components/Return";
import ImageProduct from "./components/ImageProduct";
import Description from "./components/Description";
import AddToCard from "./components/AddToCard";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

const ProductContent = () => {
    const [item, setItem] = useState<{ id: string; title: string; description: string; price: number; image: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        if (!id) {
            setError('No product ID provided');
            return;
        }

        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/item/id?id=${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
        return <div className="text-red-500 flex flex-col items-center px-1 mt-20">Erreur: {error}</div>;
    }

    if (!item) {
        return <div className="flex flex-col items-center px-1 mt-20">Chargement...</div>;
    }

    return (
        <Suspense>
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
                        <ImageProduct images_path={item.image} />
                    </div>

                    {/* Description component*/}
                    <div className="mt-0 lg:mt-8">
                        <Description item={item} />
                        <AddToCard item={item} />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

const Product = () => {
    return (
      <Suspense>
        <ProductContent />
      </Suspense>
    )
}

export default Product;