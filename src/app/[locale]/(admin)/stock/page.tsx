import StockTable from "./components/StockTable";

export default function StockAdminPage() {
    return (
        <div className="p-6 mt-16">
            <h1 className="text-2xl font-bold mb-4 ">Gestion du Stock</h1>
            <StockTable />
        </div>
    );
}
