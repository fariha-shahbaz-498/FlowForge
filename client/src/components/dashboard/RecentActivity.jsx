import { useEffect, useState } from "react";

export default function RecentActivity({ activities: activitiesProp }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (activitiesProp) {
      setActivities(activitiesProp);
    } else {
      // Check for stored activities or generate activity items from stored projects
      const storedActivities = JSON.parse(
        localStorage.getItem("activities") || "[]"
      );

      if (storedActivities.length > 0) {
        setActivities(storedActivities);
      } else {
        const storedProjects = JSON.parse(
          localStorage.getItem("projects") || "[]"
        );
        // Fallback fallback: Map recent projects to "Created Project" actions
        const projectActivities = storedProjects.slice(0, 5).map((project) => ({
          id: project._id || project.id,
          action: "Created Project",
          target: project.title || project.name || "Untitled Project",
          time: project.createdAt || "Recently",
        }));
        setActivities(projectActivities);
      }
    }
  }, [activitiesProp]);

  const recentList = activities.slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h2 className="text-xl font-bold dark:text-white">Recent Activity</h2>

      <div className="mt-6 space-y-4">
        {recentList.length > 0 ? (
          recentList.map((item, index) => (
            <div
              key={item.id || index}
              className="border-b border-slate-100 dark:border-slate-800 pb-3 last:border-none last:pb-0"
            >
              <p className="font-semibold text-sm dark:text-white">
                {item.action || item.type || "Action Performed"}
              </p>

              <div className="flex items-center justify-between mt-0.5">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {item.target || item.title || item.details || "—"}
                </p>
                {item.time && (
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {item.time}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No recent activity recorded.
          </p>
        )}
      </div>
    </div>
  );
}