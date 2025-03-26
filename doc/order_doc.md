---

## 📦 API Route – `/api/order`

### 📍 Description

Cette route permet de gérer les **commandes** :

- 🔍 Récupération (`GET`)
- ➕ Création (`POST`)
- 📝 Mise à jour (`PATCH`)
- ❌ Suppression (`DELETE`)

Elle prend en charge la gestion des produits, du stock, des précommandes, et des totaux.

---

### ⚙️ Méthodes disponibles

---

## 🟢 `GET /api/order`

### 🔍 Description

Renvoie toutes les commandes ou une commande spécifique si `id` est fourni.

#### 📥 Query paramètre

| Nom  | Type   | Obligatoire | Description                      |
|------|--------|-------------|----------------------------------|
| `id` | string | ❌ Optionnel | Identifiant de la commande       |

#### 📤 Réponse

```json
{
  "order": [
    {
      "id": "order-id",
      "userId": "...",
      "userFirstName": "...",
      "userEmail": "...",
      "orderDate": "...",
      "orderStatus": "PENDING",
      "price": 29.99,
      "products": [
        {
          "productId": "...",
          "quantity_total": 3,
          "quantity_stock": 2,
          "quantity_preorder": 1,
          "size": "M",
          "name_fr": "T-shirt",
          "price": 14.99
        }
      ]
    }
  ]
}
```

---

## 🟡 `PATCH /api/order?id=<orderId>`

### 🔍 Description

Met à jour une commande existante :

- son **statut**
- les **produits associés**
- le **stock/précommande**
- le **total**

#### 📥 Query paramètre

| Nom  | Type   | Obligatoire | Description          |
|------|--------|-------------|----------------------|
| `id` | string | ✅ Oui       | Identifiant commande |

#### 📥 Body

```json
{
  "orderStatus": "PAID",
  "products": [
    {
      "productId": "...",
      "quantity_total": 2
    }
  ]
}
```

> Si `products` n'est pas fourni, les anciens produits sont conservés.

---

## 🔴 `DELETE /api/order?id=<orderId>`

### 🔍 Description

Supprime une commande et tous ses éléments liés (`order_item_size`).

#### 📥 Query paramètre

| Nom  | Type   | Obligatoire | Description          |
|------|--------|-------------|----------------------|
| `id` | string | ✅ Oui       | Identifiant commande |

#### 📤 Réponse

```json
{ "message": "Order <id> deleted" }
```

---

## 🟣 `POST /api/order`

### 🔍 Description

Crée une nouvelle commande pour un utilisateur donné.

#### 📥 Body

```json
{
  "userId": "user-id",
  "orderStatus": "PENDING",
  "products": [
    {
      "productId": "...",
      "quantity_total": 3
    }
  ]
}
```

- Calcule automatiquement le total
- Met à jour les stocks et les quantités en précommande si nécessaire
- Retourne un message de succès

#### 📤 Réponse

```json
{ "message": "Order <id> created successfully" }
```

---

### 🧠 Détails techniques

- ✅ Vérifie l’existence de l’utilisateur avant de créer une commande
- 📉 Met à jour le **stock** et la **quantité en précommande**
- 📦 Utilise la relation entre `order` et `order_item_size`
- 🎯 Statuts supportés : `"PENDING"`, `"PAID"`, `"COMPLETED"`
- 🔐 (Commenté) Support prévu pour une clé API via header `x-api-key`

---

### 📦 Interface `ProductOrder`

Importée depuis `@/interfaces` :

```ts
interface ProductOrder {
  productId: string;
  quantity_total: number;
}
```

---

### 🔧 Exemple de requêtes

#### ➕ Création

```bash
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id",
    "products": [{ "productId": "abc123", "quantity_total": 2 }]
  }'
```

#### 🔄 Mise à jour

```bash
curl -X PATCH "http://localhost:3000/api/order?id=order-id" \
  -H "Content-Type: application/json" \
  -d '{
    "orderStatus": "PAID",
    "products": [{ "productId": "abc123", "quantity_total": 5 }]
  }'
```

---

