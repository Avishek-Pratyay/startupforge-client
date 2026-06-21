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
  <div className="max-w-2xl mx-auto p-6">

    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Add Startup
      </h1>
      <p className="text-gray-500 mt-1">
        Create and share your startup idea with collaborators
      </p>
    </div>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-2xl p-6 shadow-sm space-y-5"
    >

      {/* NAME */}
      <div>
        <label className="text-sm text-gray-600">Startup Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter startup name"
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* INDUSTRY */}
      <div>
        <label className="text-sm text-gray-600">Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="e.g. AI, Fintech, SaaS"
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your startup idea..."
          rows="4"
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
      >
        Create Startup
      </button>

    </form>

  </div>
);
};

export default AddStartup;