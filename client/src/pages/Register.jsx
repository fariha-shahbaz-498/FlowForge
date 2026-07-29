import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    const response = await register(
      firstName,
      lastName,
      username,
      email,
      password
    );

    if (response.success) {
      navigate("/dashboard");
    } else {
      alert(response.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="w-[430px] rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl">

        <h1 className="text-3xl font-bold dark:text-white">
          Create Account 
        </h1>

        <p className="mt-2 text-slate-500">
          Join FlowForge
        </p>

        <form
          onSubmit={submit}
          className="mt-8 space-y-4"
        >

          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" />
            <input
              required
              placeholder="First Name"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="w-full rounded-xl border p-3 pl-12"
            />
          </div>

          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" />
            <input
              required
              placeholder="Last Name"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              className="w-full rounded-xl border p-3 pl-12"
            />
          </div>

          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" />
            <input
              required
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full rounded-xl border p-3 pl-12"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" />
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full rounded-xl border p-3 pl-12"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full rounded-xl border p-3 pl-12"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-3 text-white font-semibold hover:bg-emerald-600"
          >
            Create Account
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-emerald-500 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Register;