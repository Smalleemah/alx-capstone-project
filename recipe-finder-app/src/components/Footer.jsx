export default function Footer() {
  return (
    <footer className="bg-surface-dark text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-tight">
            fineRecipeFinder
          </span>
        </div>

        <p className="text-sm text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} Crafted for culinary excellence.
        </p>

        <div className="flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-brand transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-brand transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
