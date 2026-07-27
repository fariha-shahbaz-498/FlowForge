import { FolderKanban, CheckSquare, Clock, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

function Card({ icon, title, value }) {
  return (
    <div className="rounded-3xl border bg-white dark:bg-slate-900 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-slate-500 dark:text-slate-400">{title}</p>
          <h2 className="mt-2 text-3xl font-bold dark:text-white">{value}</h2>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
}

export default function WorkspaceStats({ projects: projectsProp }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (projectsProp) {
      setProjects(projectsProp);
    } else {
      const p = JSON.parse(localStorage.getItem("projects") || "[]");
      setProjects(p);
    }
  }, [projectsProp]);

  // Calculated Metrics
  const totalProjects = projects.length;
  
  const activeProjects = projects.filter(
    (p) => p.status === "In Progress"
  ).length;

  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const needAttentionProjects = projects.filter(
    (p) => p.deadline && new Date(p.deadline) < new Date()
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Projects"
        value={totalProjects}
        icon={<FolderKanban className="text-emerald-500" size={28} />}
      />

      <Card
        title="Active"
        value={activeProjects}
        icon={<Clock className="text-blue-500" size={28} />}
      />

      <Card
        title="Completed"
        value={completedProjects}
        icon={<CheckSquare className="text-green-500" size={28} />}
      />

      <Card
        title="Need Attention"
        value={needAttentionProjects}
        icon={<AlertCircle className="text-red-500" size={28} />}
      />
    </div>
  );
}