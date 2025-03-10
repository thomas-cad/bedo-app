import { PrismaClient } from '@prisma/client';
import { CartItem } from '@/app/context/CartContext';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

interface RequestBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    agreeToPay: boolean;
    cart: CartItem[];
  }

function totalOrder(cart: CartItem[]): number {
    let total = 0;
    for (const item of cart) {
        total += item.price * item.quantity;
    }
    return total;
}

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

function generateOrderVerificationToken(orderId: string, email: string) {
    return jwt.sign(
        { orderId, email },
        process.env.TJW_SECRET_KEY as string, // Clé secrète bien gardée !
        { expiresIn: '1h' } // Expiration facultative (reco : 1h ou 24h max)
    );
}

async function sendVerificationEmail(email: string, token: string) {
    const url = process.env.PUBLIC_URL;
    const verifyUrl = url + `/shop/verif?token=${token}`;
    const body = generateVerificationEmailBody(verifyUrl)
    const subject = "👻 BedBusters - Confirme ta commande (c’est rapide !)"; 
    await sendEmail(email, subject, body)
}

function generateVerificationEmailBody(verifyUrl: string): string {
    const emailBody = `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .email-container {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                .button {
                    background-color: #0CFF21;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                    display: inline-block;
                    text-align: center;
                }
                .button:hover {
                    background-color: #0CFF21;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #aaa;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <p>Salut ! 👻</p>

                <p>On a bien reçu ta commande chez <strong>BedBusters</strong> et on est trop chauds de te compter parmi nous ! 🔥</p>

                <p>🛡️ <strong>Pour finaliser ta commande</strong>, il te reste une petite étape : la <strong>valider</strong> en cliquant sur le lien ci-dessous. Ça nous permet de vérifier que c’est bien toi (et pas un fantôme qui passe commande à ta place 👀).</p>

                <p>👉 <strong>Valide ta commande ici :</strong></p>
                <a href="${verifyUrl}" class="button">Clique ici</a>

                <p>Si le bouton de ne fonctionne pas c'est ici 😉 : ${verifyUrl}</p>

                <p>⚠️ <strong>Attention</strong>, ce lien expire dans <strong>1 heure</strong>, donc ne traîne pas trop !</p>

                <p>Si jamais tu n’es pas à l’origine de cette commande, ou si tu penses qu’il y a une erreur, n’hésite pas à nous contacter directement via <strong>@bedbusters</strong> sur Insta.</p>

                <p>Merci encore pour ta confiance, et prépare-toi à recevoir des articles monstrueux ! 👻</p>

                <p class="footer">👻 La team BedBusters 👻</p>
            </div>
        </body>
    </html>
    `;

    return emailBody;
}



// Validation du numéro de téléphone (exemple international simple)
function isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+?[1-9]\d{1,14}|0\d{9})$/;
    return phoneRegex.test(phone);
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
            JSON.stringify({ success: false, message: error }),
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
            JSON.stringify({ success: false, message: error }),
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
            JSON.stringify({ success: false, message: error }),
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
            JSON.stringify({ success: false, message: error }),
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
            JSON.stringify({ success: false, message: error }),
            { status: 400 }
        );
    }

    const token = generateOrderVerificationToken(orderId, email)
    sendVerificationEmail(email, token)

    // Retourner une réponse réussie
    return new Response(
        JSON.stringify({ success: true, orderId: orderId, userId:userId, token: token}),
        { status: 200 }
    );
}