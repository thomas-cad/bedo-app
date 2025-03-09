import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-50"
        style={{ backgroundImage: "url('/Team-bed.jpg')" }}
      />

      {/* Contenu principal */}
      <div className="relative w-full max-w-lg p-8 text-center bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-800">Nos projets arrivent bientôt !</h1>
        <p className="text-gray-600 mt-3">
          Les projets de chaque pôle seront bientôt disponibles. Restez à l’écoute !
        </p>
        <div className="flex justify-center mt-5">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      </div>
    </div>
  );
}

