import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditStartup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    description: "",
  });

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await api.get(`/startups/${id}`);

        setFormData({
          name: res.data.name || "",
          industry: res.data.industry || "",
          description: res.data.description || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchStartup();
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
      await api.patch(`/startups/${id}`, formData);

      alert("Startup updated successfully");
      navigate("/founder-dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Edit Startup
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm space-y-5"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
        />

        <input
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 border rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl"
        >
          Update Startup
        </button>
      </form>
    </div>
  );
};

export default EditStartup;