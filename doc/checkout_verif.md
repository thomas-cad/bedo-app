---

## ✅ API Route – `/api/checkout/verif`

### 🔍 Description

Cette route permet de **valider une commande** à partir d’un **token de vérification JWT** envoyé par email à l’utilisateur.  
Elle :

- Vérifie le token reçu
- Met à jour le stock des produits
- Confirme la commande (`status: "CONFIRMED"`)
- Envoie un email de confirmation avec le récapitulatif de commande

---

### ⚙️ Méthode : `GET`

#### 📥 Paramètres (dans l'URL)

| Nom    | Type   | Obligatoire | Description                              |
|--------|--------|-------------|------------------------------------------|
| token  | string | ✅ Oui       | Token JWT envoyé dans l’email de vérif   |

---

### 🔐 Token JWT

Le token est signé avec `process.env.TJW_SECRET_KEY` et contient :

```ts
{
  orderId: string;
  email: string;
}
```

Il est généré à la création de la commande (`/api/checkout/new`) et expire généralement au bout d'1h.

---

### ✅ Comportement de la route

1. Vérifie le token
2. Récupère la commande liée (`order`)
3. Si déjà confirmée → retourne une erreur
4. Récupère tous les articles de la commande
5. Met à jour les stocks :
   - Si stock suffisant → réduit le stock
   - Sinon → met à 0 et marque les quantités manquantes comme à commander
6. Génère un email récapitulatif HTML
7. Envoie le mail à l’utilisateur
8. Met à jour le `status` de la commande → `"CONFIRMED"`
9. Renvoie une réponse de succès

---

### 📤 Réponses

#### 🟢 200 OK

```json
{
  "success": true,
  "message": ""
}
```

#### 🔴 400/401/403/500 erreurs possibles

```json
{ "success": false, "message": "Token missing" }
{ "success": false, "message": "Commande introuvable" }
{ "success": false, "message": "Already confirmed" }
{ "success": false, "message": "Erreur lors de l'édition des stocks..." }
{ "success": false, "message": "E-mail non définie" }
```

---

### ✉️ Email de confirmation

Un email HTML est envoyé au client avec :

- Récapitulatif de commande sous forme de tableau
- Montant total
- Avertissement si certains articles sont en précommande
- Instructions de paiement :
  - Virement (RIB)
  - Lydia QR code
  - Paiement en espèces
- Infos de récupération
- Encouragement à voter pour BedBusters 😄

> Le RIB est injecté depuis `process.env.RIB`

---

### 🧠 Points techniques

- Utilise `jsonwebtoken` pour vérifier le token
- Utilise `nodemailer` pour l’envoi de mails
- Utilise `@prisma/client` pour interagir avec la base
- TypeScript + App Router de Next.js

---

### 📦 Variables d’environnement utilisées

| Clé                | Description                          |
|--------------------|--------------------------------------|
| `TJW_SECRET_KEY`   | Clé de signature du token JWT        |
| `SMTP_HOST`        | Hôte SMTP pour l’envoi des emails    |
| `SMTP_PORT`        | Port SMTP                            |
| `SMTP_USER`        | Adresse mail de l'expéditeur         |
| `RIB`              | RIB pour le paiement par virement    |

---

### 📌 Exemple de requête

```bash
curl "http://localhost:3000/api/checkout/verif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

