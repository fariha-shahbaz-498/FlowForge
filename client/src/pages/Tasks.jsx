import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import DragBoard from "../components/DragBoard";

import {
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  ListTodo,
  TrendingUp
} from "lucide-react";

// Recharts Data Visualization Component Imports
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const startTasks = [
  {
    id: 1,
    title: "Design Landing Page",
    description: "Create modern UI design",
    status: "Todo",
    priority: "High",
    member: "AA"
  },
  {
    id: 2,
    title: "Develop Dashboard",
    description: "Build React dashboard",
    status: "In Progress",
    priority: "Medium",
    member: "JS"
  },
  {
    id: 3,
    title: "API Integration",
    description: "Connect backend services",
    status: "Review",
    priority: "Low",
    member: "SA"
  },
  {
    id: 4,
    title: "Testing",
    description: "Fix final bugs",
    status: "Done",
    priority: "High",
    member: "EB"
  }
];

function Tasks() {
  // LocalStorage Sync Initialization
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : startTasks;
  });
  
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  
  // Selected task snapshot hook for viewing drawer metrics
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Extended Form State Hooks
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [member, setMember] = useState("AA");
  const [due, setDue] = useState("");
  const [progress, setProgress] = useState(0);
  const [comments, setComments] = useState(0);
  
  const [editId, setEditId] = useState(null);

  // Live Metric Analytics Calculators
  const taskAnalytics = [
    { day: "Mon", tasks: 12 },
    { day: "Tue", tasks: 18 },
    { day: "Wed", tasks: 14 },
    { day: "Thu", tasks: 25 },
    { day: "Fri", tasks: 20 },
  ];

  const priorityData = [
    { name: "High", value: tasks.filter(t => t.priority === "High").length },
    { name: "Medium", value: tasks.filter(t => t.priority === "Medium").length },
    { name: "Low", value: tasks.filter(t => t.priority === "Low").length }
  ];

  const completed = tasks.filter(task => task.status === "Done").length;
  const taskProgressCount = tasks.filter(task => task.status === "In Progress").length;
  const todo = tasks.filter(task => task.status === "Todo").length;
  const completion = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function openTask(task) {
    setSelectedTask(task);
  }

  // Save Task Controller (Handles Create & Update Operations)
  function saveTask() {
    if (!title.trim()) return;

    const newTask = {
      id: editId || Date.now(),
      title,
      description,
      priority,
      member,
      due,
      progress: Number(progress),
      comments: Number(comments),
      status: editId ? tasks.find(t => t.id === editId)?.status || "Todo" : "Todo"
    };

    if (editId) {
      setTasks(tasks.map(task => task.id === editId ? { ...task, ...newTask } : task));
    } else {
      setTasks([...tasks, newTask]);
    }

    resetForm();
  }

  // Populate Form fields for Editing
  function editTask(task) {
    setTitle(task.title);
    setDescription(task.description || "");
    setPriority(task.priority || "Medium");
    setMember(task.member || "AA");
    setDue(task.due || "");
    setProgress(task.progress || 0);
    setComments(task.comments || 0);
    setEditId(task.id);
    setModal(true);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setMember("AA");
    setDue("");
    setProgress(0);
    setComments(0);
    setEditId(null);
    setModal(false);
  }

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Task Board</h1>
            <p className="text-slate-500 dark:text-slate-300">Track and manage your daily tasks.</p>
          </div>
          <button
            onClick={() => { resetForm(); setModal(true); }}
            className="flex gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-white font-medium hover:bg-emerald-600 transition shadow-sm"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        {/* Core Metric Widgets Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow">
            <ListTodo className="text-blue-500" />
            <h2 className="mt-4 text-3xl font-bold dark:text-white">{tasks.length}</h2>
            <p className="text-slate-500 dark:text-slate-300">Total Tasks</p>
          </div>
          
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow">
            <CheckCircle className="text-green-500" />
            <h2 className="mt-4 text-3xl font-bold dark:text-white">{completed}</h2>
            <p className="text-slate-500 dark:text-slate-300">Completed</p>
          </div>
          
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow">
            <Clock className="text-orange-500" />
            <h2 className="mt-4 text-3xl font-bold dark:text-white">{taskProgressCount}</h2>
            <p className="text-slate-500 dark:text-slate-300">In Progress</p>
          </div>
          
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow">
            <AlertCircle className="text-red-500" />
            <h2 className="mt-4 text-3xl font-bold dark:text-white">{todo}</h2>
            <p className="text-slate-500 dark:text-slate-300">Todo</p>
          </div>
          
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow">
            <TrendingUp className="text-emerald-500" />
            <h2 className="mt-4 text-3xl font-bold dark:text-white">{completion}%</h2>
            <p className="text-slate-500 dark:text-slate-300">Completion</p>
          </div>
        </div>

        {/* Visual Charts Analytics Segment */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Productivity Over Time Chart */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow">
            <h2 className="text-xl font-bold dark:text-white mb-5">Weekly Productivity</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={taskAnalytics}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tasks" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Core Priorities Volume Pie Chart */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 shadow">
            <h2 className="text-xl font-bold dark:text-white mb-5">Priority Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={priorityData} dataKey="value" nameKey="name" outerRadius={90}>
                  {priorityData.map((item, index) => (
                    <Cell 
                      key={index} 
                      fill={item.name === "High" ? "#ef4444" : item.name === "Medium" ? "#eab308" : "#22c55e"} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Critical Focus Alerts Card */}
        <div className="rounded-3xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40 p-6">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400">⚠ Attention Required</h2>
          <p className="mt-2 text-red-500 dark:text-red-300">
            {tasks.filter(t => t.status !== "Done").length} tasks still need attention.
          </p>
        </div>

        {/* Search Engine Input Control Container */}
        <div className="bg-white dark:bg-slate-900 transition-colors duration-300 p-4 rounded-xl flex gap-3 shadow">
          <Search className="text-slate-400" />
          <input
            className="outline-none w-full bg-transparent dark:text-white"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Main Application Kanban Pipeline */}
        <DragBoard
          tasks={tasks}
          setTasks={setTasks}
          search={search}
          editTask={editTask}
          deleteTask={deleteTask}
          openTask={openTask}
        />

        {/* Task Manipulation Modal Form Structure */}
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-[450px] rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl transition-all border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold dark:text-white">
                {editId ? "Edit Task" : "Create Task"}
              </h2>
              
              <div className="mt-5 space-y-4">
                <input
                  className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Task title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                
                <textarea
                  className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20 h-24 resize-none"
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                
                <div>
                  <label className="text-xs text-slate-400 block mb-1 px-1 font-medium">Priority Level</label>
                  <select
                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs text-slate-400 block mb-1 px-1 font-medium">Assigned Member</label>
                  <select
                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={member}
                    onChange={e => setMember(e.target.value)}
                  >
                    <option>AA</option>
                    <option>JS</option>
                    <option>SA</option>
                    <option>EB</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs text-slate-400 block mb-1 px-1 font-medium">Due Date</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={due}
                    onChange={e => setDue(e.target.value)}
                  />
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border dark:border-slate-800">
                  <div className="flex justify-between dark:text-white text-sm font-medium">
                    <span>Progress</span>
                    <span className="text-emerald-500">{progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={e => setProgress(Number(e.target.value))}
                    className="w-full mt-2 accent-emerald-500 cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-slate-400 block mb-1 px-1 font-medium">Initial Comments</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Comments"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={saveTask}
                  className="flex-1 rounded-xl bg-emerald-500 px-5 py-3 text-white font-medium hover:bg-emerald-600 transition shadow-sm"
                >
                  Save Task
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white font-medium px-5 py-3 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Expanded Profile Info Drawer Overlay */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="w-[500px] rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold dark:text-white">
                  {selectedTask.title}
                </h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-red-500 font-bold hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
              
              <p className="mt-4 text-slate-500 dark:text-slate-300">
                {selectedTask.description}
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-4 dark:text-white">
                  Status
                  <h3 className="font-bold">{selectedTask.status}</h3>
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-4 dark:text-white">
                  Priority
                  <h3 className="font-bold">{selectedTask.priority}</h3>
                </div>
              </div>
              
              <h3 className="mt-8 font-bold dark:text-white">Activity Timeline</h3>
              <div className="mt-4 space-y-3 dark:text-white">
                <div>
                  🟢 Task created
                  <p className="text-sm text-slate-500">Today</p>
                </div>
                <div>
                  🔄 Status changed
                  <p className="text-sm text-slate-500">Moved to {selectedTask.status}</p>
                </div>
                <div>🟣 Assigned to {selectedTask.member}</div>
              </div>
              
              <h3 className="mt-8 font-bold dark:text-white">Comments</h3>
              <div className="mt-3 rounded-xl bg-slate-100 dark:bg-slate-800 p-4 dark:text-white">
                💬 {selectedTask.comments || 0} comments
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default Tasks;