import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-[#0CFF21]">
      <Image
        src="/image/Team-bed.jpg" // ✅ Toujours depuis public/
        alt="Team BDE"
        fill
        style={{ objectFit: "cover" }}
        className=""
      />
    </div>
  );
}

  