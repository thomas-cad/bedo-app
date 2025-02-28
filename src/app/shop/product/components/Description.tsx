import React from "react";
import Typography from "@mui/material/Typography";


interface ProductProps {
    item: {
        id: string;
        title: string;
        description: string;
        price: number;
        image: string;
    };
}

const Product: React.FC<ProductProps> = ({ item }) => {
    return (
        <div>
            <Typography variant="h5" className="text-b" sx={{ textTransform: "uppercase" }}>
                <strong>{item.title}</strong>
            </Typography>
            
            <Typography variant="h6" mt={1}>
                à partir de <strong>{item.price} €</strong> TVA incluse
            </Typography>
        </div>
    );
};

export default Product;
