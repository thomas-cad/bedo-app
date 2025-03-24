import { getDictionary } from "@/app/lib/dictionaries";

type Params = Promise<{ locale: string }>;

export default async function ProjetPage({ params }: { params : Params } ) {
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  return (
    <div className="mt-24">
      <h1 className="text-2xl font-bold text-center">{t.team.title}</h1>
      <div>

      </div>
    </div>
  );
}