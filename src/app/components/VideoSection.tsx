export default function VideoSection() {
    return (
      <div className="w-full flex justify-center">
        <video controls className="w-3/4 rounded-lg shadow-lg">
          <source src="/videos/video-live.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
    );
  }
  