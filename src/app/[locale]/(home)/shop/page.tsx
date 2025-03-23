import Shop from "./components/Shop"

type Params = Promise<{ locale: string }>;

export default async function ShopPage({ params }: { params : Params } ) {
  const locale = (await params).locale;

  return (
    <div>
      <Shop locale={locale} />
    </div>
  );
}