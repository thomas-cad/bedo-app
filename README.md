# WSTC Project

## Stack Tech

| Composant           |            Technologie             |
|---------------------|:----------------------------------:|
| 🖥 Front-End        |          React (Next.js)           |
| ⚙️ Back-End         |    NestJS (Node.js) + GraphQL      |
| 🗄 Base de Données  | PostgreSQL (SQL) |
| 🔐 Authentification |          JWT + OAuth2              |
| 🚀 DevOps           |     Docker, Kubernetes, CI/CD      |

## Structure du site web

### Home Page 🏠
- 📸 **Photo de la team**
- 📅 **S'abonner aux events**
- 🎥 **Vidéo du live**
- 🏛️ **Le bureau**
- 🔍 **Les pôles**

### Projet 🚀
- ✍️ **Texte de Thomas R**
- 📊 **Mesures par pôles**

### Events / Paiement 🎉💳
- 📅 **S'abonner aux events**
- 🍻 **Apéro**
- 🍽️ **Le menu**
- 💰 **Les prix**
- 🌙 **Soirée**

### Défis (Si le temps) 🎯
- 🏆 **Défis sérieux**
- 🎭 **Défis funs**

### Description
Le site regroupe la majorité des informations de la liste. On y trouve bien sûr les membres des BedBusters ainsi que leurs pôles, mais il est aussi possible d'y trouver notre boutique en ligne afin d'acheter nos goodies.
Nous avons étudié l'option de faire passer les acheteurs par lydia, néanmoins nous avons décidé de ne pas suivre cette route car nous aurions eu besoin de payer l'abonnement lydia pro.
Ainsi, pour assurer que les gens paient le panier qu'ils ont confirmé, nous avons implémenté l'authentification des télécomiens grâce au sso de Rezel, permettant ainsi de s'assurer que ce sont des télécomiens que nous connaissons qui puissent acheter des goodies, garantissant l'intégrité du stock affiché.



### Page Admin (Si le temps) 🔧

---

## Environment Configuration

To configure the environment for your application, create a `.env` file in the root directory of your project with the following content:

```env
# Node.js environment
NODE_ENV=

# Database configuration
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# PG
PG_USER=
PG_PWD=

# DB URL
DB_URL=
```

### Explanation:

- **NODE_ENV**: Specifies the environment mode. Set to `development` for development purposes.
- **DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME**: Database connection details.
- **PG_USER, PG_PWD**: PostgreSQL user credentials.
- **DB_URL**: The full URL for connecting to the PostgreSQL database.

