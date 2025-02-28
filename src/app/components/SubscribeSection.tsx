"use client";

import { useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email.includes("@")) {
      setMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    setEmail(""); // Réinitialiser l'input
  };
    /* // Stocker l'email (simulé ici avec console.log)
    console.log("Email enregistré:", email);
    setMessage("Merci ! Vous êtes inscrit aux événements.");
    setEmail(""); // Réinitialiser l'input */
 

  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl text-[#0CFF21] font-semibold">Inscrivez-vous aux événements</h2>
      <input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleSubscribe} className="px-4 py-2 bg-[#0CFF21] text-white rounded-md">
        S'abonner
      </button>
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
};