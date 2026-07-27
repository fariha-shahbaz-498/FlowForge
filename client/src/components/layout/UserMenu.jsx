import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  User,
  Settings,
  Moon,
  LogOut,
  ChevronDown,
} from "lucide-react";

function UserMenu() {
  return (
    <Menu as="div" className="relative">

      <MenuButton className="flex items-center gap-3 rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 px-3 py-2 shadow transition hover:bg-slate-50">

        <img
          src="https://ui-avatars.com/api/?name=FlowForge&background=10b981&color=fff"
          alt="avatar"
          className="h-10 w-10 rounded-full"
        />

        <div className="hidden text-left md:block">

          <h3 className="text-sm font-semibold">
            John Doe
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-300">
            Administrator
          </p>

        </div>

        <ChevronDown size={18} />

      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="mt-3 w-60 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300 p-2 shadow-xl outline-none"
      >

        <MenuItem>
          <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-slate-100 dark:bg-slate-800">
            <User size={18} />
            My Profile
          </button>
        </MenuItem>

        <MenuItem>
          <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-slate-100 dark:bg-slate-800">
            <Settings size={18} />
            Settings
          </button>
        </MenuItem>

        <MenuItem>
          <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-slate-100 dark:bg-slate-800">
            <Moon size={18} />
            Dark Mode
          </button>
        </MenuItem>

        <hr className="my-2" />

        <MenuItem>
          <button className="flex w-full items-center gap-3 rounded-xl p-3 text-red-500 hover:bg-red-50">
            <LogOut size={18} />
            Logout
          </button>
        </MenuItem>

      </MenuItems>

    </Menu>
  );
}

export default UserMenu;