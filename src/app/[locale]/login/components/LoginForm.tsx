"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({t}:{t:{login:{rezel:string}}}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSSOLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn("Bedbusters", { 
        callbackUrl: "/",
        redirect: false 
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la connexion");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div>
        <button
          onClick={handleSSOLogin}
          disabled={isLoading}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0CFF21] hover:bg-[#0CFF21] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0CFF21] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Connexion en cours..." : t.login.rezel}
        </button>
      </div>
    </div>
  );
}