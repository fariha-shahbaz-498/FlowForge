import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  CalendarDays,
  Settings,
  BarChart3,
  CircleHelp,
  Crown,
  LogOut,
  UserCircle,
} from "lucide-react";

import Logo from "../Logo";
import { useAuth } from "../../context/AuthContext";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    name: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    name: "Team",
    icon: Users,
    path: "/team",
  },
  {
    name: "Calendar",
    icon: CalendarDays,
    path: "/calendar",
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    name: "Profile",
    icon: UserCircle,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    name: "Help",
    icon: CircleHelp,
    path: "/help",
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-transform duration-300 lg:static lg:translate-x-0 lg:flex lg:flex-col ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="border-b border-slate-200 dark:border-slate-700 p-6">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-5 pb-52">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Workspace
        </p>

        <nav className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                onClick={() => setSidebarOpen(false)}
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
                end={item.path === "/"}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Storage Card */}
        <div className="mt-10 rounded-3xl bg-slate-100 dark:bg-slate-800 p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold dark:text-white">Storage</h3>
            <span className="text-sm font-bold text-emerald-600">76%</span>
          </div>

          <div className="mt-4 h-3 rounded-full bg-slate-300 dark:bg-slate-700">
            <div
              className="h-3 rounded-full bg-emerald-500"
              style={{ width: "76%" }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
            38 GB of 50 GB used
          </p>
        </div>

        {/* Upgrade */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-xl">
          <Crown className="mb-4" />
          <h3 className="text-xl font-bold">Upgrade Pro</h3>
          <p className="mt-2 text-sm text-emerald-100">
            Unlock unlimited projects, analytics and premium features.
          </p>
          <button className="mt-6 w-full rounded-xl bg-white dark:bg-slate-900 transition-colors duration-300 py-3 font-semibold text-emerald-600 transition hover:scale-105">
            Upgrade
          </button>
        </div>
      </div>

      {/* Dynamic Profile & Logout Card */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="rounded-3xl bg-slate-100 dark:bg-slate-800 p-4 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            {user?.image ? (
              <img
                src={user.image}
                className="h-12 w-12 rounded-full object-cover"
                alt="Profile"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white uppercase">
                <span>{user?.firstName?.charAt(0)?.toUpperCase() || "U"}</span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                {fullName || "User"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-300 capitalize truncate">
                {user?.role || "Member"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-white hover:bg-red-600 font-medium transition-colors duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;