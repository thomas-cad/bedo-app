import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Regex officielle pour un CUID (commence par "c" suivi de 24 caractères alphanumériques)
const CUID_REGEX = /^c[a-z0-9]{24}$/;

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const itemId = params.id;

    // 1. Validation stricte de l'ID (doit être un CUID)
    if (!CUID_REGEX.test(itemId)) {
        return NextResponse.json({ error: 'Invalid item ID format' }, { status: 400 });
    }

    try {
        // 2. Requête sécurisée sur la vue (prisma.$queryRaw gère les paramètres liés)
        const itemWithSizes = await prisma.$queryRaw`
            SELECT * FROM item_size_view WHERE unique_item_size_id = ${itemId}
        `;

        // 3. Retourne l'élément trouvé (ou une 404 si rien n'est trouvé)
        if (!itemWithSizes || itemWithSizes.length === 0) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(itemWithSizes);
    } catch (error) {
        console.error('Error fetching item with sizes:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
