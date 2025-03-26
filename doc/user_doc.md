---

## 👤 API Route – `/api/user`

### 📍 Description

Cette route permet de **gérer les utilisateurs** de l'application :  
- 🔍 récupération par email
- ➕ création d’un nouvel utilisateur
- ✏️ mise à jour du rôle `isAdmin`

---

### ⚙️ Méthodes supportées

---

## 🟢 `GET /api/user`

### 🔍 Description

Permet de récupérer un utilisateur par son **email (utilisé comme ID)**.

#### 📥 Query paramètre

| Nom    | Type   | Obligatoire | Description                       |
|--------|--------|-------------|-----------------------------------|
| email  | string | ✅ Oui       | Email de l'utilisateur à trouver  |

#### 📤 Réponse

```json
{
  "id": "user-id",
  "first_name": "Alice",
  "last_name": "Dupont",
  "email": "alice@example.com",
  "phone": "+33612345678",
  "isAdmin": false
}
```

#### 🔴 400 Bad Request

```json
{ "error": "Missing user email" }
```

#### 🔴 404 Not Found

```json
{ "error": "User not found" }
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

## 🟣 `POST /api/user`

### 🔍 Description

Crée un nouvel utilisateur avec les informations fournies.  
L'utilisateur est créé avec `isAdmin: false` par défaut.

#### 📥 Body (type `NewUser`)

```json
{
  "first_name": "Alice",
  "last_name": "Dupont",
  "email": "alice@example.com",
  "phone": "+33612345678"
}
```

#### 📤 Réponse

Retourne l'utilisateur nouvellement créé.

```json
{
  "id": "generated-id",
  "first_name": "Alice",
  "last_name": "Dupont",
  "email": "alice@example.com",
  "phone": "+33612345678",
  "isAdmin": false
}
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

## 🟡 `PATCH /api/user?id=<userId>`

### 🔍 Description

Met à jour le champ `isAdmin` d’un utilisateur donné.

#### 📥 Query paramètre

| Nom | Type   | Obligatoire | Description             |
|-----|--------|-------------|-------------------------|
| id  | string | ✅ Oui       | ID de l’utilisateur     |

#### 📥 Body (type `UserPatch`)

```json
{
  "isAdmin": true
}
```

> Si `isAdmin` est `null` ou non fourni, la valeur actuelle est conservée.

#### 📤 Réponse

Retourne l'utilisateur mis à jour.

```json
{
  "id": "user-id",
  "first_name": "...",
  "last_name": "...",
  "email": "...",
  "phone": "...",
  "isAdmin": true
}
```

#### 🔴 400 Bad Request

```json
{ "error": "Missing order ID" }
```

#### 🔴 404 Not Found

```json
{ "error": "User not found" }
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

### 🧠 Notes techniques

- Utilise Prisma avec la table `user`
- Les types `User`, `NewUser` et `UserPatch` sont importés depuis `@/interfaces`
- Le champ `id` du modèle `user` correspond à l’**email** dans la requête `GET`, mais à l’**ID réel** dans le `PATCH` (⚠️ incohérence possible à corriger)
- Le champ `isAdmin` peut être géré dynamiquement par un administrateur via cette route

---

