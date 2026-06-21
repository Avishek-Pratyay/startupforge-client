import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const FounderDashboard = () => {
  const { dbUser } = useAuth();

  const [opportunities, setOpportunities] = useState([]);
  const [startups, setStartups] = useState([]);

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
  }, [dbUser]);

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
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">My Startups</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {startups.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Opportunities</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {opportunities.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Total Listings</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {startups.length + opportunities.length}
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
                className="bg-white border rounded-2xl p-4 shadow-sm"
              >
                <h3 className="font-semibold">
                  {s.name || s.title}
                </h3>
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
                <h3 className="font-semibold">
                  {o.role_title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default FounderDashboard;