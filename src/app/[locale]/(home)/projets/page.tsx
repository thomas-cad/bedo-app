import { getDictionary } from "@/app/lib/dictionaries";
import Projects from "./components/Projects";

type Params = Promise<{ locale: string }>;

export default async function ProjetPage({ params }: { params: Params }) {
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  // Add a fallback for `t.projet` or `t.projet.title`
  const projetTitle = t.projet?.title || "Il parrait que les programmes de campagnes arrivent ;)";

  return (
    <div className="mt-24">
      <h1 className="text-2xl font-bold text-center">{projetTitle}</h1>
      <div>
        <Projects locale={locale} />
      </div>
    </div>
  );
}