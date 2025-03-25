---

## 🧾 API Route – `/api/pole`

### 📍 Description

Cette route permet de **lister les pôles** de l'association avec leurs informations détaillées et les membres associés.  
Elle permet également de **mettre à jour la description ou la visibilité (`show`)** d’un pôle via `PATCH`.

---

### ⚙️ Méthodes disponibles

---

## 🟢 `GET /api/pole`

### 🔍 Description

Retourne tous les pôles existants ou un pôle spécifique si un `id` est fourni.

---

### 📥 Query paramètre

| Nom  | Type   | Obligatoire | Description                  |
|------|--------|-------------|------------------------------|
| `id` | string | ❌ Optionnel | Identifiant du pôle ciblé    |

---

### 📤 Réponses

#### ✅ 200 OK – Liste ou pôle unique

```json
{
  "poles": [
    {
      "id": "pole-id",
      "name_fr": "Communication",
      "name_en": "Communication",
      "description_fr": "Gestion des réseaux",
      "description_en": "Social media",
      "show": true,
      "membres": [
        {
          "id": "membre-id",
          "first_name": "Alice",
          "last_name": "Dupont",
          "role_fr": "Responsable",
          "role_en": "Lead",
          "respo": true,
          "image": "url"
        }
      ]
    }
  ]
}
```

#### 🔴 404 Not Found

```json
{ "error": "Pole not found" }
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

## 🟡 `PATCH /api/pole?id=<poleId>`

### 🔍 Description

Permet de modifier la **description (fr/en)** ou la **visibilité (`show`)** d’un pôle.

---

### 📥 Query paramètre

| Nom  | Type   | Obligatoire | Description                  |
|------|--------|-------------|------------------------------|
| `id` | string | ✅ Oui       | Identifiant du pôle à modifier |

---

### 📥 Corps de la requête (`PolePatch`)

```json
{
  "description_fr": "Nouveau texte FR",
  "description_en": "New EN text",
  "show": true
}
```

- Tous les champs sont optionnels : s'ils ne sont pas fournis, les valeurs existantes sont conservées.

---

### 📤 Réponse

#### ✅ 200 OK

```json
{}
```

#### 🔴 400 Bad Request

```json
{ "error": "Missing order ID" }
```

#### 🔴 404 Not Found

```json
{ "error": "Pole not found" }
```

#### 🔴 500 Internal Server Error

```json
{ "error": "Internal Server Error" }
```

---

### 🧠 Notes techniques

- Utilise Prisma avec `pole`, `pole_membre` et `membre`
- Type `Pole`, `PolePatch` et `MembrePole` importés depuis `@/interfaces`
- Les descriptions sont facultatives, remplies avec `''` si nulles
- Le champ `show` permet de masquer/afficher un pôle sur le site

---

