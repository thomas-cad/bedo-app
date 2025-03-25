import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import { User, NewUser, UserPatch } from "@/interfaces"

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const email = request.nextUrl.searchParams.get('email');
    if (!email) return NextResponse.json({ error: 'Missing user email' }, { status: 400 });

    try {
        const user = await prisma.user.findUnique({
            where: {id : email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const returnMembre: User = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin
        }

        return NextResponse.json(returnMembre, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const newUser:NewUser = await request.json();

        const userCreated = await prisma.user.create({
            data: { 
                first_name:newUser.first_name,
                last_name:newUser.last_name,
                email:newUser.email,
                phone:newUser.phone,
                isAdmin:false
             }
        });

        return NextResponse.json(userCreated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });


    try {
        const newUser:UserPatch = await request.json();
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
        
        let newIsAdmin:boolean

        if (newUser.isAdmin === null){
            newIsAdmin=existingUser.isAdmin
        }else{
            newIsAdmin = newUser.isAdmin ?? existingUser.isAdmin;
        }


        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: { isAdmin:newIsAdmin }
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}