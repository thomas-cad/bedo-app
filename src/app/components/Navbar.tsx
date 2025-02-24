"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { Badge, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [cartCount, setCartCount] = useState(4);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    // Update the cart count dynamically if needed
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        {/* Left - Logo */}
        <Link href="/">
          <img src="/image/navbar/logo_navbar.png" alt="Logo" className="logo" />
        </Link>

        {/* Center - Navigation */}
        <nav className="nav-menu">
          <Link
            href="/"
            className={`nav-item ${pathname === "/" ? "active-nav" : ""}`}
          >
            NOTRE LISTE
          </Link>
          <Link
            href="/projets"
            className={`nav-item ${pathname === "/projets" ? "active-nav" : ""}`}
          >
            PROJETS
          </Link>
          <Link
            href="/event"
            className={`nav-item ${pathname === "/event" ? "active-nav" : ""}`}
          >
            EVENTS
          </Link>
          <Link
            href="/shop"
            className={`nav-item ${pathname === "/shop" ? "active-nav" : ""}`}
          >
            BOUTIQUE
          </Link>
        </nav>

        {/* Right - Language & Cart */}
        <div className="nav-right">
          <span className="language">EN</span>
          <IconButton aria-label="cart">
            <Badge
              badgeContent={cartCount}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#0CFF21", // Replace with your desired color
                },
              }}
            >
              <ShoppingCartOutlinedIcon className="cart-icon" />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
