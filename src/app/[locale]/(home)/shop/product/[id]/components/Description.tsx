import React from "react";
import Typography from "@mui/material/Typography";
import { Item } from "@/interfaces"

const Product = ({ item, locale, t }: { item: Item; locale: string; t: { product: { description: { from: string; tva: string } } } }) => {
    return (
        <div>
            <Typography variant="h5" className="text-b" sx={{ textTransform: "uppercase" }}>
                <strong>{locale === 'fr' ? item.title_fr : item.title_en}</strong>
            </Typography>

            <Typography variant="h6" mt={1}>
                {t.product.description.from} <strong>{item.price} €</strong> {t.product.description.tva}
            </Typography>
        </div>
    );
};

export default Product;
