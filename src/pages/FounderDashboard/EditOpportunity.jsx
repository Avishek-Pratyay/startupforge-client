import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role_title: "",
    required_skills: "",
    work_type: "",
    industry: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const res = await api.get(`/opportunities/${id}`);

        setFormData({
          role_title: res.data.role_title || "",
          required_skills:
            res.data.required_skills?.join(", ") || "",
          work_type: res.data.work_type || "",
          industry: res.data.industry || "",
          deadline: res.data.deadline || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchOpportunity();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch(`/opportunities/${id}`, {
        ...formData,
        required_skills: formData.required_skills
          .split(",")
          .map((skill) => skill.trim()),
      });

      toast.success("Opportunity updated successfully");

      navigate("/founder-dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Edit Opportunity
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm space-y-5"
      >
        <input
          name="role_title"
          value={formData.role_title}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          name="required_skills"
          value={formData.required_skills}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
        />

        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
        >
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>
        </select>

        <input
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl"
        >
          Update Opportunity
        </button>
      </form>
    </div>
  );
};

export default EditOpportunity;