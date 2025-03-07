"use client"

import React from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from "next/image";


interface ProductProps {
    images_path: string;
}

const MainImage: React.FC<ProductProps> = ({ images_path }) => {
    const [imageId, setImageId] = React.useState(1);
    const PUBLIC_URL = process.env.PUBLIC_URL || '';
    const image = PUBLIC_URL + "/image/" + images_path + "/" + imageId + ".png";
    const image1 = PUBLIC_URL + "/image/" + images_path + "/" + 1 + ".png"
    const image2 = PUBLIC_URL + "/image/" + images_path + "/" + 2 + ".png"
    
    
    return (
        <div className="py-10">
            <div style={{ height: 'calc(100vh - 20rem)', minHeight: '500px', position: 'relative' }}>
                <Image
                    src={image}
                    width={500}
                    height={500}
                    alt="Article Image"
                    className="h-full w-auto object-contain mx-auto"
                />
                <div onClick={() => setImageId(1)} className="p-1 absolute left-0 top-1/2 transform -translate-y-1/2 hover:text-[#0CFF21] cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-gray-100 rounded-full">
                    <ArrowBackIosIcon />
                </div>
                <div onClick={() => setImageId(2)} className="p-1 absolute right-0 top-1/2 transform -translate-y-1/2 hover:text-[#0CFF21] cursor-pointer transition-transform duration-200 hover:scale-110 hover:bg-gray-100 rounded-full">
                    <ArrowForwardIosIcon />
                </div>
            </div>
            <div className="w-fit flex py-3" style={{ height: 'calc(100vh - 50rem)', minHeight: '150px' }}>
                <div className="pr-3">
                    <Image
                        src={image1}
                        width={500}
                        height={500}
                        alt="Article Image"
                        className={`object-contain mx-auto cursor-pointer hover:border-2 hover:border-[#0CFF21] ${imageId === 1 ? 'border-2 border-[#0CFF21]' : ''}`} 
                        onClick={() => setImageId(1)}
                    />
                </div>
                <div>
                    <Image 
                        src={image2} 
                        alt="Article Image" 
                        width={500}
                        height={500}
                        className={`object-contain mx-auto cursor-pointer hover:border-2 hover:border-[#0CFF21] ${imageId === 2 ? 'border-2 border-[#0CFF21]' : ''}`} 
                        onClick={() => setImageId(2)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainImage;
