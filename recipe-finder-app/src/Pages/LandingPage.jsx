import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle the search submission and route to the dashboard with the query
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Quick search handler for the suggestion buttons below the input
  const handleQuickSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center">
      {/* Background Image with Dark Premium Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/95 via-surface-dark/80 to-surface-dark/40"></div>
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto flex flex-col items-start text-left py-20">
        <span className="text-brand font-bold tracking-widest uppercase mb-4 text-sm sm:text-base drop-shadow-md">
          The Ultimate Culinary Companion
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
          Master the art of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-orange-400">
            fine cooking.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl font-light">
          Search thousands of exquisite recipes by name, category, or cuisine.
          Bring restaurant-quality meals straight into your own dining room.
        </p>

        {/* Premium Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you craving? (e.g., Steak, Pasta)"
              className="w-full pl-14 pr-6 py-4 rounded-xl text-lg text-surface-dark bg-white/95 backdrop-blur-sm border border-transparent focus:outline-none focus:ring-4 focus:ring-brand/30 transition-all shadow-2xl"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-hover text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-brand/20 transition-all flex items-center justify-center gap-2"
          >
            Search <ChevronRight className="w-5 h-5" />
          </button>
        </form>

        {/* Quick Search Suggestions */}
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-400 font-medium">
          <span className="mr-2 text-gray-500 uppercase tracking-wider text-xs">
            Popular:
          </span>
          <button
            onClick={() => handleQuickSearch("steak")}
            className="px-3 py-1 rounded-full border border-gray-600 hover:border-brand hover:text-brand transition-colors"
          >
            Steak
          </button>
          <button
            onClick={() => handleQuickSearch("seafood")}
            className="px-3 py-1 rounded-full border border-gray-600 hover:border-brand hover:text-brand transition-colors"
          >
            Seafood
          </button>
          <button
            onClick={() => handleQuickSearch("dessert")}
            className="px-3 py-1 rounded-full border border-gray-600 hover:border-brand hover:text-brand transition-colors"
          >
            Dessert
          </button>
        </div>
      </div>
    </div>
  );
}
