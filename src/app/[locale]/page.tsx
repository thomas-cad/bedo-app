// "use client";

// // import { useState, useEffect } from "react";
// import { useEffect } from "react";

// // import dynamic from "next/dynamic";

// // Importation des composants avec lazy loading
// // const HeroSection = dynamic(() => import("@/app/components/HeroSection"), { ssr: false });
// // const SubscribeSection = dynamic(() => import("@/app/components/SubscribeSection"), { ssr: false });
// // const VideoSection = dynamic(() => import("@/app/components/VideoSection"), { ssr: false });
// // const TeamSection = dynamic(() => import("@/app/components/TeamSection"), { ssr: false });
// // const TextSection = dynamic(() => import("@/app/components/TextSection"), { ssr: false });

// export default function HomePage() {
//   // const [showSubscribe, setShowSubscribe] = useState(false);
//   // const [showVideo, setShowVideo] = useState(false);
//   // const [showTeam, setShowTeam] = useState(false);

//   // Chargement progressif des composants
//   useEffect(() => {
//     // setTimeout(() => setShowSubscribe(true), 50);
//     // setTimeout(() => setShowVideo(true), 100);
//     // setTimeout(() => setShowTeam(true), 200);
//   }, []);

//   return (

//     <div className="flex flex-col items-center justify-center bg-whote space-y-10">
//       {/* <HeroSection /> */}

//       {/* {showSubscribe && <SubscribeSection />} */}
//       {/* {showVideo && <VideoSection />} */}
//       {/* {showTeam && <TeamSection />}   */}
//       {/* {showTeam && <TextSection />}  */}

//     </div>
//   );
// }

// /* "use client";

// import { useRouter } from 'next/navigation';  // Importing the useRouter hook
// import { useEffect } from 'react';

// const ShopRedirect = () => {
//   const router = useRouter();  // Initialize the router

//   useEffect(() => {
//     // Redirect to /shop when the page loads
//     router.replace('/shop'); // This redirects to the /shop route instantly
//   }, [router]);  // Added router as a dependency

//   return null;  // Render nothing, as we're redirecting
// };

// export default ShopRedirect; */

import { getDictionary } from "@/app/lib/dictionaries";

type Params = Promise<{ locale: string }>;

export default async function HomePage({ params }: { params : Params } ) {
  const locale = (await params).locale;
  const t = await getDictionary(locale);

  return (
    <div className="mt-16">
      <p>{t.home.title}</p>
      <p>{t.home.desc}</p>
    </div>
  );
}