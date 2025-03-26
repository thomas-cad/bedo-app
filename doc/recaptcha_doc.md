---

## 🔐 API Route – `/api/recaptcha`

### 📍 Description

Cette route permet de **vérifier un token reCAPTCHA v2/v3** côté serveur, en appelant l'API Google.  
Elle est généralement utilisée pour valider qu’un utilisateur est **humain** avant de continuer une action sensible (formulaire, commande, etc.).

---

### ⚙️ Méthode supportée

## 🟣 `POST /api/recaptcha`

---

### 📥 Body attendu (JSON)

```json
{
  "token": "token_recaptcha_client"
}
```

> Le `token` est récupéré côté client avec Google reCAPTCHA (`grecaptcha.execute(...)`)

---

### 📤 Réponses

#### ✅ 200 OK – Vérification réussie

```json
{
  "success": true,
  "message": "success"
}
```

#### 🔴 405 Method Not Allowed

```json
{ "message": "Only POST requests allowed" }
```

```json
{ "message": "Token not found" }
```

```json
{
  "success": false,
  "message": "Failed to verify",
  "errorCodes": {
    "success": false,
    "error-codes": ["invalid-input-response"]
  }
}
```

#### 🔴 500 Internal Server Error

```json
{
  "success": false,
  "message": "AxiosError: ..."
}
```

---

### 🔧 Configuration requise

Cette route utilise une **clé secrète reCAPTCHA** côté serveur.  
Ajoute cette variable dans ton fichier `.env` :

```
RECAPTCHA_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
```

> Clé disponible dans la [console admin de Google reCAPTCHA](https://www.google.com/recaptcha/admin)

---

### 📦 Dépendances

```bash
npm install axios
```

---

### 🧠 Notes techniques

- Utilise `axios` pour appeler `https://www.google.com/recaptcha/api/siteverify`
- Le token est envoyé en POST avec la `secret key` et le `response`
- Le retour `response.data.success` est utilisé pour valider la demande

---

### 🧪 Exemple d’intégration front (client-side)

```ts
const token = await grecaptcha.execute("votre_site_key", { action: "submit" });

await fetch("/api/recaptcha", {
  method: "POST",
  body: JSON.stringify({ token }),
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

