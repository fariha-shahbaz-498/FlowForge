import { useState, useEffect } from "react";
import Layout from "../layout/Layout";

// Updated initial members schema to use image property instead of avatar
const initialMembers = [
  {
    id: 1,
    name: "Ali Ahmed",
    role: "Frontend Developer",
    department: "Engineering",
    email: "ali@flowforge.com",
    status: "Online",
    image: "",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "UI/UX Designer",
    department: "Design",
    email: "sarah@flowforge.com",
    status: "Busy",
    image: "",
  },
  {
    id: 3,
    name: "John Smith",
    role: "Backend Developer",
    department: "Engineering",
    email: "john@flowforge.com",
    status: "Offline",
    image: "",
  },
];

function Team() {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("members");
    return saved ? JSON.parse(saved) : initialMembers;
  });
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(""); // Image state for base64 storage
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState("Online");

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  // Handle FileReader conversion of local file uploads to base64
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function addMember() {
    if (!name || !role) return;

    if (editId) {
      setMembers(
        members.map((member) =>
          member.id === editId
            ? {
                ...member,
                name,
                role,
                department,
                email,
                status,
                image, // Persists updated base64 or unchanged avatar string
              }
            : member
        )
      );
      setEditId(null);
    } else {
      setMembers([
        ...members,
        {
          id: Date.now(),
          name,
          role,
          department,
          email,
          status,
          image, // Stores uploaded profile image string
        },
      ]);
    }

    resetForm();
  }

  function editMember(member) {
    setName(member.name);
    setRole(member.role);
    setDepartment(member.department);
    setEmail(member.email);
    setStatus(member.status);
    setImage(member.image || "");
    setEditId(member.id);
    setShowModal(true);
  }

  function deleteMember(id) {
    setMembers(members.filter((m) => m.id !== id));
  }

  function resetForm() {
    setName("");
    setRole("");
    setDepartment("");
    setEmail("");
    setStatus("Online");
    setImage("");
    setEditId(null);
    setShowModal(false);
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Team</h1>
            <p className="text-slate-500 dark:text-slate-300">
              Manage your team members.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-emerald-500 px-6 py-3 text-white font-medium hover:bg-emerald-600 transition"
          >
            + Add Member
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-5 shadow">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              {members.length}
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm mt-1">Total Members</p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-5 shadow">
            <h2 className="text-3xl font-bold text-green-600">
              {members.filter((m) => m.status === "Online").length}
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm mt-1">Online</p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 transition-colors duration-300 p-5 shadow">
            <h2 className="text-3xl font-bold text-yellow-600">
              {members.filter((m) => m.status === "Busy").length}
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm mt-1">Busy</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="rounded-xl bg-white dark:bg-slate-900 transition-colors duration-300 p-4 shadow">
          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent text-slate-700 dark:text-white"
          />
        </div>

        {/* Members Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {members
            .filter((member) =>
              member.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((member) => (
              <div
                key={member.id}
                className="rounded-3xl bg-white dark:bg-slate-900 transition-colors duration-300 p-6 shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image render fallback validation condition block */}
                  {member.image ? (
                    <img
                      src={member.image}
                      className="h-16 w-16 rounded-full object-cover"
                      alt={member.name}
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white uppercase">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <h2 className="mt-4 text-xl font-bold text-slate-800 dark:text-white">
                    {member.name}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    {member.role}
                  </p>

                  <p className="text-sm text-slate-400 mt-0.5">
                    {member.department}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 break-all">
                    {member.email}
                  </p>

                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      member.status === "Online"
                        ? "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400"
                        : member.status === "Busy"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => editMember(member)}
                    className="flex-1 rounded-xl bg-blue-100 py-2 text-blue-600 font-medium hover:bg-blue-200 dark:bg-blue-950/40 dark:text-blue-400 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMember(member.id)}
                    className="flex-1 rounded-xl bg-red-100 py-2 text-red-600 font-medium hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Modal Window Container Layout */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
            <div className="w-[420px] rounded-3xl bg-white dark:bg-slate-900 transition-colors duration-300 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {editId ? "Edit Team Member" : "Add Team Member"}
              </h2>

              <div className="mt-5 flex flex-col items-center gap-3">
                {image ? (
                  <img
                    src={image}
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                    alt="Preview"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white uppercase">
                    {name ? name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950/40 dark:file:text-emerald-400 cursor-pointer"
                />
              </div>

              <input
                className="mt-4 w-full rounded-xl border dark:border-slate-700 bg-transparent p-3 outline-none focus:border-emerald-500 dark:text-white transition"
                placeholder="Member Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="mt-4 w-full rounded-xl border dark:border-slate-700 bg-transparent p-3 outline-none focus:border-emerald-500 dark:text-white transition"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              <input
                className="mt-4 w-full rounded-xl border dark:border-slate-700 bg-transparent p-3 outline-none focus:border-emerald-500 dark:text-white transition"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />

              <input
                type="email"
                className="mt-4 w-full rounded-xl border dark:border-slate-700 bg-transparent p-3 outline-none focus:border-emerald-500 dark:text-white transition"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-4 w-full rounded-xl border dark:border-slate-700 p-3 outline-none focus:border-emerald-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-white transition"
              >
                <option value="Online">Online</option>
                <option value="Busy">Busy</option>
                <option value="Offline">Offline</option>
              </select>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={addMember}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-white font-medium hover:bg-emerald-600 transition"
                >
                  {editId ? "Save" : "Add"}
                </button>

                <button
                  onClick={resetForm}
                  className="rounded-xl bg-slate-200 dark:bg-slate-800 px-5 py-3 font-medium text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Team;