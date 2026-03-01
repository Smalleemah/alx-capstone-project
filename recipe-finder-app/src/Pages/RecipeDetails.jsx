import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  ChefHat,
  Globe,
  LayoutList,
  CheckCircle2,
} from "lucide-react";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        if (!response.ok) throw new Error("Failed to fetch recipe details");

        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        } else {
          throw new Error("Recipe not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium tracking-wide">
          Plating your dish...
        </p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <ChefHat className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Recipe Unavailable
        </h2>
        <p className="text-gray-500 mb-8">
          {error || "We couldn't find that dish."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-orange-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const ingredientsList = getIngredients();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-orange-600 transition-colors font-medium mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-auto rounded-3xl shadow-2xl object-cover aspect-square border-4 border-white"
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <div className="mb-8 border-b border-gray-200 pb-8">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {recipe.strMeal}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-600">
              <span className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                <LayoutList className="w-4 h-4 mr-2 text-orange-600" />
                {recipe.strCategory}
              </span>
              <span className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                <Globe className="w-4 h-4 mr-2 text-orange-600" />
                {recipe.strArea}
              </span>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              Ingredients
            </h3>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {ingredientsList.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-gray-900">
                        {item.measure}
                      </span>{" "}
                      <span className="text-gray-600 capitalize">
                        {item.ingredient}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Instructions
            </h3>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-700 leading-relaxed space-y-4 text-lg">
              {recipe.strInstructions.split("\n").map((paragraph, index) => {
                if (paragraph.trim() === "") return null;
                return <p key={index}>{paragraph}</p>;
              })}
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="mt-10">
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-colors"
              >
                Watch Video Tutorial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
