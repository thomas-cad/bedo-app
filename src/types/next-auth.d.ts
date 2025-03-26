import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            name: string;
            given_name?: string;
            email: string;
            email_verified: boolean;
            groups: string[];
        } & DefaultSession["user"];
        
        accessToken?: string;
        idToken?: string;
        expires?: string;
    }

    interface User extends DefaultUser {
        id: string;
        username: string;
        name: string;
        given_name?: string;
        email: string;
        email_verified: boolean;
        groups: string[];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        username: string;
        name: string;
        given_name?: string;
        email: string;
        email_verified: boolean;
        groups: string[];
        accessToken?: string;
        idToken?: string;
        expiresAt?: number;
    }
}