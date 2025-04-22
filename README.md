# BedBusters App

## Description

Bedo App est une application web développée avec **React (Next.js)**. Elle est conçue pour présenter la liste et les goodies de l'équipe BedBusters. L'application inclut une boutique en ligne, un système d'authentification utilisant le SSO de Rezel, et une interface d'administration.

> **Note** : Le paiement n'est pas réalisé sur le site. Ce choix a été motivé par les surplus engendrés par l'utilisation de Lydia ou d'autres solutions de paiement en ligne.

---

## Stack Technique

| Composant           |            Technologie             |
|---------------------|:----------------------------------:|
| 🖥 Front-End        |          React (Next.js)           |
| ⚙️ Back-End         |       Next.js + Prisma             |
| 🗄 Base de Données  |        PostgreSQL (SQL)            |
| 🔐 Authentification | JWT + Next-Auth + SSO Rezel        |
| 🚀 DevOps           |             Docker                 |

---

## Fonctionnalités

### Pages principales
- **Home Page** 🏠 : Présentation de l'équipe, abonnements aux événements, vidéos, et pôles.
- **Projet** 🚀 : Présentation des projets des pôles.
- **Team** 🏂 : Présentation de l'équipe et constitution des pôles.
- **Boutique en ligne** 🛒 : Achat de goodies.

### Administration
- **Page Admin** 🔧 : Gestion des pôles, des stocks, et des commandes.

### Multilingue
Le site est multilingue, compatible avec l'anglais et le français, et détecte automatiquement la langue de l'utilisateur.

---

## Installation et Configuration

### Prérequis
- **Node.js** (version recommandée : 18.x)
- **Docker** et **Docker Compose**
- **PostgreSQL**

### Étapes d'installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/thomas-cad/bedo-app.git
   cd bedo-app
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez l'environnement :
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :
   ```env
   # Node.js environment
   NODE_ENV=development

   # Database configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name

   # PostgreSQL
   PG_USER=your_pg_user
   PG_PWD=your_pg_password

   # DB URL
   DB_URL=postgresql://your_pg_user:your_pg_password@localhost:5432/your_db_name
   ```

4. Lancez l'application en mode développement :
   ```bash
   npm run dev
   ```

5. Accédez à l'application sur [http://localhost:3000](http://localhost:3000).

---

## Développement

### Lancer l'environnement de développement
Pour démarrer l'application avec Docker Compose :
```bash
docker-compose up --build
```

### Commandes utiles
- **Démarrer le serveur** : `npm run dev`
- **Build de production** : `npm run build`
- **Linting** : `npm run lint`

---

## Base de Données

### Gestion avec Prisma
Le projet utilise **Prisma** pour interagir avec la base de données PostgreSQL.

- **Documentation Prisma** : [Prisma Docs](https://www.prisma.io/docs)

### Commandes Prisma
- Générer le client Prisma :
  ```bash
  npx prisma generate
  ```
- Appliquer les migrations :
  ```bash
  npx prisma migrate dev
  ```

---

## Déploiement

Pour démarrer l'application en production avec Docker Compose :
```bash
docker-compose --profile prod up
```

---

## Documentation

### Base de Données
Le schéma de la base de données est disponible dans le fichier `/doc/ERD.svg`.

### API
La documentation des différentes API du projet se trouve dans le dossier `/doc`.

### Architecture
L'architecture principale du projet est illustrée dans le fichier `/doc/Architecture.svg`.

---

## Auteurs

- **Thomas Cad** - Développeur principal
- **Équipe BedBusters**

---

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.