"use client"

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { ProductItem } from "@/interfaces"


async function updateStock(id: string, stock: number, item_id:string) {
    try{
        await fetch(`/api/item?id=${item_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ products: [{ id, stock }] }),
        });
    }catch(err){
        console.log(err)
    }
}

export default function StockRow({ product, name, item_id}: { product: ProductItem, name: string, item_id:string}) {
    const [stock, setStock] = useState(product.stock);

    const handleUpdate = async () => {
        await updateStock(product.id, stock, item_id);
    };

    return (
        <tr className="border">
            <td className="border p-2">{name}</td>
            <td className="border p-2">{product.size}</td>
            <td className="border p-2">{product.id}</td>
            <td className="border p-2 flex gap-2">
                <TextField
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    size="small"
                />
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Mettre à jour
                </Button>
            </td>
        </tr>
    );
}
