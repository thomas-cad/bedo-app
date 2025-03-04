import { PrismaClient } from '@prisma/client';
import { request } from 'http';

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
 
export async function POST(req: Request) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ message: "Only POST requests allowed" }),
            { status: 405 },
        );
    }

    const body = await req.json() as RequestBody
    const { firstName, lastName, email, phone, agreeToPay, captchaToken, cart } = body;

    if (!firstName) {
        return new Response(
            JSON.stringify({ message: "Le prénom est obligatoire", body: req.body }),
            { status: 400 },
        );
    }
    if (!lastName) {
        return new Response(
            JSON.stringify({ message: "Le nom de famille est obligatoire" }),
            { status: 400 },
        );
    }
    if (!email) {
        return new Response(
            JSON.stringify({ message: "L'adresse e-mail est obligatoire" }),
            { status: 400 },
        );
    }
    if (!phone) {
        return new Response(
            JSON.stringify({ message: "Le numéro de téléphone est obligatoire" }),
            { status: 400 },
        );
    }
    if (!agreeToPay) {
        return new Response(
            JSON.stringify({ message: "Vous devez accepter de payer" }),
            { status: 400 },
        );
    }
    if (!captchaToken) {
        return new Response(
            JSON.stringify({ message: "Le CAPTCHA est obligatoire" }),
            { status: 400 },
        );
    }
    if (!cart || cart.length === 0) {
        return new Response(
            JSON.stringify({ message: "Le panier ne peut pas être vide" }),
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
        const captchaToken = body.captchaToken; // récupéré depuis le body envoyé par le client

        const params = new URLSearchParams();
        params.append('secret', process.env.RECAPTCHA_SECRET_KEY || '');
        params.append('response', captchaToken);

        const captchaResponse = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString(),
            }
        );

        const captchaData = await captchaResponse.json();

        if (!captchaData.success) {
            return new Response(
                JSON.stringify({ message: "CAPTCHA invalide", body: captchaData }),
                { status: 400 }
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