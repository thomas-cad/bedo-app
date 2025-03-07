import React from "react";
import Image from "next/image";

const BannerShop = () => {
    return (
        <div className="relative w-full h-[75vh] overflow-hidden">
            <Image
                src="/image/shop/banner.png"
                alt="Banner"
                width={1920}
                height={1080}
                className="object-cover object-top" // object-top pour aligner l'image en haut
            />
        </div>
    );
};

export default BannerShop;

