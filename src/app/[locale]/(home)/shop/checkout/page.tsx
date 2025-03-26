import { getDictionary } from "@/app/lib/dictionaries";
import CheckoutWrapper from './components/CheckoutWrapper';
import { sessionUtils } from "@/utils/session";

type Params = { locale: string };

export default async function CheckoutPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params; // Await the params if it's a Promise
  const { locale } = resolvedParams; // Destructure locale after resolving params
  const t = await getDictionary(locale);

  // Fetch user session data on the server side
  const user = await sessionUtils.getUserFromSession();

  return (
    <CheckoutWrapper 
      locale={locale} 
      translations={t} 
      user={user} // Pass user data as a prop
    />
  );
}