import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Regex officielle pour un CUID (commence par "c" suivi de 24 caractères alphanumériques)
const CUID_REGEX = /^c[a-z0-9]{24}$/;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: itemId } = await params

    // 1. Validation stricte de l'ID (doit être un CUID)
    if (!CUID_REGEX.test(itemId)) {
        return NextResponse.json({ error: 'Invalid item ID format' }, { status: 400 });
    }

    try {
        const item_stock = await prisma.item_size.findFirst({
            where: {
                id: itemId
            }
        });

        const item_product = await prisma.item.findFirst({
            where: {
                id: item_stock?.itemId
            }
        });

        const size = await prisma.size.findFirst({
            where: {
                id: item_stock?.sizeId
            }
        });

        const item = {
            id: item_product?.id,
            title: item_product?.title,
            size: size?.size,
            price: item_product?.price,
            image: item_product?.image,
            unique_item_size_id: item_stock?.id,
        }

        // 3. Retourne l'élément trouvé (ou une 404 si rien n'est trouvé)
        if (!item_stock || !item_product) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(item);
    } catch (error) {
        console.error('Error fetching item with sizes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
