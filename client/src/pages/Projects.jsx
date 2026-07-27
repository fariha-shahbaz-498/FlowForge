import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/authService";
import Layout from "../layout/Layout";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectStats from "../components/projects/ProjectStats"; 
import ProjectToolbar from "../components/projects/ProjectToolbar"; 

function Projects() {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewProject, setViewProject] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    priority: "Medium",
    tags: "",
  });

  const [search, setSearch] = useState("");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const res = await getProjects(token);

      if (res.success) {
        setProjects(res.projects);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Calculate progress automatically based on status
  function getProgressByStatus(status) {
    switch (status) {
      case "In Progress":
        return 40;
      case "Testing":
        return 80;
      case "Completed":
        return 100;
      case "Planning":
      default:
        return 0;
    }
  }

  async function addProject() {
    console.log("TOKEN =", token);

    if (!form.title.trim()) return;

    const parsedTags = form.tags
      ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    try {
      if (editId) {
        const res = await updateProject(token, editId, {
          title: form.title,
          description: form.description,
          budget: Number(form.budget) || 0,
          deadline: form.deadline,
          priority: form.priority,
          tags: parsedTags,
        });

        if (res.success) {
          loadProjects();
        }
      } else {
        const res = await createProject(token, {
          title: form.title,
          description: form.description,
          budget: Number(form.budget) || 0,
          deadline: form.deadline,
          priority: form.priority,
          status: "Planning",
          progress: getProgressByStatus("Planning"),
          tags: parsedTags,
        });
        console.log(res);

        if (res.success) {
          loadProjects();
        }
      }

      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  function editProject(project) {
    setForm({
      title: project.title || project.name || "",
      description: project.description || "",
      budget: project.budget || "",
      deadline: project.deadline ? project.deadline.split("T")[0] : "",
      priority: project.priority || "Medium",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
    });
    setEditId(project._id);
    setShowModal(true);
  }

  async function removeProject(id) {
    try {
      const res = await deleteProject(token, id);

      if (res.success) {
        loadProjects();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleFavorite(id) {
    const project = projects.find((p) => p._id === id);
    if (!project) return;

    await updateProject(token, id, {
      favorite: !project.favorite,
    });

    loadProjects();
  }

  async function togglePin(id) {
    const project = projects.find((p) => p._id === id);
    if (!project) return;

    await updateProject(token, id, {
      pinned: !project.pinned,
    });

    loadProjects();
  }

  async function duplicateProject(project) {
    await createProject(token, {
      ...project,
      title: (project.title || project.name) + " Copy",
      favorite: false,
      pinned: false,
    });

    loadProjects();
  }

  function viewDetails(project) {
    setViewProject(project);
  }

  function closeModal() {
    setForm({
      title: "",
      description: "",
      budget: "",
      deadline: "",
      priority: "Medium",
      tags: "",
    });
    setEditId(null);
    setShowModal(false);
  }

  function exportProjects() {
    const csv = projects
      .map((p) => `${p.title || p.name},${p.status},${p.progress || getProgressByStatus(p.status)},${p.budget}`)
      .join("\n");
    const blob = new Blob(["Name,Status,Progress,Budget\n" + csv], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects.csv";
    link.click();
  }

  // Process and format projects for display
  let displayProjects = projects.map((p) => {
    // Format owner display
    const ownerName = user?.firstName
      ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
      : "Kashaf";

    // Progress fallback based on status
    const calculatedProgress =
      p.progress !== undefined && p.progress !== null
        ? p.progress
        : getProgressByStatus(p.status);

    // Format remaining days / overdue logic
    let deadlineText = "No deadline";
    if (p.deadline) {
      const remain = Math.ceil(
        (new Date(p.deadline) - new Date()) / 86400000
      );
      if (remain < 0) {
        deadlineText = `Overdue by ${Math.abs(remain)} days`;
      } else if (remain === 0) {
        deadlineText = "Due today";
      } else {
        deadlineText = `Due in ${remain} days`;
      }
    }

    return {
      ...p,
      owner: ownerName,
      progress: calculatedProgress,
      deadlineText,
    };
  });

  if (filter !== "All") {
    displayProjects = displayProjects.filter((p) => p.status === filter);
  }

  if (favoriteOnly) {
    displayProjects = displayProjects.filter((p) => p.favorite);
  }

  if (pinnedOnly) {
    displayProjects = displayProjects.filter((p) => p.pinned);
  }

  if (search) {
    displayProjects = displayProjects.filter((p) =>
      (p.title || p.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "name") {
    displayProjects.sort((a, b) =>
      ((a.title || a.name) || "").localeCompare((b.title || b.name) || "")
    );
  }

  if (sort === "progress") {
    displayProjects.sort((a, b) => b.progress - a.progress);
  }

  if (sort === "budget") {
    displayProjects.sort((a, b) => b.budget - a.budget);
  }

  return (
    <Layout>
      <div className="space-y-8">
        <ProjectStats projects={projects} />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold dark:text-white">Projects</h1>
            <p className="text-slate-500 dark:text-slate-300">
              Manage your projects professionally.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportProjects}
              className="rounded-xl bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 transition"
            >
              Export CSV
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-emerald-500 px-6 py-3 text-white hover:bg-emerald-600 transition"
            >
              + New Project
            </button>
          </div>
        </div>

        <ProjectToolbar
          search={search}
          setSearch={setSearch}
          favoriteOnly={favoriteOnly}
          setFavoriteOnly={setFavoriteOnly}
          pinnedOnly={pinnedOnly}
          setPinnedOnly={setPinnedOnly}
          filter={filter}
          setFilter={setFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sort={sort}
          setSort={setSort}
        />

        <ProjectGrid
          projects={displayProjects}
          viewMode={viewMode}
          deleteProject={removeProject}
          editProject={editProject}
          toggleFavorite={toggleFavorite}
          togglePin={togglePin}
          duplicateProject={duplicateProject}
          viewDetails={viewDetails}
        />

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-[460px] rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl space-y-4">
              <h2 className="text-2xl font-bold dark:text-white">
                {editId ? "Edit Project" : "New Project"}
              </h2>

              <input
                placeholder="Project Name"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:border-emerald-500"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:border-emerald-500 resize-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Budget"
                  value={form.budget}
                  onChange={(e) =>
                    setForm({ ...form, budget: e.target.value })
                  }
                  className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:border-emerald-500"
                />

                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({ ...form, deadline: e.target.value })
                  }
                  className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:border-emerald-500"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
                    Tags (comma separated)
                  </label>
                  <input
                    placeholder="React, Node"
                    value={form.tags}
                    onChange={(e) =>
                      setForm({ ...form, tags: e.target.value })
                    }
                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={addProject}
                  className="flex-1 rounded-xl bg-emerald-500 py-3 text-white font-medium hover:bg-emerald-600 transition"
                >
                  {editId ? "Save" : "Create"}
                </button>

                <button
                  onClick={closeModal}
                  className="flex-1 rounded-xl bg-slate-200 dark:bg-slate-800 dark:text-white py-3 font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail View Modal */}
        {viewProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-[500px] rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl">
              <h2 className="text-3xl font-bold dark:text-white">
                {viewProject.title || viewProject.name}
              </h2>

              <p className="mt-3 text-slate-500 dark:text-slate-300">
                {viewProject.description || "No description provided."}
              </p>

              <div className="mt-6 space-y-3 dark:text-white">
                <p>🔥 Priority: <span className="font-semibold">{viewProject.priority || "Medium"}</span></p>
                <p>💰 Budget: <span className="font-semibold">${viewProject.budget ? viewProject.budget.toLocaleString() : 0}</span></p>
                <p>📅 Deadline: <span className="font-semibold">{viewProject.deadline ? new Date(viewProject.deadline).toLocaleDateString() : "N/A"}</span></p>
                <p>👤 Owner: <span className="font-semibold">{viewProject.owner || "Kashaf"}</span></p>
                <p>📊 Progress: <span className="font-semibold">{viewProject.progress || getProgressByStatus(viewProject.status)}%</span></p>
                <p>📌 Status: <span className="font-semibold">{viewProject.status || "Planning"}</span></p>
              </div>

              <button
                onClick={() => setViewProject(null)}
                className="mt-8 w-full rounded-xl bg-emerald-500 py-3 text-white font-medium hover:bg-emerald-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Projects;