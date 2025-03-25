---

## 🧾 API Route – `/api/item`

### 📍 Description

Cette route permet de :

- **récupérer un ou plusieurs produits** avec leurs tailles et stocks (`GET`)
- **mettre à jour le stock de plusieurs déclinaisons (tailles) d’un produit** (`PATCH`)

---

### ⚙️ Méthodes supportées

---

## 🟢 `GET /api/item`

### 🔍 Description

Renvoie la liste complète des produits, ou un produit spécifique selon l’`id` passé en query paramètre.

### 📥 Query param

| Nom  | Type   | Obligatoire | Description                      |
|------|--------|-------------|----------------------------------|
| `id` | string | ❌ (optionnel) | ID du produit à filtrer          |

---

### 📤 Réponses

#### ✅ 200 OK

```json
{
  "items": [
    {
      "id": "clvx...",
      "title_fr": "T-shirt Monstre",
      "description_fr": "...",
      "price": 19.99,
      "image": "image_url",
      "products": [
        {
          "id": "itemsize-id",
          "sizeId": 2,
          "size": "M",
          "stock": 10,
          "preorder": false
        }
      ]
    }
  ]
}
```

Ou si `id` est fourni :

```json
{
  "items": {
    "id": "clvx...",
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

## 🟡 `PATCH /api/item`

### 🔍 Description

Permet de mettre à jour les **stocks des déclinaisons (`item_size`)** d’un produit.

### 📥 Query param

| Nom  | Type   | Obligatoire | Description          |
|------|--------|-------------|----------------------|
| `id` | string | ✅ Oui       | ID du produit ciblé  |

---

### 📥 Body (JSON)

```json
{
  "products": [
    {
      "id": "itemsize-id-1",
      "stock": 12
    },
    {
      "id": "itemsize-id-2",
      "stock": 5
    }
  ]
}
```

- Le corps doit contenir un tableau `products` avec les nouvelles valeurs de stock pour chaque déclinaison (`item_size`).

---

### 📤 Réponses

#### ✅ 200 OK

```json
{}
```

#### 🔴 400 Bad Request

```json
{ "error": "Missing order ID" }
{ "error": "Invalid products" }
```

#### 🔴 404 Not Found

```json
{ "error": "Item not found" }
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

### 🧠 Notes techniques

- Utilise Prisma pour interagir avec les tables `item`, `item_size`, et `size`
- Les données sont typées via des interfaces (`Item`, `ItemPatch`, `ProductItemPatch`) importées depuis `@/interfaces`
- La route `GET` retourne les déclinaisons de produit avec leur taille (`size`) intégrée
- La route `PATCH` met uniquement à jour les **stocks**, pas d’autres champs

---

