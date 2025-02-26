import React from "react";
import Return from "./components/Return";
import Image from "./components/Image";
import Description from "./components/Description";
import AddToCard from "./components/AddToCard";

interface ProductProps {
    item: {
        id: string;
        title: string;
        description: string;
        price: number;
        image: string;
    };
}

const defaultItem = {
    id: "1",
    title: "Sweat Shirt BedBusters",
    description: "This is a default product description.",
    price: 40,
    image: "/shop/pull"
};

const Product = () => {
    const item = defaultItem;

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