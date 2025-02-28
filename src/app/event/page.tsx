
export default function EventsList() {
  const events = [
    {
      date: "Vendredi 15 Mars 2025",
      time: "19h30",
      title: "Apéro Chill 🍹",
      description: "Un moment convivial avec un menu spécial : 🍕 Pizza, 🍷 Vin, 🍹 Cocktails et plus encore !",
      price: "10€",
      image: "/images/apero.jpg", // Chemin de l'image
    },
    {
      date: "Samedi 30 Mars 2025",
      time: "20h00",
      title: "Soirée à Thème 🎭",
      description: "Soirée déguisée avec DJ, animations et buffet 🍛 inclus !",
      price: "15€",
      image: "/images/soiree.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-[#0CFF21] text-center mb-8">📅 Événements à venir</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:scale-105 transition-transform"
          >
            <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <p className="text-sm text-gray-400">{event.date} - {event.time}</p>
              <h2 className="text-2xl font-bold text-[#0CFF21] mt-2">{event.title}</h2>
              <p className="mt-4 text-gray-300">{event.description}</p>
              <div className="mt-4 text-lg font-semibold bg-[#0CFF21] text-black px-4 py-2 rounded-lg inline-block">
                💰 {event.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

  