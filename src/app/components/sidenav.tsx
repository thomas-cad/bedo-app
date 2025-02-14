"use client"; // Assurez-vous que c'est un composant client

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Folder, Calendar } from "lucide-react"; // Icônes Lucide

const navLinks = [
  { name: "HomePage", href: "/", icon: <Home size={20} /> },
  { name: "Projets", href: "/projets", icon: <Folder size={20} /> },
  { name: "Events", href: "/event", icon: <Calendar size={20} /> },
];

export default function SideNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen flex flex-col bg-gray-900 text-white p-4 transition-all duration-300 ease-in-out z-50 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Bouton d'ouverture/fermeture */}
      <button
        className="p-2 rounded-md hover:bg-gray-700 mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation */}
      <nav>
        <h1 className={`text-xl font-bold mb-6 ${isOpen ? "block" : "hidden"}`}>
          Mon Dashboard
        </h1>
        <ul className="space-y-3">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                {link.icon} {isOpen && <span>{link.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
