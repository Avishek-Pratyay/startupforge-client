import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

import {
  FaUser,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBriefcase,
  FaLink,
} from "react-icons/fa";
const Applications = () => {
  const { dbUser } = useAuth();

  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  const totalApplications = applications.length;

const acceptedCount = applications.filter(
  (app) => app.status === "Accepted"
).length;

const rejectedCount = applications.filter(
  (app) => app.status === "Rejected"
).length;

const pendingCount = applications.filter(
  (app) => app.status === "Pending"
).length;

  useEffect(() => {
    if (!dbUser?.email) return;

    loadData();
  }, [dbUser]);

  const loadData = async () => {
    try {
      const oppRes = await api.get("/opportunities");
      const appRes = await api.get("/applications");

      const myOpportunities =
        oppRes.data.opportunities.filter(
          (op) => op.founderEmail === dbUser.email
        );

      const myOpportunityIds = myOpportunities.map(
        (op) => op._id
      );

      const myApplications = appRes.data
  .filter(
    (app) =>
      myOpportunityIds.includes(app.opportunity_id)
  )
  .sort(
    (a, b) =>
      new Date(b.applied_at) -
      new Date(a.applied_at)
  );

      setApplications(myApplications);
      setOpportunities(myOpportunities);
    } catch (error) {
      console.log(error);
    }
  };

const acceptApplication = async (id) => {
  try {
    await api.patch(`/applications/accept/${id}`);

    toast.success("Application accepted");

    loadData();
  } catch (error) {
    console.log(error);

    toast.error("Failed to accept application");
  }
};

 const rejectApplication = async (id) => {
  try {
    await api.patch(`/applications/reject/${id}`);

    toast.success("Application rejected");

    loadData();
  } catch (error) {
    console.log(error);

    toast.error("Failed to reject application");
  }
};

  return (

  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8">


<div className="max-w-7xl mx-auto">

  {/* HERO */}
  <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl mb-8">

    <h1 className="text-4xl font-bold">
      Applications Dashboard
    </h1>

    <p className="mt-3 text-indigo-100">
      Review applicants, manage recruitment and grow your startup team.
    </p>

  </div>

  {/* STATS */}

  <div className="grid md:grid-cols-4 gap-6 mb-10">

    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-6 text-white shadow-xl">
      <FaBriefcase className="text-3xl mb-3" />

      <p>Total Applications</p>

      <h2 className="text-4xl font-bold mt-2">
        {totalApplications}
      </h2>
    </div>

    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl">
      <FaClock className="text-3xl mb-3" />

      <p>Pending</p>

      <h2 className="text-4xl font-bold mt-2">
        {pendingCount}
      </h2>
    </div>

    <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 text-white shadow-xl">
      <FaCheckCircle className="text-3xl mb-3" />

      <p>Accepted</p>

      <h2 className="text-4xl font-bold mt-2">
        {acceptedCount}
      </h2>
    </div>

    <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-6 text-white shadow-xl">
      <FaTimesCircle className="text-3xl mb-3" />

      <p>Rejected</p>

      <h2 className="text-4xl font-bold mt-2">
        {rejectedCount}
      </h2>
    </div>

  </div>

  {/* APPLICATIONS */}

  {applications.length === 0 ? (

    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center text-white">
      No applications received yet.
    </div>

  ) : (

    <div className="grid lg:grid-cols-2 gap-6">

      {applications.map((app) => (

        <div
          key={app._id}
          className="
            bg-white/10
            backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-[1.02]
            transition
          "
        >

          <div className="flex justify-between items-start">

            <div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaUser />
                Applicant
              </h3>

              <p className="text-indigo-200 mt-2">
                {app.applicant_email}
              </p>

            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                app.status === "Accepted"
                  ? "bg-green-500/20 text-green-300"
                  : app.status === "Rejected"
                  ? "bg-red-500/20 text-red-300"
                  : "bg-yellow-500/20 text-yellow-300"
              }`}
            >
              {app.status}
            </span>

          </div>

          <div className="mt-5 space-y-3">

            <div>
              <p className="text-gray-400 text-sm">
                Applied Date
              </p>

              <p className="text-white">
                {new Date(
                  app.applied_at
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">
                Portfolio
              </p>

              {app.portfolio_link ? (
                <a
                  href={app.portfolio_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 flex items-center gap-2"
                >
                  <FaLink />
                  Open Portfolio
                </a>
              ) : (
                <p className="text-gray-500">
                  Not Provided
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">
                Motivation
              </p>

              <div className="bg-white/5 rounded-xl p-3 text-gray-300">
                {app.motivation || "No motivation message"}
              </div>
            </div>

          </div>

          {app.status === "Pending" && (

            <div className="flex gap-3 mt-6">

              <button
                onClick={() =>
                  acceptApplication(app._id)
                }
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  rejectApplication(app._id)
                }
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
              >
                Reject
              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  )}

</div>


  </div>
);

};

export default Applications;