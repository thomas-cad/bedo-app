import React from "react";
import AddIcon from '@mui/icons-material/Add';

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
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"> {/* Ajout de mb-8 pour l'espacement */}
      <div className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer group">
        {/* Première image */}
        <img
          src={`/image${item.image}/1.jpg`}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {/* Deuxième image (au survol) */}
        <img
          src={`/image${item.image}/2.jpg`}
          alt={item.title}
          className="w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 absolute top-0 left-0"
        />
        {/* AddIcon en bas à droite */}
        <div className="absolute bottom-0 right-0 m-2 group-hover:text-[#0CFF21]">
          <AddIcon style={{ fontSize: 35 }} />
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-xl uppercase hover:text-[#0CFF21] hover:cursor-pointer text-left">{item.title}</h3>
        <p className="text-gray-700 uppercase text-left font-medium">{item.price}€</p>
      </div>
    </div>
  );
};

export default Product;