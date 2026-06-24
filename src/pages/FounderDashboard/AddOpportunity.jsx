import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const AddOpportunity = () => {
  const { dbUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  role_title: "",
  required_skills: "",
  work_type: "",
  industry: "",
  deadline: "",

  startup_name: "",
  startup_id: "",
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
      toast.error("Please login first");
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

  // IMPORTANT
  founderEmail: dbUser.email,
  founderName: dbUser.name,

  startup_id: formData.startup_id,
  startup_name: formData.startup_name,
};

      console.log("Sending opportunity:", payload);

      await api.post("/opportunities", payload);

      toast.success("Opportunity created successfully!");

      setFormData({
        role_title: "",
        required_skills: "",
        work_type: "",
        industry: "",
        deadline: "",
      });
    }catch (err) {
  console.log(err);

  if (err?.response?.data?.premiumRequired) {

    const result = await Swal.fire({
      icon: "warning",
      title: "Premium Required",
      text:
        "You have already posted 3 opportunities. Upgrade to Premium Founder to continue posting.",
      confirmButtonText: "Upgrade Now",
      showCancelButton: true,
      cancelButtonText: "Later",
    });

    if (result.isConfirmed) {
      window.location.href =
        "/premium-upgrade";
    }

    return;
  }

  toast.error(
    err?.response?.data?.message ||
      "Failed to create opportunity"
  );
}
finally {
      setLoading(false);
    }
  };

  

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8">

    <div className="max-w-5xl mx-auto">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl mb-8">

        <h1 className="text-4xl font-bold">
          Create New Opportunity
        </h1>

        <p className="mt-3 text-indigo-100">
          Find talented developers, designers and collaborators for your startup.
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          space-y-6
        "
      >

        {/* Founder Info */}
        <div className="bg-white/5 rounded-2xl p-5">

          <h3 className="text-white font-semibold text-lg mb-3">
            Founder Information
          </h3>

          <p className="text-indigo-200">
            Founder: {dbUser?.name}
          </p>

          <p className="text-indigo-300 text-sm">
            {dbUser?.email}
          </p>

        </div>

        {/* Startup Name */}
        <div>

          <label className="block text-white mb-2 font-medium">
            Startup Name
          </label>

          <input
            type="text"
            name="startup_name"
            value={formData.startup_name}
            onChange={handleChange}
            placeholder="StartupForge AI"
            className="w-full px-4 py-3 rounded-xl bg-white border"
            required
          />

        </div>

        {/* Startup ID */}
        <div>

          <label className="block text-white mb-2 font-medium">
            Startup ID
          </label>

          <input
            type="text"
            name="startup_id"
            value={formData.startup_id}
            onChange={handleChange}
            placeholder="Optional startup ID"
            className="w-full px-4 py-3 rounded-xl bg-white border"
          />

        </div>

        {/* Role */}
        <div>

          <label className="block text-white mb-2 font-medium">
            Position Title
          </label>

          <input
            name="role_title"
            value={formData.role_title}
            onChange={handleChange}
            placeholder="Frontend Developer"
            className="w-full px-4 py-3 rounded-xl bg-white border"
            required
          />

        </div>

        {/* Skills */}
        <div>

          <label className="block text-white mb-2 font-medium">
            Required Skills
          </label>

          <input
            name="required_skills"
            value={formData.required_skills}
            onChange={handleChange}
            placeholder="React, Tailwind, Node.js"
            className="w-full px-4 py-3 rounded-xl bg-white border"
            required
          />

          <p className="text-indigo-200 text-sm mt-2">
            Separate skills using commas.
          </p>

        </div>

        {/* Work Type */}
        <div>

          <label className="block text-white mb-2 font-medium">
            Work Type
          </label>

          <select
            name="work_type"
            value={formData.work_type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white border"
            required
          >
            <option value="">Select Work Type</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>

        </div>

        {/* Industry */}
        <div>

          <label className="block text-white mb-2 font-medium">
            Industry
          </label>

          <input
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="AI, SaaS, FinTech"
            className="w-full px-4 py-3 rounded-xl bg-white border"
            required
          />

        </div>

        {/* Deadline */}
        <div>

          <label className="block text-white mb-2 font-medium">
            Application Deadline
          </label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white border"
            required
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-4
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            via-purple-600
            to-pink-500
            text-white
            font-bold
            text-lg
            hover:scale-[1.01]
            transition
          "
        >
          {loading ? "Creating Opportunity..." : "🚀 Create Opportunity"}
        </button>

      </form>

    </div>

  </div>
);
};

export default AddOpportunity;