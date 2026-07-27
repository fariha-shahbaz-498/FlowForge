import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="hidden w-full max-w-md items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300 px-4 py-3 shadow-sm md:flex">

      <Search
        size={18}
        className="text-slate-400"
      />

      <input
        type="text"
        placeholder="Search projects, tasks..."
        className="w-full bg-transparent outline-none placeholder:text-slate-400"
      />

    </div>
  );
}

export default SearchBar;