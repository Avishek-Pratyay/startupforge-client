import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaRocket,
  FaUsers,
  FaBriefcase,
  FaPlus,
  FaEdit,
  FaTrash,
  FaBuilding,
} from "react-icons/fa";


const FounderDashboard = () => {
  const { dbUser } = useAuth();

 const [opportunities, setOpportunities] = useState([]);
const [startups, setStartups] = useState([]);
const [applications, setApplications] = useState([]);
  useEffect(() => {
    if (!dbUser?.email) return;

    // My startups
    api.get("/startups").then((res) => {
const myStartups = res.data
  .filter((s) => s.founderEmail === dbUser.email)
  .sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  );

setStartups(myStartups);
    });

    // My opportunities
    api.get("/opportunities").then((res) => {
const myOpps = res.data.opportunities
  .filter((o) => o.founderEmail === dbUser.email)
  .sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  );

setOpportunities(myOpps);
    });
api.get(`/founder-applications/${dbUser.email}`)
  .then((res) => {
    const sortedApplications = res.data.sort(
      (a, b) =>
        new Date(b.applied_at) -
        new Date(a.applied_at)
    );

    setApplications(sortedApplications);
  });
  }, [dbUser]);
  const handleDeleteStartup = async (id) => {
  const result = await Swal.fire({
    title: "Delete Startup?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`/startups/${id}`);

    setStartups(
      startups.filter((startup) => startup._id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Startup deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Delete Failed",
    });
  }
};
const handleDeleteOpportunity = async (id) => {
  const result = await Swal.fire({
    title: "Delete Opportunity?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
  });

  if (!result.isConfirmed) return;

  try {
    await api.delete(`/opportunities/${id}`);

    setOpportunities(
      opportunities.filter(
        (op) => op._id !== id
      )
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Opportunity deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Delete Failed",
    });
  }
};
const totalApplications = applications.length;

const acceptedMembers = applications.filter(
  (app) => app.status === "Accepted"
).length;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-10 px-10">

      {/* HEADER */}
<div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white mb-10 shadow-xl">
  <div className="flex items-center gap-3">
  <h1 className="text-3xl font-bold text-slate-800">
    Founder Dashboard
  </h1>

  {dbUser?.isPremiumFounder && (
    <span
      className="
      px-4 py-1
      rounded-full
      bg-gradient-to-r
      from-yellow-400
      via-orange-500
      to-yellow-600
      text-white
      text-sm
      font-semibold
      shadow-md
      animate-pulse
    "
    >
      👑 Premium Founder
    </span>
  )}
</div>

  <p className="mt-2 text-indigo-100">
    Manage startups, opportunities and track applicants.
  </p>

  <div className="flex flex-wrap gap-3 mt-6">
    <Link
      to="/dashboard/add-startup"
      className="bg-white text-indigo-700 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
    >
      <FaPlus className="inline mr-2" />
      Add Startup
    </Link>

    <Link
      to="/dashboard/add-opportunity"
      className="bg-purple-900/30 backdrop-blur px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
    >
      <FaBriefcase className="inline mr-2" />
      Add Opportunity
    </Link>

    <Link
      to="/founder-applications"
      className="bg-green-500 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
    >
      <FaUsers className="inline mr-2" />
      Applications
    </Link>
  </div>
</div>

      {/* STATS */}
<div className="grid md:grid-cols-3 gap-6 mb-10">

  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-3xl p-6 shadow-lg">
    <FaBriefcase className="text-3xl mb-4" />

    <p className="text-indigo-100">
      Total Opportunities
    </p>

    <h2 className="text-4xl font-bold">
      {opportunities.length}
    </h2>
  </div>

  <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-3xl p-6 shadow-lg">
    <FaUsers className="text-3xl mb-4" />

    <p className="text-purple-100">
      Total Applications
    </p>

    <h2 className="text-4xl font-bold">
      {totalApplications}
    </h2>
  </div>

  <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-3xl p-6 shadow-lg">
    <FaRocket className="text-3xl mb-4" />

    <p className="text-green-100">
      Accepted Members
    </p>

    <h2 className="text-4xl font-bold">
      {acceptedMembers}
    </h2>
  </div>

</div>

      {/* STARTUPS */}
      <div className="mb-10">
        <h2 className="text-3xl text-white font-bold mb-6">
          My Startups
        </h2>

        {startups.length === 0 ? (
          <p className="text-gray-500">No startups yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
{startups.map((s) => (
  <div
    key={s._id}
    className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition"
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
        <h2 className="text-3xl text-white font-bold mb-6">
          My Opportunities
        </h2>

        {opportunities.length === 0 ? (
          <p className="text-gray-500">No opportunities yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {opportunities.map((o) => (
              <div
                key={o._id}
                className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition"
              >
                <div>
  <h3 className="text-xl font-bold text-slate-800">
  {o.role_title}
</h3>

<div className="mt-3 flex flex-wrap gap-2">

  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
    {o.work_type}
  </span>

  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
    {o.commitment_level}
  </span>

</div>

<p className="text-gray-500 mt-4">
  Deadline: {o.deadline}
</p>
  <div className="flex gap-2 mt-4">
    <Link
  to={`/dashboard/edit-opportunity/${o._id}`}
  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
>
  Edit
</Link>

    <button
      onClick={() => handleDeleteOpportunity(o._id)}
      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
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