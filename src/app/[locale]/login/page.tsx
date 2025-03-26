import LoginForm from "./components/LoginForm";
import { getDictionary } from "@/app/lib/dictionaries";

type Params = Promise<{ locale: string }>;

export default async function LogInPage({ params }: { params : Params } ) {
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t.login.connect}
          </h2>
        </div>
        <LoginForm t={t}/>
      </div>
    </div>
  );
}