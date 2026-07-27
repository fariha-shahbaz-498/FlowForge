import { useEffect, useState } from "react";

export default function RecentTasks({ tasks: tasksProp }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasksProp) {
      setTasks(tasksProp);
    } else {
      const storedTasks = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      );
      setTasks(storedTasks);
    }
  }, [tasksProp]);

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h2 className="text-xl font-bold dark:text-white">Recent Tasks</h2>

      <div className="mt-6 space-y-4">
        {recentTasks.length > 0 ? (
          recentTasks.map((task, index) => (
            <div
              key={task._id || task.id || index}
              className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 last:border-none last:pb-0"
            >
              <div>
                <h3 className="font-semibold dark:text-white">
                  {task.title || task.name || "Untitled Task"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {task.status || "To Do"}
                </p>
              </div>

              {task.priority && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400"
                      : "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                  }`}
                >
                  {task.priority}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No tasks created yet.
          </p>
        )}
      </div>
    </div>
  );
}