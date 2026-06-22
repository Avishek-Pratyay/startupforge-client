import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

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
      }
    };

    fetchApps();
  }, [dbUser]);

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        Collaborator Dashboard
      </h1>

      {/* =========================
          SECTION 1: OPPORTUNITIES
      ========================== */}
      <h2 className="text-xl font-semibold mb-3">
        Browse Opportunities
      </h2>

      <div className="grid gap-4 mb-10">
        {opportunities.map((op) => (
          <div
            key={op._id}
            className="border rounded-xl p-4 bg-white"
          >
            <Link to={`/opportunities/${op._id}`}>
              <h3 className="font-bold text-lg hover:text-indigo-600">
                {op.role_title}
              </h3>
            </Link>

            <p className="text-sm text-gray-500">
              {op.work_type} • {op.industry}
            </p>

            <p className="text-sm mt-2">
              Deadline: {op.deadline}
            </p>
          </div>
        ))}
      </div>

      {/* =========================
          SECTION 2: MY APPLICATIONS
      ========================== */}
      <h2 className="text-xl font-semibold mb-3">
        My Applications
      </h2>

      <div className="space-y-3">
        {applications.length === 0 ? (
          <p className="text-gray-500">
            No applications yet
          </p>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="border rounded-xl p-4 bg-white flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {app.role_title || "Opportunity"}
                </p>
                <p className="text-sm text-gray-500">
                  Applied:{" "}
                  {new Date(
                    app.applied_at
                  ).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  app.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {app.status}
              </span>
            </div>
          ))
        )}
      </div>

      {/* =========================
          SECTION 3: PROFILE LINK
      ========================== */}
      <div className="mt-10">
        <Link
  to="/profile"
  className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
>
  Update Profile
</Link>
      </div>

    </div>
  );
};

export default CollaboratorDashboard;