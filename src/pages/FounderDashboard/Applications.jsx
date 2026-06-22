import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const Applications = () => {
  const { dbUser } = useAuth();

  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

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

      const myApplications = appRes.data.filter(
        (app) =>
          myOpportunityIds.includes(app.opportunity_id)
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

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectApplication = async (id) => {
    try {
      await api.patch(`/applications/reject/${id}`);

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          No applications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border rounded-2xl p-5 shadow-sm"
            >
              <p>
                <b>Applicant:</b>{" "}
                {app.applicant_email}
              </p>

              <p>
                <b>Status:</b> {app.status}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() =>
                    acceptApplication(app._id)
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    rejectApplication(app._id)
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;