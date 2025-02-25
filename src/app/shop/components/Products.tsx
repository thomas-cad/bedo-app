import React from 'react';
import Product from './Product';

// Define the type for an item
interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

// Define the props for the Products component
interface ProductsProps {
  items: Item[];
}

const Products: React.FC<ProductsProps> = ({ items }) => {
  return (
    <div className="py-12 flex justify-center p-4">
      {items.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Products;