import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    providers: [
      {
        id: "Bedbusters",
        name: "Bedbusters",
        type: "oauth",
        wellKnown: "https://auth.garezeldap.rezel.net/application/o/bedbuster/.well-known/openid-configuration",
        issuer: process.env.AUTH_OIDC_ISSUER,
        clientId: process.env.AUTH_OIDC_CLIENT_ID,
        clientSecret: process.env.AUTH_OIDC_CLIENT_SECRET,
        authorization: {
          params: {
            scope: "openid profile email",
          },
        },
        idToken: true,
        checks: ["pkce", "state"],
        profile(profile) {
          console.log("User logged in", { 
            userId: profile.sub,
            username: profile.preferred_username,
            email: profile.email
          });
          return {
            id: profile.sub,
            username: profile.preferred_username || profile.username || profile.sub?.toLowerCase(),
            name: profile.name || profile.displayName || `${profile.given_name} ${profile.family_name}`,
            email: profile.email,
            email_verified: profile.email_verified || false,
            groups: profile.groups || [],
          };
        },
      },
    ],
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60, // 1 day
      updateAge: 60 * 60, // 1 hour
    },
    cookies: {
      sessionToken: {
        name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: process.env.NEXTAUTH_URL?.startsWith('https://'),
          domain: process.env.NODE_ENV === 'production' ? '.ton-domaine.com' : undefined,
        },
      },
    },
    useSecureCookies: process.env.NEXTAUTH_URL?.startsWith('https://'),
    pages: {
      error: "/sign-in",
      signIn: "/login",
      signOut: "/sign-in",
    },
    callbacks: {
      jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.username = user.username;
          token.name = user.name;
          token.email = user.email;
          token.groups = user.groups || [];
        }
        return token;
      },
      session({ session, token }) {
        session.user = {
          id: token.id as string,
          username: token.username as string,
          name: token.name as string,
          email: token.email as string,
          email_verified: token.email_verified as boolean || false,
          groups: token.groups as string[] || [],
        };
        return session;
      },
    },
    debug: process.env.NODE_ENV === "development",
  };

export default authOptions;
