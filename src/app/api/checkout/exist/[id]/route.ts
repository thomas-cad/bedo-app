import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params

    if (!id) {
        return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id: id },
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error);

        if (error instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: 'Database error', details: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Optional: Ensure this route runs in the Node.js runtime
export const runtime = 'nodejs';