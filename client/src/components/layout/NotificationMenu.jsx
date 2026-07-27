import { useState, useEffect } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

function NotificationMenu() {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Ahmed completed API Integration",
            time: "2 min ago",
            read: false,
          },
          {
            id: 2,
            title: "Sarah joined Mobile App project",
            time: "10 min ago",
            read: false,
          },
          {
            id: 3,
            title: "Sprint Meeting starts at 3 PM",
            time: "30 min ago",
            read: false,
          },
          {
            id: 4,
            title: "New task assigned to you",
            time: "1 hour ago",
            read: true,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  function markRead(id) {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  }

  function deleteNotification(id) {
    setNotifications(
      notifications.filter((n) => n.id !== id)
    );
  }

  function markAllRead() {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        read: true,
      }))
    );
  }

  // Determine if there are any unread notifications to control the badge visibility
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <Menu as="div" className="relative">
      <MenuButton className="relative rounded-xl bg-white dark:bg-slate-900 transition-colors duration-300 p-3 shadow hover:bg-slate-50 transition">
        <Bell size={20} />
        {/* Swapped the red dot for the dynamic notification count badge */}
        {hasUnread && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {notifications.filter((n) => !n.read).length}
          </span>
        )}
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="mt-3 w-80 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300 p-2 shadow-xl outline-none"
      >
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-bold text-lg">Notifications</h3>
          {hasUnread && (
            <button 
              onClick={markAllRead}
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              Mark all read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-300">
            No notifications
          </div>
        ) : (
          notifications.map((item) => (
            <MenuItem key={item.id}>
              <div className={`group flex items-start gap-2 rounded-xl p-3 transition hover:bg-slate-50 ${!item.read ? "bg-blue-50/40" : ""}`}>
                <div className="flex-1 text-left">
                  <p className={`text-sm ${!item.read ? "font-semibold text-slate-900" : "font-medium text-slate-600 dark:text-slate-300"}`}>
                    {item.title}
                  </p>
                  <span className="text-xs text-slate-400">
                    {item.time}
                  </span>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!item.read && (
                    <button
                      onClick={() => markRead(item.id)}
                      title="Mark as read"
                      className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 dark:text-slate-300"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(item.id)}
                    title="Delete"
                    className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </MenuItem>
          ))
        )}
      </MenuItems>
    </Menu>
  );
}

export default NotificationMenu;