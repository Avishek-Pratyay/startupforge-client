import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const OpportunityDetails = () => {
  const { id } = useParams();
  const { dbUser } = useAuth();

  const [opportunity, setOpportunity] = useState(null);

  // modal states
  const [showModal, setShowModal] = useState(false);

  const [applicationForm, setApplicationForm] = useState({
    portfolio_link: "",
    motivation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/opportunities/${id}`);
        setOpportunity(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // OPEN MODAL
  const handleApplyClick = () => {
    if (!dbUser?.email) {
      alert("Please login first");
      return;
    }

    setApplicationForm({
      portfolio_link: "",
      motivation: "",
    });

    setShowModal(true);
  };

  // SUBMIT APPLICATION
  const submitApplication = async () => {
    try {
      await api.post("/applications", {
        opportunity_id: id,
        applicant_email: dbUser.email,
        portfolio_link: applicationForm.portfolio_link,
        motivation: applicationForm.motivation,
      });

      alert("Application submitted successfully!");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Application failed");
    }
  };

  if (!opportunity) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">

      {/* OPPORTUNITY INFO */}
      <h1 className="text-3xl font-bold">
        {opportunity.role_title}
      </h1>

      <p className="mt-2 text-gray-600">
        {opportunity.work_type} • {opportunity.industry}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Required Skills:</h3>
        <ul className="list-disc ml-5">
          {opportunity.required_skills?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-gray-500">
        Deadline: {opportunity.deadline}
      </p>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApplyClick}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
      >
        Apply Now
      </button>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold mb-2">
              Apply for Opportunity
            </h2>

            <p className="text-gray-500 mb-6">
              {opportunity.role_title}
            </p>

            {/* Portfolio Link */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Portfolio Link
                </label>

                <input
                  type="url"
                  value={applicationForm.portfolio_link}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      portfolio_link: e.target.value,
                    })
                  }
                  placeholder="https://yourportfolio.com"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Motivation Message
                </label>

                <textarea
                  rows="4"
                  value={applicationForm.motivation}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      motivation: e.target.value,
                    })
                  }
                  placeholder="Why are you interested?"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
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

export default OpportunityDetails;