import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

import { FaGoogle, FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // EMAIL LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);

      await api.post("/jwt", { email });
            toast.success("Login successful!");


      navigate("/");
    } catch (err) {
  toast.error("Invalid email or password");
}finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      const user = result.user;

      await api.post("/users", {
        name: user.displayName || "Google User",
        email: user.email,
        image: user.photoURL,
        role: "collaborator",
      });

      await api.post("/jwt", {
        email: user.email,
      });

      navigate("/");
    } catch (err) {
      toast.Error("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-100 transition mb-5"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-white/70 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
        <p className="text-white text-center mt-4 text-sm">
  New here?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-indigo-600 cursor-pointer font-semibold hover:underline"
  >
    Create an account
  </span>
</p>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 mt-4 text-center text-sm">
            {error}
          </p>
        )}

      </div>
    </div>
  );
};

export default Login;