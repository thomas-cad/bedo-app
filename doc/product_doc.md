
---

## 🧾 API Route – `/api/product`

### 📍 Description

Cette route permet de **récupérer tous les produits disponibles** avec leurs tailles, quantités en stock, détails et informations liées à l’article parent (`item`).  
Elle supporte aussi la récupération d’un **produit spécifique** via son `id`.

---

### ⚙️ Méthode supportée

---

## 🟢 `GET /api/product`

### 🔍 Description

Retourne :

- Soit **tous les produits** (déclinaisons `item_size`)
- Soit **un produit spécifique** si `id` est fourni

---

### 📥 Query paramètre

| Nom  | Type   | Obligatoire | Description                            |
|------|--------|-------------|----------------------------------------|
| `id` | string | ❌ Optionnel | Identifiant d'un `item_size` précis    |

---

### 📤 Réponses

#### ✅ 200 OK – Liste des produits ou produit unique

```json
{
  "products": [
    {
      "id": "itemsize-id",
      "itemId": "item-id",
      "title_fr": "T-shirt Monstre",
      "title_en": "Monster T-shirt",
      "description_fr": "Description en FR",
      "description_en": "Description in EN",
      "price": 19.99,
      "image": "url-image",
      "sizeId": 3,
      "size": "M",
      "stock": 12,
      "preorder": 0
    }
  ]
}
```

Si `id` est fourni, retourne un seul objet :

```json
{
  "products": {
    "id": "...",
    ...
  }
}
```

#### 🔴 404 Not Found

```json
{ "error": "No products found" }
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

### 🧠 Notes techniques

- Utilise Prisma pour accéder à `item_size` avec jointures sur :
  - `item` (titre, description, image, prix)
  - `size` (taille)
- Typage avec l’interface `Product` importée depuis `@/interfaces`
- Le produit retourné correspond à une **déclinaison** d’article avec sa taille (`size`)
- Chaque produit contient les infos du parent `item`

---

### 📦 Exemple de requêtes

#### 📌 Récupérer tous les produits

```bash
curl http://localhost:3000/api/product
```

#### 📌 Récupérer un produit précis

```bash
curl "http://localhost:3000/api/product?id=itemsize-id"
```

---

