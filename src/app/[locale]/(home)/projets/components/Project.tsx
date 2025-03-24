import Image from 'next/image';
import { Pole } from "@/interfaces"

export default function Project({ project, locale }: { project:Pole, locale:string }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-center">
      <div className="relative h-48">
        {/* <Image
          src={project.image}
          alt={project.title_fr}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        /> */}
      </div>
      <div className="p-4">
        <div className="text-center"></div>
          <h2 className="text-xl font-bold">{locale === 'fr' ? project.name_fr : project.name_en}</h2>
          <p className="text-gray-700">{locale === 'fr' ? project.description_fr : project.description_en}</p>
        </div>
      </div>
  );
}