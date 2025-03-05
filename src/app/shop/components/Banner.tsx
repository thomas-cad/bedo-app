import React from "react";

const BannerShop = () => {
    return (
        <div className="relative w-full h-[75vh] overflow-hidden">
            <img
                src="/image/shop/banner.png"
                alt="Banner"
                className="w-full h-full object-cover object-top" // object-top pour aligner l'image en haut
            />
        </div>
    );
};

export default BannerShop;

