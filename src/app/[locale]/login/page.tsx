"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-500" size={40} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg rounded-2xl bg-white">
        <CardContent className="flex flex-col items-center space-y-4">
          {session ? (
            <>
              <Typography variant="h6">Bienvenue, {session.user?.username}!</Typography>
              <Button variant="contained" color="error" onClick={() => signOut()}>
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">Connectez-vous avec SSO</Typography>
              <Button variant="contained" color="primary" onClick={() => signIn("Bedbusters")}
                className="w-full">
                Connexion
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
