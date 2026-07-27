import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Plus,
  FolderKanban,
  Users,
  CalendarDays,
} from "lucide-react";

function Hero({
  projectCount = 0,
  activeCount = 0,
  completedCount = 0,
  overdueCount = 0,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 transition-colors duration-300 p-8 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Content */}
        <div className="flex-1">
          <p className="text-sm font-medium text-emerald-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-800 dark:text-white">
            Welcome Back {user?.firstName || user?.name || "User"} 👋
          </h1>

          <p className="mt-4 max-w-xl text-lg text-slate-500 dark:text-slate-300">
            Track your projects, monitor progress, and stay organized in one workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* New Task */}
            <button
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 hover:-translate-y-1"
            >
              <Plus size={20}/>
              New Task
            </button>

            {/* Projects */}
            <button
              onClick={() => navigate("/projects")}
              className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 hover:-translate-y-1"
            >
              <FolderKanban size={20}/>
              Projects
            </button>

            {/* Team */}
            <button
              onClick={() => navigate("/team")}
              className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 hover:-translate-y-1"
            >
              <Users size={20}/>
              Team
            </button>

            {/* Calendar */}
            <button
              onClick={() => navigate("/calendar")}
              className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 hover:-translate-y-1"
            >
              <CalendarDays size={20}/>
              Calendar
            </button>
          </div>
        </div>

        {/* Right Content - Stats Grid */}
        <div className="w-full lg:w-auto rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800">
          <div className="mt-0 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300/70 p-4 backdrop-blur border border-white dark:border-slate-800 shadow-sm min-w-[140px]">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Projects</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                {projectCount}
              </h2>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300/70 p-4 backdrop-blur border border-white dark:border-slate-800 shadow-sm min-w-[140px]">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Active</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                {activeCount}
              </h2>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300/70 p-4 backdrop-blur border border-white dark:border-slate-800 shadow-sm min-w-[140px]">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Completed</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                {completedCount}
              </h2>
            </div>

            <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300/70 p-4 backdrop-blur border border-white dark:border-slate-800 shadow-sm min-w-[140px]">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Overdue</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                {overdueCount}
              </h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;