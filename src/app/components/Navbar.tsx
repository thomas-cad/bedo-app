"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from '@/app/context/CartContext';
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cart } = useCart();

  // Fonction pour basculer le menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Détection de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Vérifie au montage
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 h-20"
      style={{
        maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
      }}
    >
      <div className="flex justify-between items-center px-6 md:px-10 h-full">
        {/* Left - Hamburger Menu and Logo */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu for small screens */}
          {isMobile && (
            <div className="block md:hidden">
              <IconButton
                className="text-black"
                onClick={toggleMenu}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}

          {/* Logo */}
          <Link href="/">
            <Image
              src="/image/navbar/logo_navbar.png"
              alt="Logo"
              width={120}
              height={64}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Center - Navigation */}
        <nav
          className={`${
            isMenuOpen || !isMobile ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-6 md:gap-10 text-center absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
        >
          {/* Ajoutez vos liens ici */}
          <Link href="/" className="hover:text-[#0cff21]">Accueil</Link>
          <Link href="/shop" className="hover:text-[#0cff21]">Boutique</Link>
          <Link href="/about" className="hover:text-[#0cff21]">À propos</Link>
        </nav>

        {/* Right - Language & Cart */}
        <div className="flex items-center gap-4 md:gap-5">
          <Link href="/shop/cart">
            <IconButton aria-label="cart">
              <Badge
                badgeContent={cart.length.toString()}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#0cff21",
                  },
                }}
              >
                <ShoppingCartOutlinedIcon className="text-black hover:text-[#0cff21]" />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </div>

      {/* Styles pour les media queries personnalisées */}
      <style jsx>{`
        @media (max-width: 768px) {
          .custom-nav {
            display: ${isMenuOpen ? "flex" : "none"};
            flex-direction: column;
            background-color: white;
            width: 100%;
            position: absolute;
            top: 80px;
            left: 0;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;