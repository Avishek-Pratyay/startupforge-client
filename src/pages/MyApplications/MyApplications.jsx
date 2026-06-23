import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import {
FaBriefcase,
FaBuilding,
FaCalendarAlt,
FaLink,
FaCheckCircle,
FaClock,
FaTimesCircle,
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

    setApplications(res.data || []);
  } catch (error) {
    console.log(error);
    setApplications([]);
  }
};

fetchApplications();


}, [dbUser?.email]);

const acceptedCount = applications.filter(
(a) => a.status === "Accepted"
).length;

const rejectedCount = applications.filter(
(a) => a.status === "Rejected"
).length;

const pendingCount = applications.filter(
(a) =>
!a.status ||
a.status === "Pending"
).length;

return ( <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-6">


  <div className="max-w-6xl mx-auto">

    {/* HEADER */}
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-bold text-white">
        My Applications
      </h1>

      <p className="text-gray-300 mt-2">
        Track all opportunities you have applied for.
      </p>
    </div>

    {/* STATS */}
    <div className="grid md:grid-cols-4 gap-5 mb-8">

      <div className="bg-indigo-600 text-white rounded-2xl p-5 shadow-lg">
        <p className="text-sm opacity-80">
          Total Applications
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {applications.length}
        </h2>
      </div>

      <div className="bg-green-600 text-white rounded-2xl p-5 shadow-lg">
        <p className="text-sm opacity-80">
          Accepted
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {acceptedCount}
        </h2>
      </div>

      <div className="bg-yellow-500 text-white rounded-2xl p-5 shadow-lg">
        <p className="text-sm opacity-80">
          Pending
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {pendingCount}
        </h2>
      </div>

      <div className="bg-red-600 text-white rounded-2xl p-5 shadow-lg">
        <p className="text-sm opacity-80">
          Rejected
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {rejectedCount}
        </h2>
      </div>

    </div>

    {applications.length === 0 ? (

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          No Applications Yet
        </h2>

        <p className="text-gray-300">
          You haven't applied to any opportunities yet.
        </p>
      </div>

    ) : (

      <div className="grid gap-6">

        {applications.map((app) => (

          <div
            key={app._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.01] transition"
          >

            <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

              {/* LEFT */}
              <div className="flex-1">

                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FaBriefcase />
                  {app.role_title || "Opportunity"}
                </h2>

                <div className="mt-4 space-y-3">

                  <p className="text-gray-300 flex items-center gap-2">
                    <FaBuilding />
                    <span className="font-medium">
                      Startup:
                    </span>
                    {app.startup_name || "N/A"}
                  </p>

                  <p className="text-gray-300 flex items-center gap-2">
                    <FaCalendarAlt />
                    <span className="font-medium">
                      Applied:
                    </span>
                    {app.applied_at
                      ? new Date(
                          app.applied_at
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {app.portfolio_link && (
                    <p className="text-gray-300 flex items-center gap-2">
                      <FaLink />
                      <span className="font-medium">
                        Portfolio:
                      </span>

                      <a
                        href={app.portfolio_link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-300 hover:underline"
                      >
                        View Portfolio
                      </a>
                    </p>
                  )}

                  {app.motivation && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-indigo-300 mb-1">
                        Motivation Message
                      </p>

                      <p className="text-gray-300 text-sm bg-black/20 rounded-xl p-3">
                        {app.motivation}
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* STATUS */}
              <div>

                {app.status === "Accepted" ? (
                  <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold">
                    <FaCheckCircle />
                    Accepted
                  </div>
                ) : app.status === "Rejected" ? (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold">
                    <FaTimesCircle />
                    Rejected
                  </div>
                ) : (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold">
                    <FaClock />
                    Pending
                  </div>
                )}

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

export default MyApplications;
