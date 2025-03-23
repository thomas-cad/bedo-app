import Image from 'next/image';

const members = [
    { name: "Thomas Revol", role: "Président", image: "/image/thomas-r.jpg" },
    { name: "Alessandro", role: "Vice-Président", image: "/image/alessandro.jpg" },
    { name: "Téophile", role: "Trésorier", image: "/image/théophile.jpg" },
    { name: "Carl", role: "Vice-Trésorier", image: "/image/carl.jpg" },
    { name: "Sylvia", role: "Sec G", image: "/image/sylvia.jpg" },
  ];
  
  export default function TeamSection() {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-bold">Notre Bureau</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {members.map((member) => (
            <div key={member.name} className="p-4 bg-gray-200 rounded-lg">
              <Image src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto" />
              <h3 className="text-xl font-semibold mt-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  