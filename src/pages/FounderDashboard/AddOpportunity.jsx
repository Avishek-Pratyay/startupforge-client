import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const AddOpportunity = () => {
  const { dbUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role_title: "",
    required_skills: "",
    work_type: "",
    industry: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dbUser?.email) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        role_title: formData.role_title,
        required_skills: formData.required_skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),

        work_type: formData.work_type,
        industry: formData.industry,
        deadline: formData.deadline,

        // IMPORTANT FIX
        startup_id: "manual",
        founderEmail: dbUser.email,
      };

      console.log("Sending opportunity:", payload);

      await api.post("/opportunities", payload);

      alert("Opportunity created successfully!");

      setFormData({
        role_title: "",
        required_skills: "",
        work_type: "",
        industry: "",
        deadline: "",
      });
    } catch (err) {
      console.log("CREATE OPPORTUNITY ERROR:", err);

      alert(
        err?.response?.data?.message ||
          "Failed to create opportunity"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Create Opportunity
        </h1>
        <p className="text-gray-500 mt-1">
          Find talented collaborators for your startup
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm space-y-5"
      >

        <input
          name="role_title"
          placeholder="Role Title"
          value={formData.role_title}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <input
          name="required_skills"
          placeholder="React, Node.js"
          value={formData.required_skills}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
          required
        >
          <option value="">Work Type</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <input
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Opportunity"}
        </button>
      </form>
    </div>
  );
};

export default AddOpportunity;