import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;  // destructure id from params

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
        return NextResponse.json({ error: 'Internal Server Error', details: (error as any).message }, { status: 500 });
    } finally {
        // Optional: Disconnect Prisma client if you're done with it
        await prisma.$disconnect();
    }
}
