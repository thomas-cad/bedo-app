import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import { Product } from "@/interfaces"

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id') || undefined;

    try {
        const products = await prisma.item_size.findMany({
            where: id ? { id } : {},
            include: {
                item: true,
                size: true,
            },
        });

        if (!products.length) {
            return NextResponse.json({ error: 'No products found' }, { status: 404 });
        }

        const responseProducts: Product[] = products.map(product => ({
            id: product.id,
            itemId: product.item.id,
            title_fr: product.item.title_fr,
            title_en: product.item.title_en,
            sizeId: product.size.id,
            size: product.size.size,
            stock: product.stock,
            preorder: product.preorder,
            description_fr: product.item.description_fr,
            description_en: product.item.description_en,
            price: product.item.price,
            image: product.item.image
        }));

        return NextResponse.json({ products: id ? responseProducts[0] : responseProducts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}