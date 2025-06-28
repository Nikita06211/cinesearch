"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Star, Calendar, Clock, User, Users, Film } from "lucide-react";

interface MovieDetails {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
  credits: {
    cast: { id: number; name: string; character: string }[];
    crew: { id: number; name: string; job: string }[];
  };
}

const fetchMovieDetails = async (movieId: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`rating-${id}`);
      return saved ? Number(saved) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovieDetails(id)
      .then((data) => {
        setMovie(data);
        setError(null);
      })
      .catch(() => setError("Movie not found or failed to load"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRate = (star: number) => {
    setRating(star);
    localStorage.setItem(`rating-${id}`, String(star));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.push("/")}
            className="mb-6 flex items-center px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </button>
          <div className="border-0 shadow-lg bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-6 text-center rounded">
            <p className="text-red-600 dark:text-red-300">
              Movie not found or failed to load
            </p>
          </div>
        </div>
      </div>
    );
  }

  const director = movie.credits.crew.find((person) => person.job === "Director");
  const mainCast = movie.credits.cast.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </button>

        <div className="border-0 shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={movie.title}
                  className="w-80 h-[480px] object-cover rounded-xl shadow-2xl"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </span>
                  </div>

                  {movie.runtime && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {movie.runtime} min
                      </span>
                    </div>
                  )}

                  {movie.vote_average && (
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {movie.vote_average.toFixed(1)}/10 TMDB
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Film className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      Movie
                    </span>
                  </div>
                </div>

                {movie.overview && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      Plot Summary
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {movie.overview}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {director && (
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Director:
                        </span>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          {director.name}
                        </span>
                      </div>
                    </div>
                  )}

                  {mainCast.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Cast:
                        </span>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">
                          {mainCast.map((actor) => actor.name).join(", ")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}