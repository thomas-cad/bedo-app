"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../styles/Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [cartCount, setCartCount] = useState(4);

  useEffect(() => {
    // Si vous avez besoin de mettre à jour le nombre d'articles dans le panier côté client
    // setCartCount(newCount);
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
          <Link href="/" className="nav-item">NOTRE LISTE</Link>
          <Link href="/projets" className="nav-item">PROJETS</Link>
          <Link href="/event" className="nav-item">EVENTS</Link>
          <Link href="/shop" className="nav-item">BOUTIQUE</Link>
        </nav>

        {/* Right - Language & Cart */}
        <div className="nav-right">
          <span className="language">EN</span>
          <IconButton aria-label="cart">
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartOutlinedIcon className="cart-icon" />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
