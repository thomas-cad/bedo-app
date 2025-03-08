"use client";

import React, { useState } from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from '@/app/context/CartContext';
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const pathname = usePathname();
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction utilitaire pour déterminer la classe active
  // const getActiveClass = (path: string) => {
  //   return pathname === path
  //     ? "text-[#0cff20] font-bold border-b-2 border-[#0cff21]"
  //     : "text-black";
  // };

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
          <div className="block md:hidden">
            <IconButton
              className="text-black"
              onClick={toggleMenu}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>

          {/* Logo */}
          <Link href="/">
            <Image
              src="/image/navbar/logo_navbar.png"
              alt="Logo"
              width={120} // Adjust the width as needed
              height={64} // Adjust the height as needed
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Center - Navigation */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-6 md:gap-10 text-center absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
        >
          {/* <Link
            href="/"
            className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/")}`}
            onClick={toggleMenu}
          >
            NOTRE LISTE
          </Link>
          <Link
            href="/projets"
            className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/projets")}`}
            onClick={toggleMenu}
          >
            PROJETS
          </Link>
          <Link
            href="/event"
            className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/event")}`}
            onClick={toggleMenu}
          >
            EVENTS
          </Link> */}
          {/* <Link
            href="/shop"
            className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/shop")}`}
            onClick={toggleMenu}
          >
            BOUTIQUE
          </Link> */}
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
    </div>
  );
};

export default Navbar;