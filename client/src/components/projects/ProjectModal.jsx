import { useEffect, useState } from "react";

function ProjectModal({ project, saveProject, close }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    progress: 0,
    priority: "Medium",
    status: "Active",
    team: 1,
    favorite: false,
  });

  useEffect(() => {
    if (project) {
      setForm(project);
    }
  }, [project]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "budget" ||
        name === "progress" ||
        name === "team"
          ? Number(value)
          : value,
    }));
  }

  function submit(e) {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.deadline
    ) {
      alert("Please fill all required fields.");
      return;
    }

    saveProject(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold dark:text-white">
            {project ? "Edit Project" : "New Project"}
          </h2>

          <button
            onClick={close}
            className="rounded-xl bg-slate-200 px-4 py-2 hover:bg-slate-300 dark:bg-slate-700 dark:text-white"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={submit}
          className="grid gap-5 md:grid-cols-2"
        >

          <div className="md:col-span-2">

            <label className="mb-2 block font-medium dark:text-white">
              Project Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-medium dark:text-white">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block dark:text-white">
              Budget
            </label>

            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block dark:text-white">
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block dark:text-white">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block dark:text-white">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block dark:text-white">
              Team Members
            </label>

            <input
              type="number"
              min="1"
              max="8"
              name="team"
              value={form.team}
              onChange={handleChange}
              className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          <div>

            <label className="mb-2 block dark:text-white">
              Progress ({form.progress}%)
            </label>

            <input
              type="range"
              min="0"
              max="100"
              name="progress"
              value={form.progress}
              onChange={handleChange}
              className="w-full"
            />

          </div>

          <div className="md:col-span-2 flex justify-end gap-3">

            <button
              type="button"
              onClick={close}
              className="rounded-xl bg-slate-300 px-6 py-3 dark:bg-slate-700 dark:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
            >
              {project ? "Update Project" : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProjectModal;