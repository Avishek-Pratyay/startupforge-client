import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
const FounderDashboard = () => {
  const { dbUser } = useAuth();

  const [opportunities, setOpportunities] = useState([]);
  const [startups, setStartups] = useState([]);
  <Link
  to="/dashboard/add-startup"
  className="btn btn-primary mb-4"
>
  Add Startup
</Link>
  useEffect(() => {
    if (!dbUser?.email) return;

    // My startups
    api.get("/startups").then((res) => {
      const myStartups = res.data.filter(
        (s) => s.founderEmail === dbUser.email
      );
      setStartups(myStartups);
    });
<Link
  to="/dashboard/add-opportunity"
  className="btn btn-primary ml-4"
>
  Add Opportunity
</Link>
    // My opportunities
    api.get("/opportunities").then((res) => {
      const myOpps = res.data.opportunities.filter(
        (o) => o.founderEmail === dbUser.email
      );
      setOpportunities(myOpps);
    });
  }, [dbUser]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Founder Dashboard
      </h1>

      {/* Startups */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold">
          My Startups
        </h2>

        {startups.length === 0 ? (
          <p>No startups yet</p>
        ) : (
          startups.map((s) => (
            <div key={s._id} className="border p-3 mt-2">
              {s.name || s.title}
            </div>
          ))
        )}
      </div>

      {/* Opportunities */}
      <div>
        <h2 className="text-xl font-semibold">
          My Opportunities
        </h2>

        {opportunities.length === 0 ? (
          <p>No opportunities yet</p>
        ) : (
          opportunities.map((o) => (
            <div key={o._id} className="border p-3 mt-2">
              {o.role_title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FounderDashboard;