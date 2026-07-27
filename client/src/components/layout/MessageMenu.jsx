import { useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";

function MessageMenu() {
  const [messages] = useState([
    {
      id: 1,
      name: "Ali Ahmed",
      message: "Dashboard UI is completed.",
      time: "2 min ago",
    },
    {
      id: 2,
      name: "Sarah Khan",
      message: "Can you review the design?",
      time: "15 min ago",
    },
    {
      id: 3,
      name: "John Smith",
      message: "API deployment finished.",
      time: "1 hour ago",
    },
  ]);

  return (
    <Menu as="div" className="relative">

      <MenuButton className="relative rounded-xl bg-slate-100 dark:bg-slate-800 p-3 hover:bg-slate-200">

        <MessageCircle size={18} />

        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-500"></span>

      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="mt-3 w-80 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 shadow-xl outline-none"
      >

        <div className="border-b border-slate-200 dark:border-slate-700 p-3">

          <h3 className="font-bold text-lg dark:text-white">
            Messages
          </h3>

        </div>

        {messages.map((msg) => (

          <MenuItem key={msg.id}>

            <button className="w-full rounded-xl p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800">

              <h4 className="font-semibold dark:text-white">
                {msg.name}
              </h4>

              <p className="text-sm text-slate-500 dark:text-slate-300">
                {msg.message}
              </p>

              <span className="text-xs text-slate-400">
                {msg.time}
              </span>

            </button>

          </MenuItem>

        ))}

      </MenuItems>

    </Menu>
  );
}

export default MessageMenu;