"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces";

export default function ClientComponent({ user, locale, t }: { user: User, locale: string, t: { "my-account": { "my-account": string, admin: string, user: string, pannel: string, disconnect: string } } }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/" + locale + "/login"); // Manually redirect after sign out
  };

  return (
    <div className="mt-24">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Mon Compte</h1>
              <div className="px-3 py-1 rounded-full text-sm font-medium text-[#0CFF21]">
                {user.isAdmin ? t["my-account"].admin : t["my-account"].user}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-lg font-medium text-gray-700 mb-2">Informations</h2>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                {user.isAdmin && (
                  <button
                    onClick={() => router.push("/orders")}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0CFF21] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0CFF21] transition-colors"
                  >
                    {t["my-account"].pannel}
                  </button>
                )}

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0CFF21] transition-colors"
                >
                  {t["my-account"].disconnect}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}