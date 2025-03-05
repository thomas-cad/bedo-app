import { PrismaClient } from '@prisma/client';
import { CartItem } from '@/app/context/CartContext';
import Item from '@/app/shop/cart/components/Item';

const prisma = new PrismaClient();

interface RequestBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    agreeToPay: boolean;
    cart: CartItem[];
  }

// Validation du numéro de téléphone (exemple international simple)
function isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+?[1-9]\d{1,14}|0\d{9})$/;
    return phoneRegex.test(phone);
}

function totalOrder(cart: CartItem[]): number {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }
    return total;
}

export async function POST(req: Request) {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ success: false, message: "Only POST requests allowed" }),
            { status: 405 }
        );
    }

    let body: RequestBody;
    try {
        body = await req.json() as RequestBody;
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Invalid JSON payload" }),
            { status: 400 }
        );
    }

    const { firstName, lastName, email, phone, agreeToPay, cart } = body;

    // Validation des champs obligatoires
    if (!cart || cart.length === 0) {
        return new Response(
            JSON.stringify({ success: false, message: "Panier vide" }),
            { status: 400 }
        );
    }

    if (!firstName || !lastName || !email || !phone || !agreeToPay) {
        return new Response(
            JSON.stringify({ success: false, message: "Tous les champs obligatoires doivent être remplis" }),
            { status: 400 }
        );
    }

    if (!email.endsWith('@telecom-paris.fr')) {
        return new Response(
            JSON.stringify({ success: false, message: "Veuillez utiliser une adresse e-mail @telecom-paris.fr" }),
            { status: 400 }
        );
    }

    if (!isValidPhoneNumber(phone)) {
        return new Response(
            JSON.stringify({ success: false, message: "Le numéro de téléphone n'est pas valide" }),
            { status: 400 }
        );
    }

    // Vérification de l'existence des produits dans la base de données
    try {
        for (const item of cart) {
            const productExists = await prisma.item_size.findUnique({
                where: { id: item.id },
            });

            if (!productExists) {
                return new Response(
                    JSON.stringify({ success: false, message: `Le produit avec l'ID ${item.id} n'existe pas` }),
                    { status: 400 }
                );
            }
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Erreur lors de la vérification des produits" }),
            { status: 400 }
        );
    }

    // Check user
    let userId;
    try {

        const userExist = await prisma.user.findFirst({
            where: { email: email },
        });

        if (!userExist) {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                },
            });
            userId = newUser.id;
        } else {
            userId = userExist.id;
            await prisma.user.update({
                where: { id: userId },
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: phone,
                },
            });
        }

    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Erreur lors du check user" }),
            { status: 400 }
        );
    }

    // Create order
    let orderId;
    try {
        const newOrder = await prisma.order.create({
            data: {
            userId: userId,
            status: "PENDING",
            order_date: new Date(),
            total: totalOrder(cart),
            },
        });
        orderId = newOrder.id;

    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Erreur lors de la création de la commande" }),
            { status: 400 }
        );
    }

    try {
        for (const item of cart) {
            await prisma.order_item_size.create({
                data: {
                    item_sizeId: item.id,
                    orderId: orderId,
                    quantity: item.quantity,
                },
            });
        }
    }catch (error) {
    return new Response(
            JSON.stringify({ success: false, message: "Erreur lors de la création du détail de la commande" }),
            { status: 400 }
        );
    }

    // Calcul du total de la commande
    const total = totalOrder(cart);

    // Retourner une réponse réussie
    return new Response(
        JSON.stringify({ success: true, message: { firstName, lastName, email, phone, agreeToPay, cart, total, userId, orderId} }),
        { status: 200 }
    );
}