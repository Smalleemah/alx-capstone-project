import { Link } from "react-router-dom";
import { Search, ChefHat } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-brand text-white p-2 rounded-lg">
              <ChefHat className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-surface-dark tracking-tight">
              fineRecipe<span className="text-brand">Finder</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link
              to="/"
              className="text-gray-600 hover:text-brand transition-colors"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="text-gray-600 hover:text-brand transition-colors"
            >
              Explore
            </Link>
          </div>

          {/* Search Shortcut / Mobile Menu */}
          <div className="flex items-center">
            <Link
              to="/search"
              className="flex items-center gap-2 bg-surface-dark hover:bg-gray-800 text-white px-5 py-2.5 rounded-full transition-all shadow-md"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-semibold">
                Search Recipes
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
