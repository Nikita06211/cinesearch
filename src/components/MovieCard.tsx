import React from "react";

interface MovieCardProps {
  posterPath: string | null;
  title: string;
  year: string;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterPath, title, year, onClick }) => (
  <div
    className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden bg-white/70 backdrop-blur-sm hover:bg-white/90 rounded-lg"
    onClick={onClick}
  >
    <div className="aspect-[3/4] overflow-hidden">
      <img
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : "/placeholder.svg"
        }
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-sm mb-2 line-clamp-2 dark:text-white text-gray-900">{title}</h3>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 dark:text-gray-400">{year}</span>
        <span className="text-xs border border-purple-300 dark:border-purple-400 text-purple-600 dark:text-purple-300 rounded px-2 py-0.5">
          Movie
        </span>
      </div>
    </div>
  </div>
);

export default MovieCard;