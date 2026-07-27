import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, updateUser } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || user?.avatar || "");
  
  const [message, setMessage] = useState({ type: "", text: "" });

  function uploadImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSave(e) {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!firstName.trim() || !email.trim()) {
      setMessage({ type: "error", text: "First name and email are required fields." });
      return;
    }

    try {
      updateUser({
        ...user,
        firstName,
        lastName,
        email,
        image,
      });

      setMessage({ type: "success", text: "Profile details updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update profile settings." });
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Information</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your account avatar, visual handles, and default contact details.
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-6">
          {message.text && (
            <div
              className={`rounded-2xl p-4 text-sm font-medium ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                  : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col items-center border-b border-slate-200 dark:border-slate-700 pb-6">
            {image ? (
              <img
                src={image}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800"
                alt="Profile avatar"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-emerald-500 flex items-center justify-center text-4xl text-white font-bold uppercase shadow-inner">
                {firstName ? firstName.charAt(0) : "U"}
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="mt-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950/40 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-950/60 transition cursor-pointer"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 px-4 outline-none focus:border-emerald-500 dark:text-white transition"
                placeholder="First Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 px-4 outline-none focus:border-emerald-500 dark:text-white transition"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 px-4 outline-none focus:border-emerald-500 dark:text-white transition"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition duration-200"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;