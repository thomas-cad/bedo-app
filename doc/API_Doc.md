# Documentation de l'API

## Introduction

Cette API permet de gérer des éléments (items) et leurs tailles associées. Elle utilise Prisma comme ORM pour interagir avec la base de données.

## Endpoints

### 1. Récupérer un élément par son ID

- **URL**: `/api/items/:id`
- **Méthode**: `GET`
- **Description**: Récupère un élément spécifique ainsi que ses tailles associées en utilisant son ID.

- **Paramètres**:
  - `id` (string): L'identifiant unique de l'élément à récupérer.

- **Réponse**:
  - **Succès**:
    - Code: `200 OK`
    - Contenu: Un objet JSON représentant l'élément avec ses tailles.
      ```json
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "sizes": [
          {
            "size_id": "string",
            "size": "string",
            "stock": number,
            "uniqueItemId": "string"
          }
        ]
      }
      ```
  - **Erreur**:
    - Code: `404 Not Found`
    - Contenu: `{ "error": "Item not found" }`
    - Code: `500 Internal Server Error`
    - Contenu: `{ "error": "Internal Server Error" }`

### 2. Récupérer tous les éléments

- **URL**: `/api/items`
- **Méthode**: `GET`
- **Description**: Récupère tous les éléments disponibles dans la base de données.

- **Réponse**:
  - **Succès**:
    - Code: `200 OK`
    - Contenu: Un tableau JSON d'objets représentant les éléments.
      ```json
      [
        {
          "id": "string",
          "name": "string",
          "description": "string"
        }
      ]
      ```
  - **Erreur**:
    - Code: `500 Internal Server Error`
    - Contenu: `{ "error": "Internal Server Error" }`

## Exemples d'utilisation

### Récupérer un élément par son ID

```bash
GET /api/items/12345
```

### Récupérer tous les éléments

```bash
GET /api/items
```

## Remarques

- Assurez-vous que le serveur Prisma est correctement configuré et connecté à votre base de données.
- Les erreurs sont journalisées côté serveur pour faciliter le débogage.