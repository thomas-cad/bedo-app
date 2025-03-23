import { getDictionary } from "@/app/lib/dictionaries";
import Product from "./components/Product";

type Params = Promise<{ locale: string, id:string }>;

export default async function ProductPage({ params }: { params : Params } ) {
  const locale = (await params).locale;
  const id = (await params).id;
  const t = await getDictionary(locale);

  return (
    <div>
            <Product locale={locale} t={t} id={id}/>
        </div>
  );
}