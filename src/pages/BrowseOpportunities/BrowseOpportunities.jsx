import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const BrowseOpportunities = () => {
const { dbUser } = useAuth();
const navigate = useNavigate();

const [opportunities, setOpportunities] = useState([]);
const [appliedIds, setAppliedIds] = useState([]);

const [search, setSearch] = useState("");
const [workType, setWorkType] = useState("");
const [industry, setIndustry] = useState("");

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [showModal, setShowModal] = useState(false);
const [selectedOpportunity, setSelectedOpportunity] = useState(null);
const [loading, setLoading] = useState(true);
const [applicationForm, setApplicationForm] = useState({
portfolio_link: "",
motivation: "",
});

useEffect(() => {
  const fetchOpportunities = async () => {
    try {
          setLoading(true);
          
    

      const res = await api.get("/opportunities", {
        params: {
          search,
          workType,
          industry,
          page,
          limit: 6,
        },
      });

      setOpportunities(res.data.opportunities || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
    finally{setLoading (false);}
  };

  fetchOpportunities();
}, [search, workType, industry, page]);

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

const handleApply = (opportunity) => {
if (!dbUser?.email) {
toast.error("Please login first");


  navigate("/login", {
    state: {
      from: "/browse-opportunities",
    },
  });

  return;
}

setSelectedOpportunity(opportunity);

setApplicationForm({
  portfolio_link: "",
  motivation: "",
});

setShowModal(true);


};

const submitApplication = async () => {
try {
await api.post("/applications", {
opportunity_id: String(selectedOpportunity._id),
applicant_email: dbUser.email,
portfolio_link: applicationForm.portfolio_link,
motivation: applicationForm.motivation,
});


  toast.success(
    "Application submitted successfully!"
  );

  setAppliedIds((prev) => [
    ...prev,
    String(selectedOpportunity._id),
  ]);

  setShowModal(false);
} catch (error) {
  console.log(error);

  toast.error(
    error?.response?.data?.message ||
      "Application failed"
  );
}


};
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

return ( <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-10">


  <h1 className="text-5xl font-bold text-white text-center mb-12">
    Browse Opportunities
  </h1>

  <div className="max-w-5xl mx-auto mb-10 grid md:grid-cols-3 gap-4">

  <input
    type="text"
    placeholder="Search role or skill..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="px-4 py-3 rounded-xl border bg-white"
  />

  <select
    value={workType}
    onChange={(e) => {
      setWorkType(e.target.value);
      setPage(1);
    }}
    className="px-4 py-3 rounded-xl border bg-white"
  >
    <option value="">All Work Types</option>
    <option value="Remote">Remote</option>
    <option value="Onsite">Onsite</option>
    <option value="Hybrid">Hybrid</option>
  </select>

  <input
    type="text"
    placeholder="Industry"
    value={industry}
    onChange={(e) => {
      setIndustry(e.target.value);
      setPage(1);
    }}
    className="px-4 py-3 rounded-xl border bg-white"
  />

</div>

  {opportunities.length === 0 ? (
    <p className="text-center text-gray-300">
      No opportunities available.
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {opportunities.map((op) => {
        const alreadyApplied =
          appliedIds.includes(String(op._id));

        return (
          <div
            key={op._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition"
          >
            <Link to={`/opportunities/${op._id}`}>
              <h2 className="text-xl font-bold text-white hover:text-indigo-300">
                {op.role_title}
              </h2>
            </Link>
            <Link to={`/opportunities/${op._id}`}>
              <h2 className="text-xl font- text-white hover:text-indigo-300">
                {op.startup_name}
              </h2>
            </Link>

            <div className="mt-2 text-sm text-gray-300">
              {op.work_type} • {op.industry}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {op.required_skills?.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            <p className="mt-4 text-sm text-gray-300">
              Deadline: {op.deadline}
            </p>

            <button
              onClick={() => handleApply(op)}
              disabled={alreadyApplied}
              className={`mt-5 w-full py-3 rounded-xl font-medium ${
                alreadyApplied
                  ? "bg-gray-500 text-white cursor-not-allowed"
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

  {showModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-2">
          Apply for Opportunity
        </h2>

        <p className="text-gray-500 mb-6">
          {selectedOpportunity?.role_title}
        </p>

        <div className="space-y-4">
          <input
            type="url"
            placeholder="Portfolio Link"
            value={applicationForm.portfolio_link}
            onChange={(e) =>
              setApplicationForm({
                ...applicationForm,
                portfolio_link: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            rows="4"
            placeholder="Motivation"
            value={applicationForm.motivation}
            onChange={(e) =>
              setApplicationForm({
                ...applicationForm,
                motivation: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={submitApplication}
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
  <div className="flex justify-center gap-3 mt-10">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-4 py-2 bg-white rounded-xl disabled:opacity-50"
  >
    Previous
  </button>

  <span className="text-white flex items-center">
    Page {page}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-4 py-2 bg-white rounded-xl disabled:opacity-50"
  >
    Next
  </button>
</div>
</div>





);
};

export default BrowseOpportunities;
