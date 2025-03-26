import { getDictionary } from "@/app/lib/dictionaries";
import HeroSection from "./components/HeroSection";
import Intro from "./components/Intro";

type Params = Promise<{ locale: string }>;

export default async function HomePage({ params }: { params : Params } ) {
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  return (
    <div>
      <div>
        <HeroSection />
      </div>
      <div className="py-6">
        <Intro t={t}/>
      </div>
    </div>
  );
}