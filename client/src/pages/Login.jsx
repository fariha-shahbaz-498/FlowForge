import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const response = await login(email, password);

    if (response.success) {
      navigate("/dashboard");
    } else {
      alert(response.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="w-[420px] rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">
        <h1 className="text-3xl font-bold dark:text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Login to FlowForge
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" />

            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border p-3 pl-12 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" />

            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border p-3 pl-12 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-emerald-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;