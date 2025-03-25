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
