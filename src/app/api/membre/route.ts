import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import { Membre, PoleMembre } from "@/interfaces"


const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    
    const id = request.nextUrl.searchParams.get('id') || undefined;

    try {
        const membres = await prisma.membre.findMany({
            where: id ? { id } : {},
            include: {
            pole_membre: {
                    include: {
                        pole: true,
                    },
                },
            },
        });

        if (!membres.length) {
            return NextResponse.json({ error: 'Membre not found' }, { status: 404 });
        }

        const responseMembres: Membre[] = membres.map(membre => ({
            id: membre.id,
            first_name: membre.first_name,
            last_name: membre.last_name,
            role_fr: membre.role_fr,
            role_en: membre.role_en,
            image: membre.image ?? '',
            poles: membre.pole_membre.map((poleMembre): PoleMembre => ({
                id: poleMembre.pole.id,
                name_fr: poleMembre.pole.name_fr,
                name_en: poleMembre.pole.name_en,
                description_fr: poleMembre.pole.description_fr ?? '',
                description_en: poleMembre.pole.description_en ?? '',
                respo: poleMembre.respo,
                show: poleMembre.pole.show
            })),
        }));

        return NextResponse.json({ membres: id ? responseMembres[0] : responseMembres }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}