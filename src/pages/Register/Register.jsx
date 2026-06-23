import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Register = () => {
  const { registerUser, updateUserProfile, logoutUser, googleLogin } = useAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // =========================
  // EMAIL REGISTER
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    // validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Must contain 1 uppercase letter");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Must contain 1 lowercase letter");
      setLoading(false);
      return;
    }

    try {
      await registerUser(email, password);

      await updateUserProfile(name, photo);

      await api.post("/users", {
        name,
        image: photo,
        email,
        role,
      });

      await logoutUser();

      toast.success("Registration successful! Please login.");

      navigate("/login");
    } catch (err) {
      toast.error("Registration failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE REGISTER
  // =========================
  const handleGoogleRegister = async () => {
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

      toast.success("Google registration successful!");
      navigate("/");
    } catch (err) {
      toast.error("Google signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4">

      {/* glowing background */}
      <div className="absolute w-72 h-72 bg-indigo-500 blur-3xl opacity-20 top-20 left-20"></div>
      <div className="absolute w-72 h-72 bg-pink-500 blur-3xl opacity-20 bottom-20 right-20"></div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {/* Google Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-center text-gray-300 my-4">OR</p>

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-4">

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              name="name"
              placeholder="Full Name"
              className="w-full pl-10 py-3 rounded-xl bg-white/10 text-white border border-white/20"
              required
            />
          </div>

          <div className="relative">
            <FaImage className="absolute left-3 top-3 text-gray-400" />
            <input
              name="photo"
              placeholder="Photo URL"
              className="w-full pl-10 py-3 rounded-xl bg-white/10 text-white border border-white/20"
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full pl-10 py-3 rounded-xl bg-white/10 text-white border border-white/20"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full pl-10 py-3 rounded-xl bg-white/10 text-white border border-white/20"
              required
            />
          </div>

          <select
            name="role"
            className="w-full py-3 rounded-xl bg-white/10 text-white border border-white/20"
          >
            <option value="founder" className="text-black">Founder</option>
            <option value="collaborator" className="text-black">Collaborator</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Register;