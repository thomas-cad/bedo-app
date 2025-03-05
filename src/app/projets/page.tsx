
"use client";

import React from "react";

const projets = [
  
    {
        nom: "Pôle Accueil",
        description:
          "Le pôle acceuil compte améliorer l'acceuil des nainsA nottament leur logements au debut de l'année et leur intégration",
        membres: [
         { nom: "Sebastien", photo: "/image/sebastien.jpg" },
         { nom: "Thomas R", photo: "/image/thomas-r.jpg" },
        ],
      },
      {
        nom: "Pôle Agenda",
        description:
          "Le pôle Agenda compte clarifier l'agenda de l'école en avertissant plus tot des evénements et en les repartissant de maniére équilibrée, notamment en organisant des events le WE",
        membres: [
         { nom: "Sylvia", photo: "/image/sylvia.jpg" },
         { nom: "Tara", photo: "/image/tara.jpg" },
        ],
      },
      {
        nom: "Pôle Alumni",
        description:
          "Continuer sur la lancée du BDE précedent pour toujours plus nous rapprocher de nos alumnis en créant plus d'event avec eux",
        membres: [
         { nom: "Aristide", photo: "/image/aristide.jpg" },
         { nom: "Thomas R", photo: "/image/thomas-r.jpg" },
         { nom: "Sylvia", photo: "/image/sylvia.jpg" },
         { nom: "Khalil", photo: "/image/khalil.jpg" },
        ],
      },
      {
        nom: "Pôle Audio-Visuel",
        description:
          " Divertir toujours plus ",
          membres: [
             { nom: "Sylvia", photo: "/image/sylvia.jpg" },
             { nom: "Sarah", photo: "/image/sarah.jpg" },
             { nom: "Lylia", photo: "/image/lylia.jpg" },
            ],
      },
      {
        nom: "Pôle Campagne",
        description:
          " Que les meilleurs gagnent",
          membres: [
             { nom: "Adam", photo: "/image/adam.jpg" },
             { nom: "Thomas C", photo: "/image/thomas-c.jpg" },
             { nom: "Lylia", photo: "/image/lylia.jpg" },
             { nom: "Sebastien", photo: "/image/sebastien.jpg" },
             { nom: "Yahya", photo: "/image/yahya.jpg" },
            ],
      },
      {
        nom: "Pôle Communication ",
        description:
          " Une meilleur communication permettra a tout le monde d'avoir accés aux information mais aussi et surtout de donner son avis pour faire changer les choses, vive le BDE pour tous",
          membres: [
             { nom: "Sarah", photo: "/image/sarah.jpg" },
             { nom: "Khalil", photo: "/image/khalil.jpg" },
             { nom: "Aristide", photo: "/image/aristide.jpg" },
            ],
      },
      {
        nom: "Pôle Déco",
        description:
          "Pour dynamiser le pôle déco du BDE, nous organiserons des ateliers où les premières années pourront peindre les tentures et personnaliser les tables de Coin Coin. Un budget sera débloqué pour des déguisements et décors adaptés aux thèmes des soirées. Nous prévoyons aussi des ateliers lors des soirées, comme des tatouages éphémères ou des tresses. On rendra ainsi les pots de Télécom plus attractifs pour les étudiants extérieurs comme pour les Télécommiens, en leur faisant participer à des activités divertissantes qui renforceront l’ambiance et leur offriront des souvenirs mémorables.",
          membres: [
             { nom: "Lylia", photo: "/image/lylia.jpg" },
             { nom: "Sebastien", photo: "/image/sebastien.jpg" },
             { nom: "Sarah", photo: "/image/sarah.jpg" },
             { nom: "Mao", photo: "/image/mao.jpg" },
            ],
      },
      {
        nom: "Pôle Environnement",
        description:
          "Mettre des eoliennes en cours de Tsé, parceque c'est vraiment du vent ce qu'ils nous racontent",
          membres: [
             { nom: "Alessandro", photo: "/image/alessandro.jpg" },
             { nom: "Tara", photo: "/image/tara.jpg" },
            ],
      },
      {
        nom: "Pôle Foyer",
        description:
          " En collaborant avec les autres assos utilisant le foyer notament le bar, nous aimerions revolutionner le foyer en le rendant plus convivial. L'installation de tables, chaises et parasols pour nous protéger du soleil de Palaiseau permettrait a chacun de s'y poser à la fin des cours",
          membres: [
             { nom: "Théophile", photo: "/image/théophile.jpg" },
             { nom: "Arnaud", photo: "/image/arnaud.jpg" },
             { nom: "Adam", photo: "/image/adam.jpg" },
            ],
      },
      {
        nom: "Pôle IPP",
        description:
          "-Faire des familles ipp groupe de 6 (ou au moins les écoles qui sont sur le plateau) une personne par école avec des goûts/assos identiques (qcm comme au début d’année groupe Wei idée est que chacun invite son groupe aux évents de son école)\n "+
"-Cotisation commune pour IPP pour avoir des prix cotisant IPP quand on va faire des évents dans les autres écoles pas trop cher au début. Il y a certes des prix IPP mais ça permettrait aussi de faire plus d’évent IPP.\n"+
"-Faire des IPPot pot avec une école de lipp \n"+

"-Super IPPot pot avec toute les école de lipp (une fois dans l’année) (ya un projet de tournoi de coin coin qui se met en place avec toutes les écoles de l’IPP et d’autres écoles mais organisé par les bars)\n"+

"-Favoriser la communication entre les écoles pour créer plus d’évènements et plus gros et c’est l’occasion de connaître les gens des autres écoles, genre application ou compte instagram qui résumerait tout les évents de l’IPP \n" +
" faire un site pour permettre facilement aux assos équivalents de rentrer en contact ( asso de voile de chaque école / asso de musiques / bar …) \n"+

"-Avoir un vêtement genre veste campus américain de lipp pour sentiment d' appartenance commune. \n"+

"-Équipe de sport de IPP genre 1 entraînement par semaine certain se plaigne qu il n’y a pas un assez bon niveau à télécom pour les sports collectif et équipe féminine qui sont parfois difficile à remplir. \n"+

"-étendre le pôle aux autres relations les autres écoles du plateau ou création d’un nouveau pôle\n"+

"-création d’un canal de communication commun à l’IPP (application par exemple)\n"+

"-Faire un compte insta des écoles de l’iPP pour que ça soit plus clair les évents de toutes les écoles \n"+
"Reposter plus les évents des autres écoles qui peuvent être intéressant pour les télécommiens \n"+
"Peut être un autre compte pour poster photos dé cometes (moins officie) ou sur le même compte \n"+

"-Week end IPP \n"+

"-Tournoi de coin coin inter bar ( le bar à une place importante dans les soirées si les barmans se connaissent et s’entendent bien entre les écoles alors ça va favoriser la vie asso) \n"+

"-Genre d’Oktobb a telecom qu' avec les écoles de l’IPP \n"+

"-Welcome IPP day \n"+

"-création  d’une plateforme alumni de l’IPP \n"+


"Globalement\n"+
"— avoir une offre devant plus vaste et varié dans lipp notamment le week end ou vers calme \n"+
"— faire de nouvelles rencontre \n"+
"— il y a déjà qlq évents mais souvent y’a 0 buzz comme les gens se connaissent pas \n",
          membres: [
             { nom: "Arnaud", photo: "/image/arnaud.jpg" },
             { nom: "Sylvia", photo: "/image/sylvia.jpg" },
             { nom: "Aristide", photo: "/image/aristide.jpg" },
             { nom: "Thomas R", photo: "/image/thomas-r.jpg" },
            ],
      },
      {
        nom: "Pôle Infographie",
        description:
          "Créer une identité visuelle à Télécom (par exemple améliorer le site du BDE en mettant en avant les couleurs de l’école) .\n " + "Créer une typographie particulière pour toutes les affiches du BDE \n"
          +"Travailler en lien étroit avec le pôle Communication Insta pour prévoir des posts à l’avance \n",
          membres: [
             { nom: "Sylvia", photo: "/image/sylvia.jpg" },
             { nom: "Sarah", photo: "/image/sarah.jpg" },
             { nom: "Lylia", photo: "/image/lylia.jpg" },
            ],
      },
      {
        nom: "Pôle Informatique",
        description:
          "Nous avons pour projet de mettre un filtre a nos pots qui permette un meilleur controle des extés par leur adresse mail. Ensuite nous avons aussi pour projet de mettre en place une application permettant de se tenir informé de la vie asso sans etre innondé comme sur whatsapp.",
          membres: [
             { nom: "Yahya", photo: "/image/yahya.jpg" },
             { nom: "Arnaud", photo: "/image/arnaud.jpg" },
             { nom: "Thomas C", photo: "/image/thomas-c.jpg" },
            ],
      },
      {
        nom: "Pôle Intégration internationaux",
        description:
          "1) Au niveau de l’intégration au début d’année : faire un vrai parrainage 2A-inter , donc faire des familles plus petite 4-6 moitié français moitié inter avec nationalité différentes, et organiser des jeux -> style la famille qui cuisine le plus beau gâteau/ faire un truc à paris/ trucs sportif …. L’objectif est juste qu ils vivent des trucs sympa ensemble et passer du temps car c est avec le temps que les amitiées se forment" + 

"2) des inter m’ont parlé que dans certains cours de 2A les inter ont bcp de mal à tt comprendre au début, du mal à s’amarrer au système -> possibilités de former des groupes de travail/ tutorats " +

"3) sensibilisation aux 2A que théoriquement c est plus à nous de faire le premier pas car on est chez nous, dans une école qu on connaît, avec des gens qu’on connaît déjà. Des petits gestes simple : inviter à participer à une équipe de coin coin, proposer de venir à un maxi mardi auquel on va ou soirée exté, … " +

"4) proposer des activités pour les aider à améliorer leur francais -> car en vrai tu peux pas vraiment t'intégrer dans un groupe si tu ne comprends pas la conversation/ blague et que tu ne peux pas t'exprimer",
          membres: [
             { nom: "Arnaud", photo: "/image/arnaud.jpg" },
             { nom: "Mao", photo: "/image/mao.jpg" },
             { nom: "Sebastien", photo: "/image/sebastien.jpg" },
             { nom: "Khalil", photo: "/image/khalil.jpg" },
            ],
      },
      {
        nom: "Pôle Maxi Mardi",
        description:
          "Pôle maxi mardi : C’est LE pôle qui organise la meilleure activité hebdomadaire de Télécom ! On se retrouve tous les mardis pour un event fun qui met en avant toute la richesse de la vie associative de l’école. Nos objectifs : renforcer la communication entre le BDE et les assos/club, rester à leur disposition, tenir un planning solide. Nous veillons ainsi au bon déroulement des événements et à une répartition équilibrée des dates tout au long de l’année.",
          membres: [
             { nom: "Arnaud", photo: "/image/arnaud.jpg" },
             { nom: "Mao", photo: "/image/mao.jpg" },
            ],
      },
      {
        nom: "Pôle Parrainage",
        description:
          "Nous visons à retravailler un peu le formulaire de parrainage de début d'année dans l'optique de créer des groupes du WEI plus compatibles. Pour encourager la prise de contact, nous pourrions également proposer plus  d'activités en groupe à faire en amont du WEI (ramener un objet en particulier, trouver un nom de groupe, etc). Il est toutefois essentiel de faire en sorte que les nainA ne se sentent pas obligés de traîner avec ce groupe s'il s'avère qu'il ne leur convient pas.",
          membres: [
             { nom: "Mao", photo: "/image/mao.jpg" },
             { nom: "Carl", photo: "/image/carl.jpg" },
             { nom: "Théophile", photo: "/image/théophile.jpg" },
             { nom: "Ismail", photo: "/image/ismail.jpg" },
            ],
      },
      {
        nom: "Pôle Pots",
        description:
          "Le pole POTS un des plus important pour vous organiser vos soirées les plus MEMORABLES. On s'occupe de tout pour que tout le monde y trouve son compte histoire que la soirée soit un pur kiffe pour vous !!!! On va essayer d organiser des soirées avec notamment les autres ecoles de l IPP et les voisins du plateau (on evite les centraliens) pour qu'on puisse viber avec nos potes. Tout en essayant d'eviter les casses et les problèmes.",
          membres: [
             { nom: "Ismail", photo: "/image/ismail.jpg" },
             { nom: "Yahya", photo: "/image/yahya.jpg" },
             { nom: "Aristide", photo: "/image/aristide.jpg" },
             { nom: "Adam", photo: "/image/adam.jpg" },
            ],
      },
      {
        nom: "Pôle Prévention Alcool",
        description:
          " L'alcool c'est pas de l'eau",
          membres: [
             { nom: "Adam", photo: "/image/adam.jpg" },
             { nom: "Ismail", photo: "/image/ismail.jpg" },
            ],
      },
      {
        nom: "Pôle Relation Entreprise ",
        description:
          " Démarcher plus d’entreprises pour rendre les différents évènements associatifs plus accessibles. Cela peut se faire à la fois avec des gros partenariats qui permettraient de diminuer le prix des week-ends, mais aussi des plus petits partenariats via des groupes comme Groupes campus ou Konect qui permettraient de réduire les coûts des dîners de promos. Rester très ouverts sur les partenariats que l’on choisit, en discuter avec le pôle écologie et MAD.",
          membres: [
             { nom: "Carl", photo: "/image/carl.jpg" },
             { nom: "Thomas C", photo: "/image/thomas-c.jpg" },
             { nom: "Thomas R", photo: "/image/thomas-r.jpg" },
             { nom: "Alessandro", photo: "/image/alessandro.jpg" },
             { nom: "Sylvia", photo: "/image/sylvia.jpg" },
             { nom: "Aristide", photo: "/image/aristide.jpg" },
            ],
      },
      {
        nom: "Pôle REC",
        description:
          " Raveparty-Echangisme-Cocaine, y a pas de non y a que des ouis ",
          membres: [
             { nom: "Alessandro", photo: "/image/alessandro.jpg" },
             { nom: "Ismail", photo: "/image/ismail.jpg" },
             { nom: "Khalil", photo: "/image/khalil.jpg" },
             { nom: "Tara", photo: "/image/tara.jpg" },
             { nom: "Sylvia", photo: "/image/sylvia.jpg" },
            ],
      },
      {
        nom: "Pôle Repas de Promo",
        description:
          " miam",
          membres: [
             { nom: "Ismail", photo: "/image/ismail.jpg" },
             { nom: "Mao", photo: "/image/mao.jpg" },
             { nom: "Carl", photo: "/image/carl.jpg" },
             { nom: "Théophile", photo: "/image/théophile.jpg" },
             { nom: "Yahya", photo: "/image/yahya.jpg" },
            
            ],
      },
      {
        nom: "Pôle textile",
        description:
          " Proposer plus de vetemnets de promo, (casquette, bob, tee-shirt, proposer un sondage pour savoir ce que les élèves veulent)",
          membres: [
             { nom: "Tara", photo: "/image/tara.jpg" },
             { nom: "Sarah", photo: "/image/sarah.jpg" },
             { nom: "Thomas C", photo: "/image/thomas-c.jpg" },
            ],
      },
      {
        nom: "Pôle WEI",
        description:
          " Banger",
          membres: [
             { nom: "Tara", photo: "/image/tara.jpg" },
             { nom: "Carl", photo: "/image/carl.jpg" },
             { nom: "Théophile", photo: "/image/théophile.jpg" },
             { nom: "Yahya", photo: "/image/yahya.jpg" },
             { nom: "Thomas R", photo: "/image/thomas-r.jpg" },
            ],
      },
      {
        nom: "Pôle WEE",
        description:
          "Nous ferons de notre possible – en discutant avec l’administration - pour que le week-end à l’étranger débute le jeudi soir ou se finisse le lundi soir : nous souhaitons que les télécomiens puissent profiter au maximum de cette aventure" +
          " en y consacrant 3 jours complets. " +
            "Après les Pays-Bas, nous avons pensé à l’Italie, à Turin ou Milan, pour notre prochaine destination !",
          membres: [
             { nom: "Ismail", photo: "/image/ismail.jpg" },
             { nom: "Khalil", photo: "/image/khalil.jpg" },
             { nom: "Adam", photo: "/image/adam.jpg" },
             { nom: "Lylia", photo: "/image/lylia.jpg" },
            ],
      },
      {
        nom: "Pôle WEFA",
        description:
          "Banger",
          membres: [
             { nom: "Yahya", photo: "/image/yahya.jpg" },
             { nom: "Aristide", photo: "/image/aristide.jpg" },
             { nom: "Alessandro", photo: "/image/alessandro.jpg" },
            ],
      },
      {
        nom: "Pôle WES",
        description:
          "Banger version il fait froid",
          membres: [
             { nom: "Sarah", photo: "/image/sarah.jpg" },
             { nom: "Thomas C", photo: "/image/thomas-c.jpg" },
             { nom: "Sebastien", photo: "/image/sebastien.jpg" },
             { nom: "Thomas R", photo: "/image/thomas-r.jpg" },
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
        <h1 className="text-3xl font-bold text-[#0CFF21]">Message du Président</h1>
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
            <h2 className="text-2xl font-semibold text-[#0CFF21]">{p.nom}</h2>
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