🔐 Authentification avec NextAuth.js

Ce projet utilise NextAuth.js pour gérer l'authentification (OAuth, credentials, etc.).
📁 Fichier : src/app/api/[...nextauth]/route.ts


🧠 Explication

    NextAuth(authOptions) : instancie NextAuth avec la configuration définie dans @/auth.

    Les méthodes GET et POST sont exportées pour que Next.js puisse gérer automatiquement :

        GET → pour les requêtes comme /api/auth/session

        POST → pour les callbacks comme /api/auth/callback/[provider]

    🔁 Grâce à l’App Router, NextAuth s’intègre automatiquement avec cette API route "catch-all" ([...nextauth]).




✅ Rôle

    Expose les endpoints d'authentification via la nouvelle architecture App Router de Next.js 13+.

    Intègre NextAuth.js avec la configuration stockée dans authOptions.




Voici les endpoints disponibles une fois ce fichier en place :
Méthode	Route	Description
GET	/api/auth/providers	Récupère les fournisseurs d'auth
GET	/api/auth/csrf	Récupère le token CSRF
GET	/api/auth/session	Renvoie la session actuelle
POST	/api/auth/signin	Déclenche une tentative de connexion
POST	/api/auth/signout	Déconnecte l'utilisateur
POST	/api/auth/callback/[provider]	Callback après connexion OAuth




📦 Dépendance requise

Le projet utilise :

	npm install next-auth




🔒 Configuration associée

La configuration utilisée (authOptions) est définie dans le fichier @/auth.ts.

    Cette config contient les providers (GitHub, Google, etc.), les callbacks, la stratégie de session, etc.
