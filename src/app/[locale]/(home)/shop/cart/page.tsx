import { getDictionary } from "@/app/lib/dictionaries";
import Cart from "./components/Cart"

type Params = Promise<{ locale: string }>;

export default async function HomePage({ params }: { params : Params } ) {
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  return (
    <div>
      <Cart locale={locale} t={t} />
    </div>
  );
}