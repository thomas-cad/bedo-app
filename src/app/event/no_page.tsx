
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  imageUrl: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Erreur chargement des événements :", error));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center text-[#0CFF21] mb-10">
        Événements à venir
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <Image src={event.imageUrl} alt={event.title} width={500} height={200} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-2xl font-semibold mt-4">{event.title}</h2>
            <p className="text-gray-300">{event.description}</p>
            <p className="mt-2 text-[#0CFF21]">📅 {new Date(event.date).toLocaleString()}</p>
            <p className="mt-2 text-lg font-bold">💰 {event.price}€</p>
          </div>
        ))}
      </div>
    </div>
  );
}




  