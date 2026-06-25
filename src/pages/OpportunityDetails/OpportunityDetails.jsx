import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const OpportunityDetails = () => {
  const { id } = useParams();
  const { dbUser } = useAuth();

  const navigate = useNavigate();
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
toast.error("Please login first");
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

    toast.success("Application submitted successfully!");

    setShowModal(false);

    setTimeout(() => {
      navigate("/browse-opportunities");
    }, 1200);

  } catch (err) {
    console.log(err);

    toast.error(
      err?.response?.data?.message ||
      "Application failed"
    );
  }
};

  if (!opportunity) return <p className="p-10">Loading...</p>;

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-8">
  <div className="max-w-4xl mx-auto">

    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl mb-8">
      <h1 className="text-4xl font-bold">
        Opportunity Details
      </h1>

      <p className="mt-2 text-indigo-100">
        Explore this opportunity and apply to join the startup.
      </p>
    </div>

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white shadow-2xl">
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
        className="
mt-8
bg-gradient-to-r
from-indigo-600
via-purple-600
to-pink-500
text-white
px-8
py-3
rounded-xl
font-semibold
hover:scale-105
transition
"
      >
        Apply Now
      </button>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
<div
  className="
  relative
  bg-slate-900
  border border-indigo-500/30
  text-white
  w-full
  max-w-xl
  rounded-3xl
  p-8
  shadow-2xl
"
>

  <button
    onClick={() => setShowModal(false)}
    className="
      absolute
      top-4
      right-4
      text-2xl
      text-gray-400
      hover:text-red-400
      transition
    "
  >
    ✕
  </button>

            <h2 className="text-2xl font-bold mb-2">
              Apply for Opportunity
            </h2>

            <p className="
w-full
bg-slate-800
border
border-slate-700
rounded-xl
px-4
py-3
text-white
focus:outline-none
focus:ring-2
focus:ring-indigo-500
">
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
        </div>
  </div>

    
  );
  
};

export default OpportunityDetails;