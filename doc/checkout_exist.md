
---

## 📄 API Route – `/api/checkout/exist`

### 🔍 Description

Cette route permet de **vérifier l'existence d'une commande (`Order`)** à partir de son `id`. Elle utilise Prisma pour interagir avec la base de données.

---

### 📦 Méthode : `GET`

#### ✅ URL attendue

```
/api/checkout/exist/[id]
```

> Cette route est dynamique : l'`id` de la commande est attendu dans l’URL.

---

### 📥 Paramètres

| Nom | Type   | Obligatoire | Description                     |
|-----|--------|-------------|---------------------------------|
| id  | string | ✅ Oui       | L'identifiant unique de l'order |

---

### 📤 Réponses

#### 🟢 200 OK (commande trouvée)

```json
{
  "success": true,
  "order": {
    "id": "clvx0vdcg0000x208zchzo0on",
    "userId": "...",
    "status": "...",
    ...
  }
}
```

#### 🔴 400 Bad Request (ID manquant)

```json
{
  "error": "Order ID is required"
}
```

#### 🔴 404 Not Found (commande inexistante)

```json
{
  "error": "Order not found"
}
```

#### 🔴 500 Internal Server Error

```json
{
  "error": "Database error",
  "details": "..."
}
```

Ou :

```json
{
  "error": "Internal Server Error",
  "details": "..."
}
```

---

### 🧠 Remarques techniques

- Utilise `PrismaClient` pour accéder au modèle `order` dans la base de données.
- Gère les erreurs Prisma (`PrismaClientKnownRequestError`) et les erreurs génériques.
- Ferme proprement la connexion à la BDD avec `prisma.$disconnect()` dans le bloc `finally`.
- Spécifie le runtime `nodejs` pour s’assurer que la route tourne bien côté serveur.

---

### ⚙️ Exemple d'appel

```bash
curl http://localhost:3000/api/checkout/exist/clvx0vdcg0000x208zchzo0on
```

---

