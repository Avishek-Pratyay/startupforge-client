import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

const MyApplications = () => {
  const { dbUser } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!dbUser?.email) return;

    const fetchApplications = async () => {
      try {
        const res = await api.get(
          `/my-applications/${dbUser.email}`
        );

        // IMPORTANT FIX: always ensure array
        setApplications(res.data || []);
      } catch (error) {
        console.log("MY APPLICATIONS ERROR:", error);
        setApplications([]);
      }
    };

    fetchApplications();
  }, [dbUser?.email]);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <p className="text-gray-500">
            You have not applied to any opportunities yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">

          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="flex justify-between items-start">

                {/* LEFT SIDE */}
                <div className="space-y-2">

                  {/* OPPORTUNITY NAME */}
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <FaBriefcase />
                    {app.role_title || "Opportunity"}
                  </h2>

                  {/* STARTUP NAME (FIXED) */}
                  <p className="text-gray-600 flex items-center gap-2">
                    <FaBuilding />
                    {app.startup_name ||
                      app.startup_id ||
                      "Startup"}
                  </p>

                  {/* DATE SAFETY FIX */}
                  <p className="text-gray-500 flex items-center gap-2">
                    <FaCalendarAlt />
                    Applied:{" "}
                    {app.applied_at
                      ? new Date(app.applied_at).toLocaleDateString()
                      : "N/A"}
                  </p>

                </div>

                {/* STATUS */}
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    app.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status || "Pending"}
                </span>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyApplications;