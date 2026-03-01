import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Loader2, ChefHat } from "lucide-react";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [localSearch, setLocalSearch] = useState(initialQuery);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!initialQuery) return;

      setLoading(true);
      setError(null);

      try {
        // TheMealDB free search endpoint
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${initialQuery}`,
        );

        if (!response.ok) throw new Error("Failed to fetch recipes");

        const data = await response.json();
        // TheMealDB returns null if no meals are found, so we default to an empty array
        setMeals(data.meals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchParams({ q: localSearch.trim() });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header */}
      <div className="mb-12 flex flex-col items-center">
        <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">
          {initialQuery ? `Exploring: ${initialQuery}` : "Explore Recipes"}
        </h2>
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative flex shadow-lg rounded-xl overflow-hidden bg-white border border-gray-100">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search for steak, pasta, chicken..."
              className="w-full pl-6 pr-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-surface-dark hover:bg-brand text-white font-bold transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-12 h-12 text-brand animate-spin mb-4" />
          <p className="text-gray-600 font-medium tracking-wide">
            Preparing your menu...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100 max-w-2xl mx-auto shadow-sm">
          <ChefHat className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="font-bold text-xl text-red-800 mb-2">Kitchen Mishap!</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && meals.length === 0 && initialQuery && (
        <div className="text-center py-24">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-2xl text-surface-dark font-bold mb-2">
            No recipes found for "{initialQuery}".
          </p>
          <p className="text-gray-500">
            Try searching for a different ingredient or classic dish.
          </p>
        </div>
      )}

      {/* Premium Recipe Grid */}
      {!loading && !error && meals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 group"
            >
              {/* Image Container with Zoom Effect */}
              <div className="overflow-hidden relative h-56">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay Area Tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">
                    {meal.strArea}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {meal.strCategory}
                </span>
                <h3 className="text-xl font-bold text-surface-dark mb-4 line-clamp-2">
                  {meal.strMeal}
                </h3>
                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Link
                    to={`/recipe/${meal.idMeal}`}
                    className="block w-full text-center px-4 py-3 bg-surface-dark hover:bg-brand text-white font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
