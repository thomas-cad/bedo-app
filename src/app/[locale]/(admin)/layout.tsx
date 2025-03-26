import Sidebar from "./components/SideNav";
import { sessionUtils } from "@/utils/session"

export default async function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAdmin = await sessionUtils.isAdminConnected();

    if(isAdmin === false){
        return(
          <div className="mt-24 flex flex-col items-center justify-center">
            <div className="text-center"></div>
              <h1 className="text-2xl font-bold">Access Forbidden</h1>
              <p className="mt-4">You do not have permission to view this page.</p>
          </div>
        )
      }

    return (
        <div className="flex">
            <Sidebar />
            <section className="flex-1">{children}</section>
        </div>
    );
}