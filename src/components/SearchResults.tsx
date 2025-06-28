import { useRouter } from "next/navigation";
import MovieCard from "@/components/MovieCard";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
}

interface SearchResultsProps {
  results: Movie[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const router = useRouter();

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500 dark:text-gray-200">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {results.map((movie) => (
        <MovieCard
          key={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          year={movie.release_date ? new Date(movie.release_date).getFullYear().toString() : "N/A"}
          onClick={() => router.push(`/movie/${movie.id}`)}
        />
      ))}
    </div>
  );
};

export default SearchResults;