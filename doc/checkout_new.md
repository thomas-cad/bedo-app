---

## 🧾 API Route – `/api/checkout/new`

### 📍 Description

Cette route permet de **créer une commande** à partir d’un panier utilisateur.  
Elle :

- Valide les informations saisies (email, téléphone, etc.)
- Crée un utilisateur si nécessaire (ou met à jour ses infos)
- Crée une commande (`Order`) et les éléments associés (`OrderItemSize`)
- Envoie un email de vérification avec un lien sécurisé

---

### 🔧 Méthode : `POST`

#### ✅ URL

```
/api/checkout/new
```

---

### 📥 Corps de la requête (JSON)

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@telecom-paris.fr",
  "phone": "+33123456789",
  "agreeToPay": true,
  "cart": [
    { "id": "itemsize-id-1", "price": 15.99, "quantity": 2 },
    { "id": "itemsize-id-2", "price": 25.00, "quantity": 1 }
  ]
}
```

> ⚠️ L’adresse email **doit se terminer par** `@telecom-paris.fr`  
> ⚠️ Le numéro de téléphone est validé via une regex (format FR/international)

---

### 📤 Réponses

#### ✅ 200 OK – Commande créée avec succès

```json
{
  "success": true,
  "orderId": "clvx123abc...",
  "userId": "clvxuser...",
  "token": "jwt-token"
}
```

#### ❌ 400 Bad Request – Exemples d'erreurs possibles

```json
{ "success": false, "message": "Panier vide" }
{ "success": false, "message": "Tous les champs obligatoires doivent être remplis" }
{ "success": false, "message": "Veuillez utiliser une adresse e-mail @telecom-paris.fr" }
{ "success": false, "message": "Le produit avec l'ID xyz n'existe pas" }
{ "success": false, "message": "Le numéro de téléphone n'est pas valide" }
```

#### ❌ 405 Method Not Allowed

```json
{ "success": false, "message": "Only POST requests allowed" }
```

---

### ✉️ Envoi d’un email de vérification

Une fois la commande créée, un **email de vérification** est envoyé à l’adresse fournie.  
Il contient un lien vers `/shop/verif?token=...` avec un **token JWT signé**, valable 1h.

Le contenu de l’email est HTML + texte, avec un bouton de validation de commande.

> Le transporteur SMTP est configuré via les variables suivantes :
>
> - `SMTP_HOST`
> - `SMTP_PORT`
> - `SMTP_USER`
> - `PUBLIC_URL`
> - `TJW_SECRET_KEY` (pour signer le token JWT)

---

### 🧠 Fonctionnalités internes

- Utilise Prisma pour accéder aux modèles :
  - `user`
  - `order`
  - `item_size`
  - `order_item_size`
- Envoie d’emails via **nodemailer**
- Génération de token via **jsonwebtoken**
- Vérification + mise à jour de l'utilisateur si déjà existant

---

### 🧪 Sécurité

- Validation des entrées côté serveur
- Vérification stricte de l’email et du numéro de téléphone
- Le lien d’activation de commande est **temporaire et signé (JWT)**

---

