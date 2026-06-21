import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Login = () => {
  const { loginUser } = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);

      await api.post("/jwt", {
        email,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-xl">

      <h2 className="text-3xl font-bold mb-6">
        Login
      </h2>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        <button className="btn btn-primary w-full">
          Login
        </button>

      </form>

      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

    </div>
  );
};

export default Login;