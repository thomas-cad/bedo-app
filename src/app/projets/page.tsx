
"use client";

import React from "react";

const projets = [
  
    {
        nom: "Pôle Accueil",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
        membres: [
        { nom: "Camille Durand", photo: "/images/camille.jpg" },
        { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
        ],
      },
      {
        nom: "Pôle Agenda",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
        membres: [
        { nom: "Camille Durand", photo: "/image/favicon.ico" },
        { nom: "Nicolas Petit", photo: "/images/favicon.ico" },
        ],
      },
      {
        nom: "Pôle Alumni",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
        membres: [
        { nom: "Camille Durand", photo: "/images/camille.jpg" },
        { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
        ],
      },
      {
        nom: "Pôle Audio-Visuel",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Campagne",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Communication ",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Déco",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Environnement",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Foyer",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle IPP",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Infographie",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Informatique",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Intégration internationaux",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Maxi Mardi",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Parrainage",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Pots",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Prévention Alcool",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Relation Entreprise ",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle REC",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle Repas de Promo",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle textile",
        description:
          "Le pôle événementiel organise des soirées, conférences et activités pour animer la vie étudiante.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle WEI",
        description:
          "Le pôle communication gère les réseaux sociaux et assure la promotion des événements du BDE.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle WEE",
        description:
          "Le pôle sport organise des tournois et encourage la pratique sportive au sein de l'école.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle WEFA",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
      {
        nom: "Pôle WES",
        description:
          "Le pôle partenariats établit des collaborations avec des entreprises pour offrir des avantages aux étudiants.",
          membres: [
            { nom: "Camille Durand", photo: "/images/camille.jpg" },
            { nom: "Nicolas Petit", photo: "/images/nicolas.jpg" },
            ],
      },
];

export default function ProjetsPage() {
  return (
    <div
      className="relative min-h-screen text-gray-900 overflow-auto"
      style={{
        backgroundImage: "url('/image/lenaentier.jpg')", // Change l'image ici
        backgroundSize: "cover",
        backgroundAttachment: "fixed", // Fond fixe
        backgroundPosition: "center",
      }}
    >
      {/* Overlay sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/40"></div>
    
      {/* Message du Président */}
      <section className="max-w-3xl mx-auto text-center bg-white shadow-md rounded-lg p-6 mb-10">
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