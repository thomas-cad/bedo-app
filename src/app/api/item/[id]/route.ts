import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: itemId } = await params

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
                    size: size_name ? size_name.size : null,
                    stock: size.stock,
                    uniqueItemId: size.id
                };
            }))
        };

        return NextResponse.json(itemWithSizes);
    } catch (error) {
        console.error('Error fetching item:', error); // Log the error for debugging
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
