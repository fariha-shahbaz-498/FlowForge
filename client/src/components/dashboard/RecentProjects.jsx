import { useEffect, useState } from "react";

export default function RecentProjects({ projects: projectsProp }) {
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

  // Take the first 5 projects
  const recentList = projects.slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h2 className="text-xl font-bold dark:text-white">Recent Projects</h2>

      <div className="mt-6 space-y-4">
        {recentList.length > 0 ? (
          recentList.map((project, index) => (
            <div
              key={project._id || project.id || index}
              className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 last:border-none last:pb-0"
            >
              <div>
                <h3 className="font-semibold dark:text-white">
                  {project.title || project.name || "Untitled Project"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {project.status || "Planning"}
                </p>
              </div>

              <div className="font-semibold text-emerald-500">
                {project.progress !== undefined ? project.progress : 0}%
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No recent projects found.
          </p>
        )}
      </div>
    </div>
  );
}