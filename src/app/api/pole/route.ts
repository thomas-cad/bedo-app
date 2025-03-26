import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import { Pole, MembrePole, PolePatch } from "@/interfaces"
import { sessionUtils } from "@/utils/session"

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id') || undefined;

    try {
        const poles = await prisma.pole.findMany({
            where: id ? { id } : {},
            include: {
            pole_membre: {
                    include: {
                        membre: true,
                    },
                },
            },
        });

        if (!poles.length) {
            return NextResponse.json({ error: 'Pole not found' }, { status: 404 });
        }

        const responsePoles: Pole[] = poles.map(pole => ({
            id: pole.id,
            name_fr: pole.name_fr,
            name_en: pole.name_en,
            description_fr: pole.description_fr ?? '',
            description_en: pole.description_en ?? '',
            show:pole.show,
            membres: pole.pole_membre.map((poleMembre): MembrePole => ({
                id: poleMembre.membre.id,
                first_name: poleMembre.membre.first_name,
                last_name: poleMembre.membre.last_name,
                role_fr: poleMembre.membre.role_fr,
                role_en: poleMembre.membre.role_en,
                respo: poleMembre.respo,
                image: poleMembre.membre.image ?? ''
            })),
        }));

        return NextResponse.json({ poles: id ? responsePoles[0] : responsePoles }, { status: 200 });
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
        const newPole:PolePatch = await request.json();
        const existingPole = await prisma.pole.findUnique({ where: { id } });
        if (!existingPole) return NextResponse.json({ error: 'Pole not found' }, { status: 404 });
        
        let newDesciptionFr:string
        let newDesciptionEn:string
        let newShow:boolean

        if (!newPole.description_en){
            newDesciptionEn=existingPole.description_en ?? ''
        }else{
            newDesciptionEn=newPole.description_en ?? ''
        }

        if (!newPole.description_fr){
            newDesciptionFr=existingPole.description_fr ?? ''
        }else{
            newDesciptionFr=newPole.description_fr ?? ''
        }

        if (newPole.show === null){
            newShow=existingPole.show
        }else{
            newShow=newPole.show ?? existingPole.show
        }


        await prisma.pole.update({
            where: { id: id },
            data: { description_fr: newDesciptionFr, description_en:newDesciptionEn, show:newShow }
        });

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}