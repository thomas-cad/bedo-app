"use client";

import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    const PUBLIC_URL = process.env.PUBLIC_URL || '';

    return (
        <footer className="px-4 divide-y dark:bg-gray-100 dark:text-gray-800 h-auto">
            <div className="container flex flex-col py-6 justify-between mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <img src= {PUBLIC_URL+ "/image/logo_BedBusters_couleur.png"} alt="Logo" className="h-32 w-auto object-contain" />
                <div className="grid grid-cols-2  text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                        <div className="space-y-3">
                            <h3 className="uppercase dark:text-gray-900 font-normal">Code source</h3>
                            <ul className="space-y-1">
                                <li>
                                    <a rel="noopener noreferrer" href="https://github.com/thomas-cad/bedo-app" className="hover:text-[#0CFF21]">GitHub</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="https://github.com/thomas-cad/bedo-app/tree/main/doc" className="hover:text-[#0CFF21]">Documentation</a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="https://github.com/thomas-cad/bedo-app/blob/main/README.md" className="hover:text-[#0CFF21]">README</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <div className="uppercase dark:text-gray-900 font-normal">Réseaux Sociaux</div>
                            <div className="flex justify-start space-x-3">
                            <a rel="noopener noreferrer" href="https://www.instagram.com" title="Instagram" className="flex items-center p-1">
                                <InstagramIcon className="hover:text-[#0CFF21]"/>
                            </a>
                            <a rel="noopener noreferrer" href="https://www.facebook.com" title="Facebook" className="flex items-center p-1">
                                <FacebookIcon className="hover:text-[#0CFF21]"/>
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="py-4 text-sm text-center border-t border-gray-300 dark:text-gray-600">© 2025 BedBusters. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
