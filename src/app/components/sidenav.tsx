"use client"; // Assurez-vous que c'est un composant client (si vous utilisez des hooks)

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, Calendar } from "lucide-react"; // Icônes Lucide

const navLinks = [
  { name: "HomePage", href: "/", icon: <Folder size={20} /> },
  { name: "Projets", href: "/projets", icon: <Folder size={20} /> },
  { name: "Events", href: "/event", icon: <Calendar size={20} /> },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-gray-800/50 backdrop-blur-md text-white p-4">
      <h1 className="text-xl font-bold mb-6">Mon Dashboard</h1>
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
              {link.icon} {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
