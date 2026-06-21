import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const MyApplications = () => {
const { dbUser } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
  const res = await api.get(
    `/my-applications/${dbUser.email}`
  );

  console.log("Applications:", res.data);

  setApplications(res.data);
} catch (error) {
  console.log(error);
}};

    if (dbUser?.email) {
      fetchApplications();
    }
  }, [dbUser]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

<div className="space-y-4">

  {applications.length === 0 ? (
    <p className="text-gray-500">
      You have not applied to any opportunities yet.
    </p>
  ) : (
    applications.map((app) => (
      <div
        key={app._id}
        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg text-slate-800">
              Opportunity Applied
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              ID: {app.opportunity_id}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
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
      </div>
    ))
  )}

</div>
    </div>
  );
};

export default MyApplications;