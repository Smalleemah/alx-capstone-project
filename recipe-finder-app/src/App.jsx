import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./Pages/LandingPage";
import SearchResults from "./Pages/SearchResults";
import RecipeDetails from "./Pages/RecipeDetails";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* 2. Make sure this is spelled exactly Navbar with a capital N */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
