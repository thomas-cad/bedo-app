import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STATUS_VALUES = ['PENDING', 'COMPLETED', 'PAID', 'CANCELLED', 'DELIVERED'];

interface ProductOrder{
  productId: string;
  quantity_total: number;
  quantity_stock: number;
  quantiy_preorder: number;
  size: string;
  sizeId: string;
  name: string;
  itemId: string;
  price: number;
  description: string;
}

async function updateStock(orderItem: ProductOrder) {
  const itemStock = await prisma.item_size.findUnique({ where: { id: orderItem.productId } });
  if (!itemStock) throw new Error(`Item ${orderItem.productId} not found`);

  let quantity_stock, quantity_preorder;
  let new_stock, new_preorder;
  const quantity_total = orderItem.quantity_total;

  if (quantity_total <= itemStock.stock) {
    quantity_stock = quantity_total;
    quantity_preorder = 0;
    new_stock = itemStock.stock - quantity_total;
    new_preorder = itemStock.preorder;
  } else {
    quantity_stock = itemStock.stock;
    quantity_preorder = quantity_total - itemStock.stock;
    new_stock = 0;
    new_preorder = itemStock.preorder + quantity_preorder;
  }

  await prisma.item_size.update({
    where: { id: orderItem.productId },
    data: { stock: new_stock, preorder: new_preorder },
  });

  return { quantity_stock, quantity_preorder };
}

/** GET: Retrieve Orders */
export async function GET(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id') || undefined;

  try {
    const orders = await prisma.order.findMany({
      where: id ? { id } : {},
      include: {
        user: true,
        order_item_size: {
          include: {
            item_size: { include: { item: true, size: true } },
          },
        },
      },
    });

    if (!orders.length) return NextResponse.json({ error: 'No orders found' }, { status: 404 });

    const responseOrders = orders.map(order => ({
      id: order.id,
      userId: order.user.id,
      userFirstName: order.user.first_name,
      userLastName: order.user.last_name,
      userEmail: order.user.email,
      userPhone: order.user.phone,
      orderDate: order.order_date,
      orderStatus: order.status,
      price: order.total,
      products: order.order_item_size.map(item => ({
        productId: item.item_size.id,
        quantity_total: item.total_quantity,
        quantity_stock: item.stock_quantity,
        quantity_preorder: item.preorder_quantity,
        size: item.item_size.size.size,
        sizeId: item.item_size.sizeId,
        name: item.item_size.item.title,
        itemId: item.item_size.itemId,
        price: item.item_size.item.price,
        description: item.item_size.item.description,
      })),
    }));

    return NextResponse.json({ order: id ? responseOrders[0] : responseOrders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/** DELETE: Remove an Order */
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });

  try {
    await prisma.$transaction([
      prisma.order_item_size.deleteMany({ where: { orderId: id } }),
      prisma.order.delete({ where: { id } }),
    ]);

    return NextResponse.json({ message: `Order ${id} deleted` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/** PATCH: Update an Order */
export async function PATCH(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });

  try {
    const newOrder = await request.json();
    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    if (newOrder.orderStatus && !STATUS_VALUES.includes(newOrder.orderStatus)) {
      return NextResponse.json({ error: 'Invalid order status' }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.order_item_size.deleteMany({ where: { orderId: id } }),
    ]);

    let total = 0;
    for (const orderItem of newOrder.products) {
      const { quantity_stock, quantity_preorder } = await updateStock(orderItem);
      total += orderItem.quantity_total * orderItem.price;
      await prisma.order_item_size.create({
        data: {
          orderId: id,
          total_quantity: orderItem.quantity_total,
          stock_quantity: quantity_stock,
          preorder_quantity: quantity_preorder,
          item_sizeId: orderItem.productId,
        },
      });
    }

    await prisma.order.update({ where: { id }, data: { status: newOrder.orderStatus, total } });
    return NextResponse.json({ message: `Order ${id} updated successfully` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/** POST: Create an Order */
export async function POST(request: NextRequest) {
  const newOrder = await request.json();
  let total = 0;

  try {
    const userExists = await prisma.user.findUnique({ where: { id: newOrder.userId } });
    if (!userExists) return NextResponse.json({ error: `User ${newOrder.userId} not found` }, { status: 404 });

    const order = await prisma.order.create({
      data: {
        order_date: newOrder.orderDate || new Date(),
        status: newOrder.orderStatus || 'PENDING',
        total: 0,
        userId: newOrder.userId,
      },
    });

    for (const orderItem of newOrder.products) {
      const { quantity_stock, quantity_preorder } = await updateStock(orderItem);
      total += orderItem.quantity_total * orderItem.price;
      await prisma.order_item_size.create({
        data: {
          orderId: order.id,
          total_quantity: orderItem.quantity_total,
          stock_quantity: quantity_stock,
          preorder_quantity: quantity_preorder,
          item_sizeId: orderItem.productId,
        },
      });
    }

    await prisma.order.update({ where: { id: order.id }, data: { total } });
    return NextResponse.json({ message: `Order ${order.id} created successfully` }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}