import React from "react";
import Image from "next/image";

const Intro = ({ t } : {t : {"home" : {"presentation" : string, "title" : string}}}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg text-center">
        <div className="flex justify-center mb-4">
            <Image src={"/image/logo_BedBusters_couleur.png"} alt="Campaign Logo" width={200} height={200} className="rounded-full" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t.home.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: t.home.presentation }} />
    </div>
  );
};

export default Intro;
