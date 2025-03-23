import Sidebar from "./components/SideNav";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <section className="flex-1">{children}</section>
        </div>
    );
}