import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Breadcrumb() {
  const { pathname } = useLocation();

  const page =
    pathname === "/"
      ? "Dashboard"
      : pathname.substring(1).charAt(0).toUpperCase() +
        pathname.substring(2);

  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">

      <span>FlowForge</span>

      <ChevronRight size={16} />

      <span className="font-semibold text-slate-800">
        {page}
      </span>

    </div>
  );
}

export default Breadcrumb;