import { useEffect, useState } from "react";

export default function UpcomingDeadlines({ projects: projectsProp }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (projectsProp) {
      setProjects(projectsProp);
    } else {
      const storedProjects = JSON.parse(
        localStorage.getItem("projects") || "[]"
      );
      setProjects(storedProjects);
    }
  }, [projectsProp]);

  // Filter projects with deadlines and sort by date ascending (soonest deadline first)
  const sortedUpcoming = projects
    .filter((p) => p.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h2 className="text-xl font-bold dark:text-white">
        Upcoming Deadlines
      </h2>

      <div className="mt-6 space-y-4">
        {sortedUpcoming.length > 0 ? (
          sortedUpcoming.map((project, index) => {
            const remain = Math.ceil(
              (new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={project._id || project.id || index}
                className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 last:border-none last:pb-0"
              >
                <div>
                  <h3 className="font-semibold text-sm dark:text-white">
                    {project.title || project.name || "Untitled Project"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {remain >= 0
                      ? `Due in ${remain} days`
                      : `Overdue by ${Math.abs(remain)} days`}
                  </p>
                </div>

                <span className="text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1 text-slate-600 dark:text-slate-300">
                  {new Date(project.deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No upcoming deadlines.
          </p>
        )}
      </div>
    </div>
  );
}