import { Calendar, Flag } from "lucide-react";

function TaskCard({ task }) {
  return (
    <div className="mb-4 cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <h3 className="font-semibold text-slate-800">
        {task.title}
      </h3>

      <div className="mt-4 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
          ${
            task.priority === "High"
              ? "bg-red-100 text-red-600"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          <Flag size={12} className="mr-1 inline" />
          {task.priority}
        </span>

        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-300">
          <Calendar size={14} />
          {task.due}
        </span>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <img
          src={`https://ui-avatars.com/api/?name=${task.assignee}`}
          alt={task.assignee}
          className="h-9 w-9 rounded-full"
        />

        <span className="text-sm text-slate-500 dark:text-slate-300">
          {task.assignee}
        </span>

      </div>

    </div>
  );
}

export default TaskCard;