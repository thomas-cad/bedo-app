import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import { Item, ItemPatch, ProductItemPatch } from "@/interfaces"
import { sessionUtils } from "@/utils/session"

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id') || undefined;

    try {
        const items = await prisma.item.findMany({
            where: id ? { id } : {},
            include: {
              item_size: {
                include: {
                  size: true
                }
              }
            },
        });

        if (!items.length) {
            return NextResponse.json({ error: 'No products found' }, { status: 404 });
        }

        const responseProducts: Item[] = items.map(item => ({
            id: item.id,
            title_fr: item.title_fr,
            title_en: item.title_en,
            description_fr: item.description_fr,
            description_en: item.description_en,
            price: item.price,
            image: item.image,
            products: item.item_size.map(product => 
              ({
                id: product.id,
                sizeId: product.size.id,
                size: product.size.size,
                stock: product.stock,
                preorder: product.preorder
              })
            )
        }));

        return NextResponse.json({ items: id ? responseProducts[0] : responseProducts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    if (await sessionUtils.isConnected() === false){
          return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }
    
      if (await sessionUtils.isAdminConnected() === false){
          return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }

    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });


    try {
        const newItem:ItemPatch = await request.json();
        const existingItem = await prisma.item.findUnique({ where: { id } });
        if (!existingItem) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    
        if (!newItem || newItem.products.length === 0) {
            return NextResponse.json({ error: 'Invalid products' }, { status: 400 });
        }

        for (const product of newItem.products as ProductItemPatch[]){
            await prisma.item_size.update({
                where: { id: product.id },
                data: { stock: product.stock }
            });
        }

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}