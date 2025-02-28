
"use client";

import React from "react";

const projets = [
  
    {
        nom: "Pôle Accueil",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
        membres: [
        { nom: "Sebastien", photo: "/images/sebastien.jpg" },
        { nom: "Thomas R", photo: "/images/thomas-r.jpg" },
        ],
      },
      {
        nom: "Pôle Agenda",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
        membres: [
        { nom: "Sylvia", photo: "/image/sylvia.jpg" },
        { nom: "Tara", photo: "/images/tara.jpg" },
        ],
      },
      {
        nom: "Pôle Alumni",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
        membres: [
        { nom: "Aristide", photo: "/images/aristide.jpg" },
        { nom: "Thomas R", photo: "/images/thomas-r.jpg" },
        { nom: "Sylvia", photo: "/images/sylvia.jpg" },
        { nom: "Khalil", photo: "/images/khalil.jpg" },
        ],
      },
      {
        nom: "Pôle Audio-Visuel",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Sylvia", photo: "/images/sylvia.jpg" },
            { nom: "Sarah", photo: "/images/sarah.jpg" },
            { nom: "Lylia", photo: "/images/lylia.jpg" },
            ],
      },
      {
        nom: "Pôle Campagne",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Adam", photo: "/images/adam.jpg" },
            { nom: "Thomas C", photo: "/images/thomas-c.jpg" },
            { nom: "Lylia", photo: "/images/lylia.jpg" },
            { nom: "Sebastien", photo: "/images/sebastien.jpg" },
            { nom: "Yahya", photo: "/images/yahya.jpg" },
            ],
      },
      {
        nom: "Pôle Communication ",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Sarah", photo: "/images/sarah.jpg" },
            { nom: "Khalil", photo: "/images/khalil.jpg" },
            { nom: "Aristide", photo: "/images/aristide.jpg" },
            ],
      },
      {
        nom: "Pôle Déco",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Lylia", photo: "/images/lylia.jpg" },
            { nom: "Sebastien", photo: "/images/sebastien.jpg" },
            { nom: "Sarah", photo: "/images/sarah.jpg" },
            { nom: "Mao", photo: "/images/mao.jpg" },
            ],
      },
      {
        nom: "Pôle Environnement",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Alessandro", photo: "/images/alessandro.jpg" },
            { nom: "Tara", photo: "/images/tara.jpg" },
            ],
      },
      {
        nom: "Pôle Foyer",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Théophile", photo: "/images/théophile.jpg" },
            { nom: "Arnaud", photo: "/images/arnaud.jpg" },
            { nom: "Adam", photo: "/images/adam.jpg" },
            ],
      },
      {
        nom: "Pôle IPP",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Arnaud", photo: "/images/arnaud.jpg" },
            { nom: "Sylvia", photo: "/images/sylvia.jpg" },
            { nom: "Aristide", photo: "/images/aristide.jpg" },
            { nom: "Thomas R", photo: "/images/thomas-r.jpg" },
            ],
      },
      {
        nom: "Pôle Infographie",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Sylvia", photo: "/images/sylvia.jpg" },
            { nom: "Sarah", photo: "/images/sarah.jpg" },
            { nom: "Lylia", photo: "/images/lylia.jpg" },
            ],
      },
      {
        nom: "Pôle Informatique",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",membres: [
            { nom: "Yahya", photo: "/images/yahya.jpg" },
            { nom: "Arnaud", photo: "/images/arnaud.jpg" },
            { nom: "Thomas C", photo: "/images/thomas-c.jpg" },
            ],
      },
      {
        nom: "Pôle Intégration internationaux",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Arnaud", photo: "/images/arnaud.jpg" },
            { nom: "Mao", photo: "/images/mao.jpg" },
            { nom: "Sebastien", photo: "/images/sebastien.jpg" },
            { nom: "Khalil", photo: "/images/khalil.jpg" },
            ],
      },
      {
        nom: "Pôle Maxi Mardi",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Arnaud", photo: "/images/arnaud.jpg" },
            { nom: "Mao", photo: "/images/mao.jpg" },
            ],
      },
      {
        nom: "Pôle Parrainage",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Mao", photo: "/images/mao.jpg" },
            { nom: "Carl", photo: "/images/carl.jpg" },
            { nom: "Théophile", photo: "/images/théophile.jpg" },
            { nom: "Ismail", photo: "/images/ismail.jpg" },
            ],
      },
      {
        nom: "Pôle Pots",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Ismail", photo: "/images/ismail.jpg" },
            { nom: "Yahya", photo: "/images/yahya.jpg" },
            { nom: "Aristide", photo: "/images/aristide.jpg" },
            { nom: "Adam", photo: "/images/adam.jpg" },
            ],
      },
      {
        nom: "Pôle Prévention Alcool",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Adam", photo: "/images/adam.jpg" },
            { nom: "Ismail", photo: "/images/ismail.jpg" },
            ],
      },
      {
        nom: "Pôle Relation Entreprise ",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Carl", photo: "/images/carl.jpg" },
            { nom: "Thomas C", photo: "/images/thomas-c.jpg" },
            { nom: "Thomas R", photo: "/images/thomas-r.jpg" },
            { nom: "Alessandro", photo: "/images/alessandro.jpg" },
            { nom: "Sylvia", photo: "/images/sylvia.jpg" },
            { nom: "Aristide", photo: "/images/aristide.jpg" },
            ],
      },
      {
        nom: "Pôle REC",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Alessandro", photo: "/images/alessandro.jpg" },
            { nom: "Ismail", photo: "/images/ismail.jpg" },
            { nom: "Khalil", photo: "/images/khalil.jpg" },
            { nom: "Tara", photo: "/images/tara.jpg" },
            { nom: "Sylvia", photo: "/images/sylvia.jpg" },
            ],
      },
      {
        nom: "Pôle Repas de Promo",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Ismail", photo: "/images/ismail.jpg" },
            { nom: "Mao", photo: "/images/mao.jpg" },
            { nom: "Carl", photo: "/images/carl.jpg" },
            { nom: "Théophile", photo: "/images/théophile.jpg" },
            { nom: "Yahya", photo: "/images/yahya.jpg" },
            
            ],
      },
      {
        nom: "Pôle textile",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Tara", photo: "/images/tara.jpg" },
            { nom: "Sarah", photo: "/images/sarah.jpg" },
            { nom: "Thomas C", photo: "/images/thomas-c.jpg" },
            ],
      },
      {
        nom: "Pôle WEI",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Tara", photo: "/images/tara.jpg" },
            { nom: "Carl", photo: "/images/carl.jpg" },
            { nom: "Théophile", photo: "/images/théophile.jpg" },
            { nom: "Yahya", photo: "/images/yahya.jpg" },
            { nom: "Thomas R", photo: "/images/thomas-r.jpg" },
            ],
      },
      {
        nom: "Pôle WEE",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Ismail", photo: "/images/ismail.jpg" },
            { nom: "Khalil", photo: "/images/khalil.jpg" },
            { nom: "Adam", photo: "/images/adam.jpg" },
            { nom: "Lylia", photo: "/images/lylia.jpg" },
            ],
      },
      {
        nom: "Pôle WEFA",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Yahya", photo: "/images/yahya.jpg" },
            { nom: "Aristide", photo: "/images/aristide.jpg" },
            { nom: "Alessandro", photo: "/images/alessandro.jpg" },
            ],
      },
      {
        nom: "Pôle WES",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Sarah", photo: "/images/sarah.jpg" },
            { nom: "Thomas C", photo: "/images/thomas-c.jpg" },
            { nom: "Sebastien", photo: "/images/sebastien.jpg" }
            { nom: "Thomas R", photo: "/images/thomas-r.jpg" },
            ],
      },
];

export default function ProjetsPage() {
  return (
    <div
      className="relative min-h-screen text-gray-900 overflow-auto"
      style={{
        backgroundImage: "url('/image/Team-bed.jpg')", // Change l'image ici
        backgroundSize: "cover",
        backgroundAttachment: "fixed", // Fond fixe
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)"
      }}
    >
      {/* Overlay sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: -1 }}>
      </div>
    
       <div className="relative z-10"></div>

      {/* Message du Président */}
    
      <section className="max-w-3xl mx-auto text-center bg-white shadow-md rounded-lg p-6 mb-10 mt-16">
        <h1 className="text-3xl font-bold text-blue-600">Message du Président</h1>
        <p className="mt-4 text-lg">
          "Bienvenue sur la page des projets du BDE ! Notre équipe travaille
          chaque jour pour améliorer la vie étudiante en proposant des
          événements, des partenariats et des activités enrichissantes. Découvrez
          nos pôles et leurs projets passionnants !"
        </p>
      </section>

      {/* Projets des pôles */}
      <section className="max-w-4xl mx-auto grid gap-6">
        {projets.map((p, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-500">{p.nom}</h2>
            <p className="mt-2 text-gray-700">{p.description}</p>

            {/* Liste des membres */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {p.membres.map((membre, idx) => (
                <div key={idx} className="text-center">
                  <img
                    src={membre.photo}
                    alt={membre.nom}
                    className="w-20 h-20 rounded-full mx-auto shadow-md"
                  />
                  <p className="mt-2 text-sm font-medium">{membre.nom}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}