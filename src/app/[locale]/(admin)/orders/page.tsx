import { Order } from "@/interfaces";
import OrderWrapper from "./components/OrderWrapper";

const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/order", { method: 'GET' });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const orders = data.order;

    if (!Array.isArray(orders)) {
      throw new Error('Invalid Order format: orders is not an array');
    }

    return orders.map((order: Order) => ({
      ...order,
    }));
  } catch (err) {
    console.log(err)
    return [];
  }
}

export default async function OrdersPage() {
  const orders = await fetchOrders();

  

  return (
    <div className="pt-20 pb-10">
      <OrderWrapper orders={orders} />
    </div>
  );
}