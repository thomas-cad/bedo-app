import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const itemId = params.id; // Keep itemId as a string since it's defined as text in the schema

    try {
        const item = await prisma.item.findUnique({
            where: { id: itemId },
        });

        if (!item) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        const sizes = await prisma.item_size.findMany({
            where: { itemId: itemId },
        });

        // Add sizes information to the item
        const itemWithSizes = {
            ...item,
            sizes: await Promise.all(sizes.map(async (size) => {
                const size_name = await prisma.size.findUnique({
                    where: { id: size.sizeId },
                });
                return {
                    size_id: size.id,
                    size: size_name.size,
                    stock: size.stock,
                    uniqueItemId: size.id
                };
            }))
        };

        return NextResponse.json(itemWithSizes);
    } catch (error) {
        console.error('Error fetching item:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
