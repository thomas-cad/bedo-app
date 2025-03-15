import React from "react";
import Product from "./Product";

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsProps {
  items: Item[];
}

const Products: React.FC<ProductsProps> = ({ items }) => {
  return (
    <div className="py-12 p-4">
      <div className="flex flex-wrap -mx-4"> {/* Conteneur flexible */}
        {items.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;