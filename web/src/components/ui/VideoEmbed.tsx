import { useState } from "react";

interface VideoEmbedProps {
  videoId: string;
  previewImage: string;
  title?: string;
}

export function VideoEmbed({ videoId, previewImage, title }: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-md mt-6">
      {!isPlaying ? (
        <div
          className="w-full h-full cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={previewImage}
            alt={title || "Video preview"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black text-3xl font-bold">▶</span>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title || "YouTube video"}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
}
