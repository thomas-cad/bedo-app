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
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  pages: {
    error: "/sign-in",
    signIn: "/login",
    signOut: "/sign-in",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - user:", user);
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.groups = user.groups || [];
      } else {
        console.log("JWT callback - no user");
      }

      // Log JWT size to check if it's too large
      const tokenSize = JSON.stringify(token).length;
      console.log(`JWT size: ${tokenSize} bytes`);

      return token;
    },
    session({ session, token }) {
      console.log("Session callback - token:", token);

      session.user = {
        id: token.id || "",
        username: token.username || "",
        name: token.name || "",
        email: token.email || "",
        email_verified: token.email_verified || false,
        groups: token.groups || [],
      };

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
