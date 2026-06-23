import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const BrowseStartups = () => {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const loadStartups = async () => {
      try {
        const res = await api.get("/startups");

        const approved = res.data.filter(
          (item) =>
            item.status === "Approved" ||
            item.status === "approved"
        );

        setStartups(approved);
      } catch (error) {
        console.log(error);
      }
    };

    loadStartups();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-12 px-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white">
          🚀 Browse Startups
        </h1>

        <p className="text-gray-300 mt-3">
          Discover innovative startups and join amazing teams worldwide
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {startups.map((startup) => (
          <div
            key={startup._id}
            className="group bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition duration-300"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={startup.logo}
                alt={startup.startup_name}
                className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* CONTENT */}
            <div className="p-6 text-white">

              <h2 className="text-2xl font-bold">
                {startup.startup_name}
              </h2>

              <p className="text-indigo-300 mt-1 font-medium">
                {startup.industry}
              </p>

              <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                {startup.description?.slice(0, 110)}...
              </p>

              {/* TAG STYLE */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">
                  Startup
                </span>

                <span className="px-3 py-1 text-xs bg-pink-500/20 text-pink-300 rounded-full">
                  Verified
                </span>
              </div>

              {/* BUTTON */}
              <Link
                to={`/startup/${startup._id}`}
                className="inline-block mt-6 w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                View Details
              </Link>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default BrowseStartups;