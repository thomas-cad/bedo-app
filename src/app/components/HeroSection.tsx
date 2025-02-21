import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
      <Image
        src="/image/Team-bed.jpg" // ✅ Toujours depuis public/
        alt="Team BDE"
        layout="fill"
        objectFit="cover"
        className="opacity-70"
      />
      <h1 className="relative text-8xl font-bold">BED Marley</h1>
    </div>
  );
}

  