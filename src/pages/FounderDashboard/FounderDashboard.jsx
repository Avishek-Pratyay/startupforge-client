import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const FounderDashboard = () => {
  const { dbUser } = useAuth();

 const [opportunities, setOpportunities] = useState([]);
const [startups, setStartups] = useState([]);
const [applications, setApplications] = useState([]);
  useEffect(() => {
    if (!dbUser?.email) return;

    // My startups
    api.get("/startups").then((res) => {
      const myStartups = res.data.filter(
        (s) => s.founderEmail === dbUser.email
      );
      setStartups(myStartups);
    });

    // My opportunities
    api.get("/opportunities").then((res) => {
      const myOpps = res.data.opportunities.filter(
        (o) => o.founderEmail === dbUser.email
      );
      setOpportunities(myOpps);
    });
    api.get(
  `/founder-applications/${dbUser.email}`
).then((res) => {
  setApplications(res.data);
});
  }, [dbUser]);
  const handleDeleteStartup = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this startup?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/startups/${id}`);

    setStartups(
      startups.filter((startup) => startup._id !== id)
    );

    alert("Startup deleted");
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteOpportunity = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this opportunity?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/opportunities/${id}`);

    setOpportunities(
      opportunities.filter((op) => op._id !== id)
    );

    alert("Opportunity deleted");
  } catch (error) {
    console.log(error);
  }
};
const totalApplications = applications.length;

const acceptedMembers = applications.filter(
  (app) => app.status === "Accepted"
).length;
  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Founder Dashboard
        </h1>
        

        <div className="flex gap-3">
          
          <Link
            to="/dashboard/add-startup"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Add Startup
          </Link>

          <Link
            to="/dashboard/add-opportunity"
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Add Opportunity
          </Link>
          <Link
  to="/founder-applications"
  className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
>
  Applications
</Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

{/* Total Opportunities */}
<div className="bg-white border rounded-2xl p-6 shadow-sm">
  <p className="text-gray-500 text-sm">
    Total Opportunities
  </p>

  <h2 className="text-3xl font-bold text-indigo-600">
    {opportunities.length}
  </h2>
</div>

{/* Total Applications */}
<div className="bg-white border rounded-2xl p-6 shadow-sm">
  <p className="text-gray-500 text-sm">
    Total Applications
  </p>

  <h2 className="text-3xl font-bold text-purple-600">
    {totalApplications}
  </h2>
</div>

{/* Accepted Members */}
<div className="bg-white border rounded-2xl p-6 shadow-sm">
  <p className="text-gray-500 text-sm">
    Accepted Members
  </p>

  <h2 className="text-3xl font-bold text-green-600">
    {acceptedMembers}
  </h2>
</div>

      </div>

      {/* STARTUPS */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          My Startups
        </h2>

        {startups.length === 0 ? (
          <p className="text-gray-500">No startups yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
{startups.map((s) => (
  <div
    key={s._id}
    className="bg-white border rounded-2xl p-5 shadow-sm"
  >
    <h3 className="font-semibold text-lg mb-3">
      {s.name || s.title}
    </h3>

    <div className="flex gap-2">
      <Link
  to={`/dashboard/edit-startup/${s._id}`}
  className="px-3 py-2 bg-blue-600 text-white rounded-lg"
>
  Edit
</Link>

      <button
        onClick={() => handleDeleteStartup(s._id)}
        className="px-3 py-2 bg-red-600 text-white rounded-lg"
      >
        Delete
      </button>
    </div>
  </div>
))}
          </div>
        )}
      </div>

      {/* OPPORTUNITIES */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          My Opportunities
        </h2>

        {opportunities.length === 0 ? (
          <p className="text-gray-500">No opportunities yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {opportunities.map((o) => (
              <div
                key={o._id}
                className="bg-white border rounded-2xl p-4 shadow-sm"
              >
                <div>
  <h3 className="font-semibold text-lg">
    {o.role_title}
  </h3>

  <p className="text-sm text-gray-500 mt-1">
    {o.work_type}
  </p>

  <div className="flex gap-2 mt-4">
    <Link
  to={`/dashboard/edit-opportunity/${o._id}`}
  className="px-3 py-2 bg-blue-600 text-white rounded-lg"
>
  Edit
</Link>

    <button
      onClick={() => handleDeleteOpportunity(o._id)}
      className="px-3 py-2 bg-red-600 text-white rounded-lg"
    >
      Delete
    </button>
  </div>
</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default FounderDashboard;