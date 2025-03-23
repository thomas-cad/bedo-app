"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from '@/app/[locale]/context/CartContext';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';

const locales = ["en", "fr"];

const Navbar = ({ t }: { t: { navbar: { list: string; project: string; events: string; shop: string } } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();
  const router = useRouter();
  const [, startTransition] = useTransition();

  // Get the current locale from the pathname
  const currentLocale = locales.find((locale) =>
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  ) || "fr"; // Default to 'fr'

  // Function to switch languages
  const switchLanguage = () => {
    let newLocale;
    if ('fr' === currentLocale) {
      newLocale = 'en';
    } else {
      newLocale = 'fr';
    }

    // Replace the old locale in the pathname with the new one
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);

    startTransition(() => {
      router.push(newPathname); // Navigate to the new locale
      document.cookie = `i18nlang=${newLocale}; path=/`; // Save preference in cookie
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu is now", isMenuOpen ? "open" : "closed");
  };

  const getActiveClass = (path: string) => {
    return pathname === path
      ? "text-[#0cff20] font-bold border-b-2 border-[#0cff21]"
      : "text-black";
  };

  const getActiveClassHamburger = (path: string) => {
    return pathname === path
      ? "text-[#0cff20] font-bold"
      : "text-black";
  };

  return (
    <div>
      <div
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 h-20"
        style={{
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-10 h-full">
          <div className="flex items-center gap-4">
            <div className="block md:hidden">
              <IconButton
                className="text-black"
                onClick={toggleMenu}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Link href="/">
              <Image
                src="/image/navbar/logo_navbar.png"
                alt="Logo"
                width={60}
                height={100}
                sizes="100vw"
                className="h-12 md:h-16 w-auto cursor-pointer"
              />
            </Link>
          </div>

          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-6 md:gap-10 text-center absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0`}
          >
            <Link
              href="/"
              className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/")}`}
              onClick={toggleMenu}
            >
              {t.navbar.list.toUpperCase()}
            </Link>
            <Link
              href="/projets"
              className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/projets")}`}
              onClick={toggleMenu}
            >
              {t.navbar.project.toUpperCase()}
            </Link>
            <Link
              href="/event"
              className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/event")}`}
              onClick={toggleMenu}
            >
              {t.navbar.events.toUpperCase()}
            </Link>
            <Link
              href="/shop"
              className={`text-base md:text-lg transition hover:text-[#0cff21] hover:text-lg md:hover:text-xl no-underline ${getActiveClass("/shop")}`}
              onClick={toggleMenu}
            >
              {t.navbar.shop.toUpperCase()}
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
              <IconButton aria-label="cart">  
                <PersonIcon className="text-black hover:text-[#0cff21]" />
              </IconButton>
            <span
              className={`px-4 py-2 rounded hover:text-[#0cff21] cursor-pointer`}
              onClick={() => switchLanguage()}
            >
              {currentLocale.toUpperCase()}
            </span>
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
      {isMenuOpen && (
        <div className="block md:hidden">
          <div className="fixed top-20 w-full z-50 backdrop-blur-md bg-white/10 h-48 flex justify-center items-center">
            <div className="flex flex-col items-center space-y-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <span className={`block transition-all duration-300 ease-out h-1 w-32 rounded-sm mb-1 pb-4 text-center hover:cursor-pointer ${getActiveClassHamburger("/")}`}>{t.navbar.list.toUpperCase()}</span>
              </Link>
              <Link href="/projets" onClick={() => setIsMenuOpen(false)}>
                <span className={`block transition-all duration-300 ease-out h-1 w-32 rounded-sm mb-1 py-4 text-center hover:cursor-pointer ${getActiveClassHamburger("/projets")}`}>{t.navbar.project.toUpperCase()}</span>
              </Link>
              <Link href="/event" onClick={() => setIsMenuOpen(false)}>
                <span className={`block transition-all duration-300 ease-out h-1 w-32 rounded-sm py-4 text-center hover:cursor-pointer ${getActiveClassHamburger("/event")}`}>{t.navbar.events.toUpperCase()}</span>
              </Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)}>
                <span className={`block transition-all duration-300 ease-out h-1 w-32 rounded-sm py-4 text-center hover:cursor-pointer ${getActiveClassHamburger("/shop")}`}>{t.navbar.shop.toUpperCase()}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

