import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="text-center py-20 bg-transparent">
      <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Search className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Discover Amazing Movies
      </h2>
      <p className="text-lg max-w-xl mx-auto mb-6 text-gray-500 dark:text-gray-500">
        Search through thousands of movies and explore detailed information about
        your favorites.
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <a
          href="#search"
          className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          Start Searching
        </a>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-lg font-semibold border border-purple-300 text-purple-600 bg-white/70 dark:bg-gray-800/50 dark:text-purple-300 dark:border-purple-400 shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}