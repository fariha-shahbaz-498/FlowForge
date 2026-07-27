import { useState } from "react";
import Layout from "../layout/Layout";
// Step 2 — Added Recharts chart library elements
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Step 1 — New layout and export mechanism utility references
import { exportPDF } from "../utils/exportPDF";
import { exportExcel } from "../utils/exportExcel";
import html2canvas from "html2canvas";

const reportData = [
  {
    id: 1,
    title: "Project Performance",
    date: "18 Jul 2026",
    status: "Completed",
    progress: 100,
  },
  {
    id: 2,
    title: "Revenue Report",
    date: "15 Jul 2026",
    status: "Processing",
    progress: 70,
  },
  {
    id: 3,
    title: "Team Productivity",
    date: "12 Jul 2026",
    status: "Completed",
    progress: 100,
  },
  {
    id: 4,
    title: "Task Analytics",
    date: "10 Jul 2026",
    status: "Pending",
    progress: 35,
  },
];

// Step 3 — Added mock analytical datasets and asset color markers
const monthlyData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 17000 },
  { month: "Mar", revenue: 21000 },
  { month: "Apr", revenue: 18000 },
  { month: "May", revenue: 26000 },
  { month: "Jun", revenue: 30000 },
];

const taskData = [
  { name: "Completed", value: 148 },
  { name: "Pending", value: 38 },
  { name: "Review", value: 22 },
];

const COLORS = ["#10b981", "#f59e0b", "#3b82f6"];

function Reports() {
  const [search, setSearch] = useState("");

  // Step 5 — Native Document Element Screenshot Canvas Exporter
  async function downloadChart() {
    const chart = document.getElementById("chart");
    if (!chart) return;

    const canvas = await html2canvas(chart);
    const link = document.createElement("a");
    link.download = "report-chart.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header Block */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Reports
            </h1>
            <p className="text-slate-500 dark:text-slate-300">
              Analytics and business reports.
            </p>
          </div>

          {/* Step 4 — Multi-Format Exporter Dropdown Action Group */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => exportPDF(reportData)}
              className="rounded-xl bg-red-500 px-5 py-3 text-white font-medium hover:bg-red-600 transition"
            >
              PDF
            </button>

            <button
              onClick={() => exportExcel(reportData)}
              className="rounded-xl bg-green-600 px-5 py-3 text-white font-medium hover:bg-green-700 transition"
            >
              Excel
            </button>

            <button
              onClick={() => window.print()}
              className="rounded-xl bg-blue-500 px-5 py-3 text-white font-medium hover:bg-blue-600 transition"
            >
              Print
            </button>

            <button
              onClick={downloadChart}
              className="rounded-xl bg-purple-500 px-5 py-3 text-white font-medium hover:bg-purple-600 transition"
            >
              PNG
            </button>
          </div>
        </div>

        {/* Analytics Numeric Cards */}
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow">
            <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">Total Reports</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-800">24</h2>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow">
            <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              18
            </h2>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow">
            <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              4
            </h2>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow">
            <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">Revenue</p>
            <h2 className="mt-2 text-3xl font-bold text-emerald-600">
              $48K
            </h2>
          </div>
        </div>

        {/* Step 6 — Wrapped the charts group inside the #chart tracking selector */}
        <div id="chart" className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow">
            <h2 className="mb-6 text-xl font-bold text-slate-800">
              Monthly Revenue
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fill: '#64748b' }} stroke="#e2e8f0" />
                <YAxis tick={{ fill: '#64748b' }} stroke="#e2e8f0" />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar
                  dataKey="revenue"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow">
            <h2 className="mb-6 text-xl font-bold text-slate-800">
              Task Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskData}
                  dataKey="value"
                  outerRadius={110}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {taskData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="rounded-xl bg-white dark:bg-slate-900 transition-colors duration-300 p-4 shadow">
          <input
            placeholder="Search Reports..."
            className="w-full outline-none text-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Spreadsheet Data Grid */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 transition-colors duration-300 shadow overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b bg-slate-50/50">
                <th className="p-5 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Report
                </th>
                <th className="text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Date
                </th>
                <th className="text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Status
                </th>
                <th className="text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Progress
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {reportData
                .filter(r =>
                  r.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map(report => (
                  <tr
                    key={report.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="p-5 font-semibold text-slate-800">
                      {report.title}
                    </td>

                    <td className="text-slate-500 dark:text-slate-300 text-sm">
                      {report.date}
                    </td>

                    <td>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          report.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : report.status === "Processing"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td className="w-72 pr-5">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                            style={{
                              width: `${report.progress}%`
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-300 min-w-[32px]">
                          {report.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
}

export default Reports;