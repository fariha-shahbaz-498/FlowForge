import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Hero from "../components/dashboard/Hero";
import WorkspaceStats from "../components/dashboard/WorkspaceStats";
import RecentProjects from "../components/dashboard/RecentProjects";

import { getProjects } from "../services/projectService";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { token } = useAuth();

  const [projects, setProjects] = useState([]);

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

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const active = projects.filter(
    (p) => p.status === "In Progress"
  ).length;

  const overdue = projects.filter((p) => {
    if (!p.deadline) return false;

    return (
      new Date(p.deadline) < new Date() &&
      p.status !== "Completed"
    );
  }).length;

  return (
    <Layout>
      <div className="space-y-8">

        <Hero
          projectCount={projects.length}
          taskCount={active}
          teamCount={completed}
          meetingCount={overdue}
        />

        <WorkspaceStats
          projects={projects}
        />

        <RecentProjects
          projects={projects}
        />

      </div>
    </Layout>
  );
}

export default Dashboard;