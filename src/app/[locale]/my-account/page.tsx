import ClientComponent from "./components/ClientComponent";
import { User } from "@/interfaces";
import { sessionUtils } from "@/utils/session";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/lib/dictionaries";

type Params = Promise<{ locale: string }>;

export default async function MyAccountPage({ params }: { params : Params } ) {
  const session = await sessionUtils.getSession();
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  if (!session) {
    redirect("/" + locale +"/login");
  }

  const userExists = await sessionUtils.userFromSessionExist();

  if (!userExists) {
    redirect("/" + locale +"/signup");
  }

  const user = (await sessionUtils.getUserFromSession()) as User;

  return <ClientComponent user={user} locale={locale} t={t} />;
}