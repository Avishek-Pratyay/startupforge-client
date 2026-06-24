import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

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
        founderName: dbUser.name,
      });

      toast.success("Startup created successfully!");
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

  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8">


<div className="max-w-4xl mx-auto">

  {/* HERO */}

  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl mb-8">

    <h1 className="text-4xl font-bold">
      Launch Your Startup
    </h1>

    <p className="mt-3 text-indigo-100">
      Create your startup profile and start attracting talented collaborators.
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
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Example: StartupForge AI"
        className="w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-indigo-500"
        required
      />

    </div>

    {/* Logo */}

    <div>

      <label className="block text-white mb-2 font-medium">
        Logo URL
      </label>

      <input
        type="text"
        name="logo"
        value={formData.logo}
        onChange={handleChange}
        placeholder="https://..."
        className="w-full px-4 py-3 rounded-xl bg-white border"
      />

    </div>

    {/* Industry */}

    <div>

      <label className="block text-white mb-2 font-medium">
        Industry
      </label>

      <input
        type="text"
        name="industry"
        value={formData.industry}
        onChange={handleChange}
        placeholder="AI, FinTech, SaaS, Healthcare"
        className="w-full px-4 py-3 rounded-xl bg-white border"
        required
      />

    </div>

    {/* Funding Stage */}

    <div>

      <label className="block text-white mb-2 font-medium">
        Funding Stage
      </label>

      <select
        name="funding_stage"
        value={formData.funding_stage}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl bg-white border"
      >
        <option value="">
          Select Stage
        </option>

        <option value="Idea">
          Idea
        </option>

        <option value="Pre-Seed">
          Pre-Seed
        </option>

        <option value="Seed">
          Seed
        </option>

        <option value="Series A">
          Series A
        </option>

        <option value="Growth">
          Growth
        </option>

      </select>

    </div>

    {/* Website */}

    <div>

      <label className="block text-white mb-2 font-medium">
        Website
      </label>

      <input
        type="url"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="https://yourstartup.com"
        className="w-full px-4 py-3 rounded-xl bg-white border"
      />

    </div>

    {/* Description */}

    <div>

      <label className="block text-white mb-2 font-medium">
        Startup Description
      </label>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="5"
        placeholder="Describe your startup vision, mission, problem solved, target audience and goals..."
        className="w-full px-4 py-3 rounded-xl bg-white border"
        required
      />

    </div>

    {/* Button */}

    <button
      type="submit"
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
      🚀 Create Startup
    </button>

  </form>

</div>


  </div>
);

};

export default AddStartup;