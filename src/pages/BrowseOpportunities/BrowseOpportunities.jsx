import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const BrowseOpportunities = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/opportunities");
        setOpportunities(res.data.opportunities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <div className="grid gap-4">
  {opportunities.map((op) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition">

  {/* TITLE */}
  <h2 className="text-xl font-bold text-slate-800">
    {op.role_title}
  </h2>

  {/* META INFO */}
  <div className="mt-2 text-sm text-gray-500">
    {op.work_type} • {op.industry}
  </div>

  {/* SKILLS */}
  <div className="mt-3 flex flex-wrap gap-2">
    {op.required_skills?.map((skill, i) => (
      <span
        key={i}
        className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full"
      >
        {skill}
      </span>
    ))}
  </div>

  {/* DEADLINE */}
  <p className="mt-3 text-sm text-gray-500">
    Deadline: {op.deadline}
  </p>

  {/* BUTTON */}
  <button
    onClick={() => handleApply(op._id)}
    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium"
  >
    Apply Now
  </button>

</div>
))}
</div>
      <h1 className="text-2xl font-bold mb-6">
        Browse Opportunities
      </h1>

      {/* We will show data here */}
    </div>
  );
};

export default BrowseOpportunities;