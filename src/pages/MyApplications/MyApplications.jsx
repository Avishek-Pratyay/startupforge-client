import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get(
          `/my-applications/${user.email}`
        );

        setApplications(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.email) {
      fetchApplications();
    }
  }, [user]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="border p-4 rounded"
          >
            <p>
              <b>Opportunity ID:</b>{" "}
              {app.opportunity_id}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  app.status === "Accepted"
                    ? "text-green-600"
                    : app.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {app.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;