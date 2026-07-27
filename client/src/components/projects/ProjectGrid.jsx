import {
  Star,
  CalendarDays,
  Users,
  Pencil,
  Trash2,
  Eye,
  Copy,
  Pin,
} from "lucide-react";

function ProjectGrid({
  projects,
  deleteProject,
  editProject,
  toggleFavorite,
  duplicateProject,
  viewDetails,
  togglePin,
  viewMode,
}) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          : "space-y-5"
      }
    >
      {projects.map((project) => {
        // Calculate remaining days for deadline
        const remain = project.deadline
          ? Math.ceil(
              (new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24)
            )
          : null;

        // Format owner name gracefully
        const ownerName =
          project.owner?.firstName ||
          (typeof project.owner === "string" ? project.owner : "Kashaf");

        return (
          <div
            key={project._id}
            className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow transition hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold dark:text-white">
                    {project.title || project.name}
                  </h2>

                  {/* Priority Badge */}
                  <div className="mt-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        project.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : project.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {project.priority || "Medium"} Priority
                    </span>
                  </div>

                  {/* Deadline Remaining */}
                  {remain !== null && (
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                      {remain >= 0
                        ? `Due in ${remain} days`
                        : `Overdue by ${Math.abs(remain)} days`}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                    {project.description || "No description added"}
                  </p>

                  {/* Technology Tags Block */}
                  {project.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => togglePin(project._id)}>
                    <Pin
                      size={20}
                      className={
                        project.pinned
                          ? "text-emerald-500 fill-emerald-500"
                          : "text-slate-400 hover:text-emerald-500"
                      }
                    />
                  </button>

                  <button onClick={() => toggleFavorite(project._id)}>
                    <Star
                      size={22}
                      className={
                        project.favorite
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-400 hover:text-yellow-400"
                      }
                    />
                  </button>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Status
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    {project.status || "Planning"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Budget
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    ${(project.budget || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Deadline
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Owner
                  </p>
                  <p className="font-semibold text-sm dark:text-white">
                    {ownerName}
                  </p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mt-5">
                <div className="flex justify-between text-xs font-semibold dark:text-slate-300">
                  <span>Progress</span>
                  <span>{project.progress || 0}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${project.progress || 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 grid grid-cols-4 gap-2 border-t pt-4 border-slate-100 dark:border-slate-800">
              <button
                onClick={() => viewDetails(project)}
                className="flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white p-3 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="View Details"
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() => editProject(project)}
                className="flex items-center justify-center rounded-xl bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 transition"
                title="Edit Project"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => duplicateProject(project)}
                className="flex items-center justify-center rounded-xl bg-yellow-100 p-3 text-yellow-600 hover:bg-yellow-200 transition"
                title="Duplicate Project"
              >
                <Copy size={18} />
              </button>

              <button
                onClick={() => deleteProject(project._id)}
                className="flex items-center justify-center rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-200 transition"
                title="Delete Project"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectGrid;