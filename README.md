This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

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