import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const BrowseOpportunities = () => {
  const { dbUser } = useAuth();

  const [opportunities, setOpportunities] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null);

  const [applicationForm, setApplicationForm] =
    useState({
      portfolio_link: "",
      motivation: "",
    });

  // Fetch Opportunities
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await api.get("/opportunities");

        setOpportunities(
          res.data.opportunities || []
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchOpportunities();
  }, []);

  // Fetch My Applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!dbUser?.email) return;

        const res = await api.get(
          `/my-applications/${dbUser.email}`
        );

        const ids = res.data.map((app) =>
          String(app.opportunity_id)
        );

        setAppliedIds(ids);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, [dbUser]);

  // Open Modal
  const handleApply = (opportunity) => {
    if (!dbUser?.email) {
      alert("Please login first");
      return;
    }

    setSelectedOpportunity(opportunity);

    setApplicationForm({
      portfolio_link: "",
      motivation: "",
    });

    setShowModal(true);
  };

  // Submit Application
  const submitApplication = async () => {
    try {
      await api.post("/applications", {
        opportunity_id: String(
          selectedOpportunity._id
        ),
        applicant_email: dbUser.email,
        portfolio_link:
          applicationForm.portfolio_link,
        motivation: applicationForm.motivation,
      });

      alert("Application submitted successfully!");

      setAppliedIds((prev) => [
        ...prev,
        String(selectedOpportunity._id),
      ]);

      setShowModal(false);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Application failed"
      );
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Browse Opportunities
      </h1>

      {opportunities.length === 0 ? (
        <p className="text-gray-500">
          No opportunities available.
        </p>
      ) : (
        <div className="grid gap-5">
          {opportunities.map((op) => {
            const alreadyApplied =
              appliedIds.includes(
                String(op._id)
              );

            return (
              <div
                key={op._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <Link
                  to={`/opportunity/${op._id}`}
                >
                  <h2 className="text-xl font-bold text-slate-800 hover:text-indigo-600">
                    {op.role_title}
                  </h2>
                </Link>

                <div className="mt-2 text-sm text-gray-500">
                  {op.work_type} • {op.industry}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {op.required_skills?.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  Deadline: {op.deadline}
                </p>

                <button
                  onClick={() =>
                    handleApply(op)
                  }
                  disabled={alreadyApplied}
                  className={`mt-5 w-full py-3 rounded-xl font-medium ${
                    alreadyApplied
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {alreadyApplied
                    ? "Already Applied"
                    : "Apply Now"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* APPLY MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-2">
              Apply for Opportunity
            </h2>

            <p className="text-gray-500 mb-6">
              {
                selectedOpportunity?.role_title
              }
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Portfolio Link
                </label>

                <input
                  type="url"
                  value={
                    applicationForm.portfolio_link
                  }
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      portfolio_link:
                        e.target.value,
                    })
                  }
                  placeholder="https://yourportfolio.com"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Motivation Message
                </label>

                <textarea
                  rows="4"
                  value={
                    applicationForm.motivation
                  }
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      motivation:
                        e.target.value,
                    })
                  }
                  placeholder="Tell us why you're interested..."
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-2 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={submitApplication}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseOpportunities;