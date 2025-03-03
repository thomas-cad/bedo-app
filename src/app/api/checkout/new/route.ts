import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CartItem {
    id: string; 
    quantity: number; 
  }

interface RequestBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    agreeToPay: boolean;
    captchaToken: string;
    cart: CartItem[];
  }

type ResponseData = {
    message: string
  }
 
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ message: "Only POST requests allowed" }),
            { status: 405 },
        );
    }

    const { firstName, lastName, email, phone, agreeToPay, captchaToken, cart } = req.body as RequestBody;

    if (!firstName || !lastName || !email || !phone || !agreeToPay || !captchaToken || !cart) {
        return new Response(
            JSON.stringify({ message: "Tous les champs sont obligatoires" }),
            { status: 400 },
        );
    }

    if (!email.endsWith('@telecom-paris.fr')) {
        return new Response(
            JSON.stringify({ message: "Veuillez utiliser une adresse e-mail @telecom-paris.fr" }),
            { status: 400 },
        );
    }

    try {
        const captchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
            { method: 'POST' }
        );
        const captchaData = await captchaResponse.json();
        if (!captchaData.success) {
            return new Response(
                JSON.stringify({ message: "CAPTCHA invalide" }),
                { status: 400 },
            );
        }
    } catch (error) {
        console.error('Erreur CAPTCHA:', error);
        return new Response(
            JSON.stringify({ message: "Erreur interne du serveur" }),
            { status: 500 },
        );
    }

    try{
        // Vérifier si l'utilisateur existe déjà
        let user = await prisma.user.findFirst({ where: { email } });

        if (!user) {
        // Créer l'utilisateur s'il n'existe pas
            user = await prisma.user.create({
                data: {
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                },
            });
        }

        // Créer la commande
        const order = await prisma.order.create({
            data: {
                status: 'PENDING',
                order_date: new Date(),
                userId: user.id,
            },
        });

        // Insérer les items du panier dans order_item_size
        for (const item of cart) {
            await prisma.order_item_size.create({
                data: {
                orderId: order.id,
                item_sizeId: item.id,
                quantity: item.quantity,
                },
            });
        }

        return new Response(
            JSON.stringify({ message: "Success" }),
            { status: 200 },
        );

    }catch(error){
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 },
        );
    }
    
}