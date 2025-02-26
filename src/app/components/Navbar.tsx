"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(4);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDisappointed, setIsDisappointed] = useState(false); // Nouvel état pour la déception
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDisappointment = () => {
    setIsDisappointed(!isDisappointed);
  };

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 h-20 mask-image">
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
            <img
              src="/image/navbar/logo_navbar.png"
              alt="Logo"
              className="h-12 md:h-16 cursor-pointer"
            />
          </Link>
        </div>

        {/* Center - Navigation */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-6 md:gap-10 text-center absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
        >
            <Link
            href="/"
            className={`text-black text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${
              pathname === "/" ? "text-[#0cff20] font-bold border-b-2 border-[#0cff21]" : ""
            } ${isDisappointed ? "text-green-500" : ""}`}
            onClick={toggleMenu}
            >
            NOTRE LISTE
            </Link>
          <Link
            href="/projets"
            className={`text-black text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${
              pathname === "/projets" ? "text-[#0cff20] font-bold border-b-2 border-[#0cff21]" : ""
            } ${isDisappointed ? "text-green-500" : ""}`}
            onClick={toggleMenu}
          >
            PROJETS
          </Link>
          <Link
            href="/event"
            className={`text-black text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${
              pathname === "/event" ? "text-[#0cff20] font-bold border-b-2 border-[#0cff21]" : ""
            } ${isDisappointed ? "text-green-500" : ""}`}
            onClick={toggleMenu}
          >
            EVENTS
          </Link>
          <Link
            href="/shop"
            className={`text-black text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${
              pathname === "/shop" ? "text-[#0cff20] font-bold border-b-2 border-[#0cff21]" : ""
            } ${isDisappointed ? "text-green-500" : ""}`}
            onClick={toggleMenu}
          >
            BOUTIQUE
          </Link>
        </nav>

        {/* Right - Language & Cart */}
        <div className="flex items-center gap-4 md:gap-5">
          <IconButton aria-label="cart">
            <Badge
              badgeContent={cartCount}
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;