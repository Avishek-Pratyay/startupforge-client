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
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Add Opportunity
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="role_title"
          placeholder="Role Title"
          value={formData.role_title}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="required_skills"
          placeholder="Skills (comma separated)"
          value={formData.required_skills}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="work_type"
          placeholder="Work Type (Remote/Onsite)"
          value={formData.work_type}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full">
          Create Opportunity
        </button>
      </form>
    </div>
  );
};

export default AddOpportunity;