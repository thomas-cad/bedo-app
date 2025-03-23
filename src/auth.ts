import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "Bedbusters",
      name: "Bedbusters",
      type: "oauth",
      issuer: "https://auth.garezeldap.rezel.net/application/o/bedbuster/",
      clientId: process.env.AUTH_OIDC_CLIENT_ID,
      clientSecret: process.env.AUTH_OIDC_CLIENT_SECRET,
      authorization: {
        url: "https://auth.garezeldap.rezel.net/application/o/authorize/",
        params: {
          scope: "openid profile email",
          response_type: "code",
        },
      },
      token: "https://auth.garezeldap.rezel.net/application/o/token/",
      userinfo: "https://auth.garezeldap.rezel.net/application/o/userinfo/",
      profile(profile) {
        console.log("User logged in", { userId: profile.sub });
        return {
          id: profile.sub,
          username: profile.preferred_username || profile.sub?.toLowerCase(),
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
        };
      },
    },
  ],
  pages: {
    error: "/sign-in",
    signIn: "/login",
    signOut: "/sign-in",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.username = token.username ?? "";
      session.user.email = token.email ?? "";
      return session;
    },
  },
};

export default authOptions;