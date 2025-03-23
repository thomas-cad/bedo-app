"use client";

import React, { useEffect, useState } from "react";
import Return from "./Return";
import ImageProduct from "./ImageProduct";
import Description from "./Description";
import AddToCard from "./AddToCard";
import { Suspense } from "react";
import { Item } from "@/interfaces"

const ProductContent = ({locale, t, id} : {locale: string, t:{ product: { description: { from: string; tva: string }; add_to_cart: { size: string; add: string } } }, id:string}) => {
    const [item, setItem] = useState< Item >();
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!id) {
            setError('No product ID provided');
            return;
        }

        const fetchItem = async () => {
            try {
                const response = await fetch(`/api/item?id=${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItem(data.items);
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
                        <Description item={item} locale={locale} t={t} />
                        <AddToCard item={item} t={t}/>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

const Product = ({locale, t, id} : {locale: string, t:{ product: { description: { from: string; tva: string }; add_to_cart: { size: string; add: string } } }, id:string}) => {
    return (
      <Suspense>
        <ProductContent locale={locale} t={t} id={id} />
      </Suspense>
    )
}

export default Product;