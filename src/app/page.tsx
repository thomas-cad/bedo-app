"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Importation des composants avec lazy loading
const HeroSection = dynamic(() => import("@/app/components/HeroSection"), { ssr: false });
const SubscribeSection = dynamic(() => import("@/app/components/SubscribeSection"), { ssr: false });
const VideoSection = dynamic(() => import("@/app/components/VideoSection"), { ssr: false });
const TeamSection = dynamic(() => import("@/app/components/TeamSection"), { ssr: false });
const TextSection = dynamic(() => import("@/app/components/TextSection"), { ssr: false });

export default function HomePage() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showTeam, setShowTeam] = useState(false);

  // Chargement progressif des composants
  useEffect(() => {
    setTimeout(() => setShowSubscribe(true), 50);
    setTimeout(() => setShowVideo(true), 100);
    setTimeout(() => setShowTeam(true), 200);
  }, []);

  return (

    <div className="flex flex-col items-center justify-center bg-white space-y-10 p-6">
      <HeroSection />

      {showSubscribe && <SubscribeSection />}
      {showVideo && <VideoSection />}
      {showTeam && <TeamSection />} 
      {showTeam && <TextSection />} 
    </div>
  );
}
