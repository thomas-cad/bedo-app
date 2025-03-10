import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

interface OrderDetail{ id: string; stockAvailable: number; stockToOrder: number; quantity: number; name: string; price: number; description: string}


async function sendEmail(email: string, subject: string, body: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT as string, 10),
            secure: false, // false pour un SMTP non sécurisé (port 25)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Accepter les connexions non sécurisées
            }
        });

        const info = await transporter.sendMail({
            from: `"BedBusters Shop" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            text: body,
        });

        console.log("Email envoyé: ", info.messageId);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
    }
};

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

function totalOrder(cart: OrderDetail[]): number {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }
    return total;
}


export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    if (!token) {
        return new Response(
            JSON.stringify({ success: false, message: "Token missing" }),
            { status: 400 }
        );
    }

    let order
    let user
    try {
        const decoded = jwt.verify(token, process.env.TJW_SECRET_KEY as string) as { orderId: string; email: string };
        const { orderId } = decoded;

        // Optionnel : récupérer la commande et vérifier l'email (pour renforcer la sécurité)
        order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            return new Response(
                JSON.stringify({ success: false, message: "Commande introuvable" }),
                { status: 403 }
            );
        }

        user = await prisma.user.findUnique({where : { id: order.userId }})
    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, message: err }),
            { status: 401 }
        );
    }

    const orderDetail: OrderDetail[] = [];
    // Edit stock
    try {

        const item_order = await prisma.order_item_size.findMany({
            where: {
                orderId: order.id
            }
        });

        for (const item of item_order){
            const item_stock = await prisma.item_size.findFirst({
                where: {
                    id: item?.item_sizeId
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
                where: { id: item.item_sizeId },
                data: {
                    stock: newStock,
                },
            });
        }
    }catch (error) {
    return new Response(
            JSON.stringify({ success: false, message: "Erreur lors de la création du détail de la commande" + error}),
            { status: 400 }
        );
    }

    // Calcul du total de la commande
    const total = totalOrder(orderDetail);

    const emailBody = generateEmailBody(user?.first_name ?? '', orderDetail, total)
    const subject = "👻 BedBusters - Ta commande est confirmée !"; 

    if (user?.email) {
        sendEmail(user.email, subject, emailBody);
    } else {
        return new Response(
            JSON.stringify({ success: false, message: "E-mail non définie" }),
            { status: 400 }
        );
    }

    try {
        await prisma.order.update({ 
            where: { id: order.id },
            data: { status: 'CONFIRMED' } // Assuming you want to update the status to 'confirmed'
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ success: false, message: err }),
            { status: 401 }
        );
    }

    return new Response(
        JSON.stringify({ success: true, message: "" }),
        { status: 200 }
    );
}