// app/register/page.tsx (Server Component)
import { redirect } from 'next/navigation';
import { sessionUtils } from '@/utils/session';
import RegisterForm from './components/RegisterForm';
import { getDictionary } from "@/app/lib/dictionaries";

type Params = Promise<{ locale: string }>;

export default async function RegisterPage({ params }: { params : Params }) {
  // Check session on server side
  const userExists = await sessionUtils.userFromSessionExist();
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  if (userExists) {
    redirect("/" + locale + '/');
  }

  return <RegisterForm t= {t}/>;
}