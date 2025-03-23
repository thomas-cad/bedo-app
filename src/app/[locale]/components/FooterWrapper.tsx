import { getDictionary } from "@/app/lib/dictionaries";
import Footer from "./Footer";

export default async function NavbarWrapper({ locale }: { locale: string }) {
    const t = await getDictionary(locale); // Fetch the dictionary for the locale

  return <Footer t={t} />;
}