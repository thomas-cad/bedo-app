
---

## 🧾 API Route – `/api/membre`

### 📍 Description

Cette route permet de **récupérer les membres** du site, avec leurs informations et les pôles auxquels ils sont rattachés.  
Elle prend en charge la récupération :

- de **tous les membres**
- d’un **membre spécifique** via un `id` (en query param)

---

### ⚙️ Méthode supportée

## 🟢 `GET /api/membre`

### 🔍 Description

Retourne la liste des membres, ou les informations détaillées d’un membre si un `id` est fourni.

---

### 📥 Query paramètre

| Nom  | Type   | Obligatoire | Description                        |
|------|--------|-------------|------------------------------------|
| `id` | string | ❌ Optionnel | Identifiant du membre à récupérer |

---

### 📤 Réponses

#### ✅ 200 OK – Liste de membres

```json
{
  "membres": [
    {
      "id": "membre-id",
      "first_name": "Alice",
      "last_name": "Dupont",
      "role_fr": "Trésorière",
      "role_en": "Treasurer",
      "image": "image_url",
      "poles": [
        {
          "id": "pole-id",
          "name_fr": "Communication",
          "name_en": "Communication",
          "description_fr": "Gère les réseaux",
          "description_en": "Handles social media",
          "respo": true,
          "show": true
        }
      ]
    }
  ]
}
```

#### ✅ 200 OK – Un seul membre (si `id` fourni)

```json
{
  "membres": {
    "id": "membre-id",
    "first_name": "Alice",
    ...
  }
}
```

#### 🔴 404 Not Found

```json
{ "error": "Membre not found" }
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

### 🧠 Notes techniques

- Utilise Prisma pour accéder aux tables :
  - `membre`
  - `pole_membre` (relation entre membre et pôle)
  - `pole`
- Les données sont typées via les interfaces locales `Membre` et `PoleMembre` (depuis `@/interfaces`)
- Le champ `image` est optionnel et remplacé par une chaîne vide si absent
- Les membres peuvent appartenir à plusieurs pôles (avec rôle de `respo` ou non)

---

### 📦 Exemple de requêtes

#### 📌 Récupérer tous les membres

```bash
curl http://localhost:3000/api/membre
```

#### 📌 Récupérer un membre précis

```bash
curl "http://localhost:3000/api/membre?id=clvx123..."
```

---

