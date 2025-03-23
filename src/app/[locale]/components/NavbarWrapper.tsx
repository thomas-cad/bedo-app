import { getDictionary } from "@/app/lib/dictionaries";
import Navbar from "./Navbar";

export default async function NavbarWrapper({ locale }: { locale: string }) {
    const t = await getDictionary(locale); // Fetch the dictionary for the locale

  return <Navbar t={t} />;
}