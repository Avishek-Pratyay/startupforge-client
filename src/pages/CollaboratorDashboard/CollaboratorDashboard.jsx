import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CollaboratorDashboard = () => {
  const { dbUser } = useAuth();

  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  // =========================
  // FETCH OPPORTUNITIES
  // =========================
  useEffect(() => {
    const fetchOpps = async () => {
      try {
        const res = await api.get("/opportunities");
        setOpportunities(res.data.opportunities || []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load opportunities");
      }
    };

    fetchOpps();
  }, []);

  // =========================
  // FETCH MY APPLICATIONS
  // =========================
  useEffect(() => {
    if (!dbUser?.email) return;

    const fetchApps = async () => {
      try {
        const res = await api.get(
          `/my-applications/${dbUser.email}`
        );
        setApplications(res.data || []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load applications");
      }
    };

    fetchApps();
  }, [dbUser]);
        console.log(applications);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-6 py-10 text-white">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-10 text-center">
        🚀 Collaborator Dashboard
      </h1>


      {/* =========================
          SECTION 1: OPPORTUNITIES
      ========================== */}
      <h2 className="text-2xl font-semibold mb-4">
        Browse Opportunities
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

        {opportunities.map((op) => (
          <div
            key={op._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl hover:scale-[1.02] transition"
          >

            <Link to={`/opportunities/${op._id}`}>
              <h3 className="text-xl font-bold hover:text-indigo-300">
                {op.role_title}
              </h3>
            </Link>

            <p className="text-indigo-300 text-sm mt-1">
              {op.work_type} • {op.industry}
            </p>

            <p className="text-gray-300 text-sm mt-3">
              📅 Deadline: {op.deadline}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {op.required_skills?.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* =========================
          SECTION 2: MY APPLICATIONS
      ========================== */}
      <h2 className="text-2xl font-semibold mb-4">
        My Applications
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

        {applications.length === 0 ? (
          <p className="text-gray-300">
            No applications yet 🚀
          </p>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex justify-between items-center shadow-lg"
            >

              <div>
                <p className="font-bold text-lg">
                  {app.role_title || "Opportunity"}
                </p>

                <p className="text-sm text-gray-300">
                  {app.work_type || On-Site}
                </p>

                <p className="text-sm text-gray-300">
                  Applied on:{" "}
                  {app.applied_at
                    ? new Date(app.applied_at).toLocaleDateString()
                    : "N/A"}
                </p>

                {app.industry && (
                  <p className="text-xs text-indigo-300 mt-1">
                    {app.industry}
                  </p>
                )}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === "Accepted"
                    ? "bg-green-500/20 text-green-300"
                    : app.status === "Rejected"
                    ? "bg-red-500/20 text-red-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {app.status || "Pending"}
              </span>
            </div>
          ))
        )}
      </div>



    </div>
  );
};

export default CollaboratorDashboard;