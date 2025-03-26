import { getDictionary } from "@/app/lib/dictionaries";
import TeamContainer from "./components/TeamContainer";

type Params = Promise<{ locale: string }>;

export default async function TeamPage({ params }: { params : Params } ) {
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  return (
    <div className="mt-24">
      <h1 className="text-2xl font-bold text-center">{t.team.title}</h1>
    <TeamContainer locale={locale} t={t} />
    </div>
  );
}