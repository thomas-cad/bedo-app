import Image from 'next/image';
import { Pole } from "@/interfaces";

export default function Project({ project, locale }: { project: Pole, locale: string }) {
    return (
        <div className='pb-16'>
            <div className="relative max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md overflow-visible">
                {/* Contenu principal */}
                <div className="p-6 pb-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        {locale === 'fr' ? project.name_fr : project.name_en}
                    </h2>
                    
                    <p className="text-gray-600 mx-auto max-w-md pb-4">
                        {locale === 'fr' ? project.description_fr : project.description_en}
                    </p>
                </div>
                
                <div className="absolute -bottom-10 left-0 right-0 overflow-x-auto whitespace-nowrap py-2 z-10 hide-scrollbar">
                    <div className="inline-flex justify-center w-full space-x-4 px-4">
                        {project.membres.map((member) => (
                            <div 
                                key={member.id} 
                                className={`relative inline-flex w-24 h-24 rounded-full overflow-hidden border-4 ${
                                    member.respo ? 'border-green-500' : 'border-gray-300'
                                } shadow-md flex-shrink-0`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={member.image || "/placeholder-user.png"}
                                        alt={`${member.first_name} ${member.last_name}`}
                                        fill
                                        sizes="(max-width: 768px) 100px, 150px"
                                        className="object-cover"
                                        style={{
                                            objectPosition: 'center top'
                                        }}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                    <span className="text-white text-center text-xs font-medium p-1">
                                        {member.first_name} {member.last_name}
                                        <br/>
                                        {locale === 'fr' ? member.role_fr : member.role_en}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}