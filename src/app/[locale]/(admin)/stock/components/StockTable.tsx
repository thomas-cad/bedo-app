"use client"

import { useEffect, useState } from "react";
import StockRow from "./StockRow";
import { ProductItem, Item } from "@/interfaces"

async function fetchItems() {
    const res = await fetch("/api/item");
    if (!res.ok) throw new Error("Erreur lors du chargement des produits");
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [data.items];
}

export default function StockTable() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function loadItems() {
            const data = await fetchItems();
            setItems(data);
        }
        loadItems();
    }, []);

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Nom</th>
                    <th className="border p-2">Taille</th>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Stock</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item:Item) =>
                    item.products.map((product: ProductItem) => (
                        <StockRow key={product.id} product={product} name={item.title_fr} item_id={item.id} />
                    ))
                )}
            </tbody>
        </table>
    );
}
