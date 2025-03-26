import React from "react";
import Product from "./Product";
import { Item } from "@/interfaces"

const Products = ({ items, locale } : {items:Item[], locale : string}) => {
  return (
    <div className="py-12 p-4">
      <div className="flex flex-wrap -mx-4"> {/* Conteneur flexible */}
        {items.map((item) => (
          <Product key={item.id} item={item} locale={locale}/>
        ))}
      </div>
    </div>
  );
};

export default Products;