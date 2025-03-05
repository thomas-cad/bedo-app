import { PrismaClient } from '@prisma/client';
import { CartItem } from '@/app/context/CartContext';

const prisma = new PrismaClient();

interface RequestBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    agreeToPay: boolean;
    cart: CartItem[];
  }

interface OrderDetail{ id: string; stockAvailable: number; stockToOrder: number; quantity: number; name: string; price: number; description: string}

function generateEmailBody(firstName: string, orderDetails: OrderDetail[], total: number): string {
    // Construction du message
    let emailBody = `Salut ${firstName} ! 👻\n\n`;
    emailBody += `Un grand **merci** pour ta commande chez nous ! 💖 On est super heureux de t’avoir parmi nos clients et on espère que tu vas adorer ce que tu as choisi. 😊\n\n`;

    // Tableau des détails de la commande
    emailBody += `**Détails de ta commande :**\n`;
    emailBody += `| Nom                | Référence | Description         | Quantité | Prix   |\n`;
    emailBody += `|--------------------|-----------|---------------------|----------|--------|\n`;
    orderDetails.forEach((item) => {
        emailBody += `| ${item.name.padEnd(20)} | ${item.id.padEnd(10)} | ${item.description.padEnd(20)} | ${item.quantity.toString().padEnd(8)} | ${item.price.toFixed(2).padEnd(6)} € |\n`;
    });
    emailBody += `\n**Total de la commande : ${total.toFixed(2)} €**\n\n`;

    // Vérification des articles en précommande
    const preorderItems = orderDetails.filter((item) => item.stockToOrder > 0);
    if (preorderItems.length > 0) {
        emailBody += `**⚠️ Informations sur les articles en précommande :**\n`;
        emailBody += `Certains articles de ta commande sont actuellement en précommande. Ils seront disponibles sous **2 semaines**. Voici la liste :\n`;
        preorderItems.forEach((item) => {
            emailBody += `- **${item.name}** (Réf: ${item.id}) : ${item.stockToOrder} unité(s) en précommande.\n`;
        });
        emailBody += `\n`;
    }

    // Options de paiement
    emailBody += `Pour le règlement, tu as plusieurs options :\n`;
    const rib = process.env.RIB;
    emailBody += `✅ **Par virement** : Tu trouveras ci-joint notre RIB pour effectuer le paiement : ${rib}\n`;
    emailBody += `✅ **Via Lydia QR code** : Tu pourras payer directement au moment de récupérer ta commande.\n`;
    emailBody += `✅ **En espèces** : Tu peux aussi régler sur place lors de la récupération.\n\n`;

    // Instructions pour récupérer la commande
    emailBody += `Pour récupérer ta commande, tu peux passer **durant les perms au local** 🏠 ou, si tu préfères, envoyer un **DM à @bedbusers** sur instagram. 📩\n\n`;

    // Appel à voter pour BedBusters
    emailBody += `Enfin, on a une petite faveur à te demander… 😇 Si tu as aimé ton expérience avec nous, n’hésite pas à **voter pour 👻👻BedBusters👻👻** !;`

    // Signature
    emailBody += `Merci encore pour ta confiance, et à très vite ! 🚀\n\n`;
    emailBody += `BedBusters 👻`;

    return emailBody;
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

    let orderDetail: OrderDetail[] = [];
    // Edit stock
    try {
        for (const item of cart) {
            const item_stock = await prisma.item_size.findFirst({
                where: {
                    id: item.id
                }
            });

            const item_product = await prisma.item.findFirst({
                where: {
                    id: item_stock?.itemId
                }
            });

            let stockAvailable;
            let stockToOrder;
            let newStock;
            if(item_stock && item_stock.stock >= item.quantity){
                stockAvailable =  item_stock.stock - item.quantity;
                stockToOrder = 0;
                newStock = item_stock.stock - item.quantity;
            } else if(item_stock && item_stock.stock < item.quantity){
                stockAvailable =  item_stock.stock;
                stockToOrder = item.quantity - item_stock.stock;
                newStock = 0;
            } else {
                return new Response(
                    JSON.stringify({ success: false, message: "Erreur lors de l'édition des stocks" }),
                    { status: 400 }
                );
            }

            const newItem = {
                id: item.id,
                stockAvailable: stockAvailable,
                stockToOrder: stockToOrder,
                quantity: item.quantity,
                name: item_product?.title ?? '',
                price: item.quantity * (item_product?.price ?? 0),
                description: item_product?.description ?? '',
            }

            orderDetail.push(newItem);

            await prisma.item_size.update({
                where: { id: item.id },
                data: {
                    stock: newStock,
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

    const emailBody = generateEmailBody(firstName, orderDetail, total)

    //
    // IMPLEMENTER ENVOYER MAIL ICI
    //

    // Retourner une réponse réussie
    return new Response(
        JSON.stringify({ success: true, orderId: orderId, userId:userId, orderDetail: orderDetail, total:total}),
        { status: 200 }
    );
}