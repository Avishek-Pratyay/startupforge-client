import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const AddOpportunity = () => {
  const { dbUser } = useAuth();

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

    try {
      await api.post("/opportunities", {
        role_title: formData.role_title,
        required_skills: formData.required_skills
          .split(",")
          .map((s) => s.trim()),
        work_type: formData.work_type,
        industry: formData.industry,
        deadline: formData.deadline,
        startup_id: "manual",
      });

      alert("Opportunity created successfully!");

      setFormData({
        role_title: "",
        required_skills: "",
        work_type: "",
        industry: "",
        deadline: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

 return (
  <div className="max-w-2xl mx-auto p-6">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Create Opportunity
      </h1>
      <p className="text-gray-500 mt-1">
        Find talented collaborators for your startup
      </p>
    </div>

    {/* Form Card */}
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-2xl p-6 shadow-sm space-y-5"
    >
      <div>
        <label className="text-sm text-gray-600">
          Role Title
        </label>
        <input
          name="role_title"
          placeholder="Frontend Developer"
          value={formData.role_title}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">
          Required Skills
        </label>
        <input
          name="required_skills"
          placeholder="React, Node.js, MongoDB"
          value={formData.required_skills}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">
          Work Type
        </label>

        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Work Type</option>
          <option value="Remote">Remote</option>
          <option value="Onsite">Onsite</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-600">
          Industry
        </label>
        <input
          name="industry"
          placeholder="Software, AI, Fintech"
          value={formData.industry}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">
          Application Deadline
        </label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
      >
        Create Opportunity
      </button>
    </form>
  </div>
);
};

export default AddOpportunity;