import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Register = () => {
  const {
  registerUser,
  updateUserProfile,
  logoutUser,
} = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

const handleRegister = async (e) => {
  e.preventDefault();

  setError("");

  const form = e.target;

  const name = form.name.value;
  const photo = form.photo.value;
  const email = form.email.value;
  const password = form.password.value;
  const role = form.role.value;

  try {
    await registerUser(email, password);

    await updateUserProfile(name, photo);

    await api.post("/users", {
      name,
      image: photo,
      email,
      role,
    });

    alert("Registration successful! Please login.");

    await logoutUser();

    navigate("/login");
  } catch (err) {
    setError(err.message);
  }
};

  return (
  <div className="min-h-[80vh] flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-8">

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Create Account
        </h2>

        <p className="text-gray-500 mt-2">
          Join StartupForge and build amazing startups
        </p>
      </div>

      <form
        onSubmit={handleRegister}
        className="space-y-5"
      >

        <div>
          <label className="text-sm text-gray-600">
            Full Name
          </label>

          <input
            name="name"
            placeholder="John Doe"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Photo URL
          </label>

          <input
            name="photo"
            placeholder="https://..."
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Email
          </label>

          <input
            name="email"
            type="email"
            placeholder="example@email.com"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Account Type
          </label>

          <select
            name="role"
            className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="founder">
              Founder
            </option>

            <option value="collaborator">
              Collaborator
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
        >
          Create Account
        </button>

      </form>
     

      {error && (
        <p className="text-red-500 mt-4 text-sm">
          {error}
        </p>
      )}

    </div>

  </div>
);
};

export default Register;