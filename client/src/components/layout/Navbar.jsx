import MessageMenu from "./MessageMenu";
import {
  Search,
  Moon,
  Sun,
  Menu,
  User,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import {
  Menu as HeadlessMenu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NotificationMenu from "./NotificationMenu";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  function toggleDarkMode() {
    if (dark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDark(!dark);
  }

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300 px-8 backdrop-blur-md">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden text-slate-700 dark:text-white"
        >
          <Menu size={22} />
        </button>
        <div className="relative">
          <Search
            className="absolute left-4 top-3 text-slate-400"
            size={18}
          />
          <input
            placeholder="Search projects..."
            className="w-72 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 py-3 pl-11 pr-4 outline-none focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <MessageMenu />

        <NotificationMenu />

        {/* Dynamic User Profile Dropdown Menu */}
        <HeadlessMenu as="div" className="relative">
          <MenuButton className="flex items-center gap-3 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200">
            <div 
              onClick={() => navigate("/profile")}
              className="flex cursor-pointer items-center gap-3 text-left"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  className="h-10 w-10 rounded-full object-cover"
                  alt="User avatar"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-bold uppercase">
                  {user?.firstName?.charAt(0) || "U"}
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-[120px]">
                  {fullName || "User"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {user?.role || "Member"}
                </p>
              </div>
            </div>
          </MenuButton>

          <MenuItems
            anchor="bottom end"
            className="mt-3 w-56 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300 p-2 shadow-xl outline-none"
          >
            <MenuItem>
              <button
                onClick={() => navigate("/profile")}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <User size={18} />
                Profile Settings
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => navigate("/")}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => navigate("/settings")}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Settings size={18} />
                Settings
              </button>
            </MenuItem>

            <hr className="my-2 border-slate-200 dark:border-slate-700" />

            <MenuItem>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <LogOut size={18} />
                Logout
              </button>
            </MenuItem>
          </MenuItems>
        </HeadlessMenu>
      </div>

    </header>
  );
}

export default Navbar;