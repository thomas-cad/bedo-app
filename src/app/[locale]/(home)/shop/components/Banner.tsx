import React from "react";
import Image from "next/image";

const BannerShop = () => {
    return (
        <div className="relative w-full h-[75vh] overflow-hidden">
            <Image
                src="/image/shop/banner.png"
                alt="Banner"
                fill
                style={{
                    objectFit: "cover",
                    objectPosition: "top",
                }}
            />
        </div>
    );
};

export default BannerShop;

