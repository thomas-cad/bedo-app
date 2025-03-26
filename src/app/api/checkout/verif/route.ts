import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

interface OrderDetail{ id: string; stockAvailable: number; stockToOrder: number; quantity: number; name: string; price: number; description: string}


async function sendEmail(email: string, subject: string, body: string) {
    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Hôte SMTP depuis les variables d'environnement
        port: parseInt(process.env.SMTP_PORT || '25'), // Port SMTP (par défaut 25)
        secure: false, // false pour le port 25 (pas de SSL/TLS)
        tls: {
            rejectUnauthorized: false // Ignorer la vérification du certificat SSL
        }
    });

    // Options de l'email
    const mailOptions = {
        from: process.env.SMTP_USER, // Adresse de l'expéditeur depuis les variables d'environnement
        to: email, // Adresse du destinataire (passée en paramètre)
        subject: subject, // Sujet de l'email (passé en paramètre)
        text: body, // Corps du message en texte brut (passé en paramètre)
        html: `<p>${body}</p>` // Corps du message en HTML (optionnel)
    };

    try {
        // Envoyer l'email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé: ', info.messageId);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email: ', error);
    }
};

function generateEmailBody(firstName: string, orderDetails: OrderDetail[], total: number) {
    const rib = process.env.RIB;
    
    const emailBody = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmation de Commande</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #0CFF21;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
        }
        th {
            color: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Salut ${firstName} ! 👻</h1>
        <p>Un grand <strong>merci</strong> pour ta commande chez nous ! 💖 On est super heureux de t’avoir parmi nos clients et on espère que tu vas adorer ce que tu as choisi. 😊</p>
        
        <h2>Détails de ta commande :</h2>
        <table>
            <tr>
                <th>Nom</th>
                <th>Référence</th>
                <th>Description</th>
                <th>Quantité</th>
                <th>Prix</th>
            </tr>
            ${orderDetails.map((item: OrderDetail) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.id}</td>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toFixed(2)} €</td>
            </tr>`).join('')}
        </table>
        
        <p><strong>Total de la commande :</strong> ${total.toFixed(2)} €</p>
        
        ${orderDetails.some((item: OrderDetail) => item.stockToOrder > 0) ? `
        <div>
            <h2>⚠️ Informations sur les articles en précommande :</h2>
            <p>Certains articles de ta commande sont actuellement en précommande, ta commande ne sera validée qu'<strong>après réception du paiement</strong>. Ils seront disponibles sous <strong>2 semaines</strong>. Voici la liste :</p>
            <ul>
                ${orderDetails.filter((item: OrderDetail) => item.stockToOrder > 0).map((item: OrderDetail) => `<li><strong>${item.name}</strong> (Réf: ${item.id}) : ${item.stockToOrder} unité(s) en précommande.</li>`).join('')}
            </ul>
        </div>` : ''}
        
        <h2>Options de paiement :</h2>
        <ul>
            <li>✅ <strong>Par virement</strong> : Tu trouveras ci-joint notre RIB pour effectuer le paiement : ${rib}</li>
            <li>✅ <strong>Via Lydia QR code</strong> : Tu pourras payer directement au moment de récupérer ta commande.</li>
            <li>✅ <strong>En espèces</strong> : Tu peux aussi régler sur place lors de la récupération.</li>
        </ul>
        
        <h2>Récupération de la commande :</h2>
        <p>Pour récupérer ta commande, tu peux passer <strong>durant les perms au local</strong> 🏠 ou, si tu préfères, envoyer un <strong>DM à @bedbusters</strong> sur Instagram. 📩</p>
        
        <h2>Vote pour BedBusters !</h2>
        <p>Enfin, on a une petite faveur à te demander… 😇 Si tu as aimé ton expérience avec nous, n’hésite pas à <strong>voter pour 👻👻BedBusters👻👻</strong> !</p>
        
        <p>Merci encore pour ta confiance, et à très vite ! 🚀</p>
        <p><strong>BedBusters 👻</strong></p>
    </div>
</body>
</html>`;

    return emailBody;
};


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

        if (order.status === 'CONFIRMED') {
            return new Response(
                JSON.stringify({ success: false, message: "Already confirmed" }),
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
            if(item_stock && item_stock.stock >= item.total_quantity){
                stockAvailable =  item_stock.stock - item.total_quantity;
                stockToOrder = 0;
                newStock = item_stock.stock - item.total_quantity;
            } else if(item_stock && item_stock.stock < item.total_quantity){
                stockAvailable =  item_stock.stock;
                stockToOrder = item.total_quantity - item_stock.stock;
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
                quantity: item.total_quantity,
                name: item_product?.title_fr ?? '',
                price: item.total_quantity * (item_product?.price ?? 0),
                description: item_product?.description_fr ?? '',
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