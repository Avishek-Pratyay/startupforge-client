import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Register = () => {
  const { registerUser, updateUserProfile } =
    useAuth();

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
      const result = await registerUser(
        email,
        password
      );

      await updateUserProfile(name, photo);

      await api.post("/users", {
        name,
        image: photo,
        email,
        role,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-xl">

      <h2 className="text-3xl font-bold mb-6">
        Register
      </h2>

      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >

        <input
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
          required
        />

        <input
          name="photo"
          placeholder="Photo URL"
          className="input input-bordered w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        <select
          name="role"
          className="select select-bordered w-full"
        >
          <option value="founder">
            Founder
          </option>

          <option value="collaborator">
            Collaborator
          </option>
        </select>

        <button className="btn btn-primary w-full">
          Register
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

export default Register;