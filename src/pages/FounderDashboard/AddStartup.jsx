import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const AddStartup = () => {
  const { dbUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/startups", {
        ...formData,
        founderEmail: dbUser.email,
      });

      alert("Startup created successfully!");
      setFormData({
        name: "",
        industry: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Add Startup
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Startup Name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Create Startup
        </button>
      </form>
    </div>
  );
};

export default AddStartup;