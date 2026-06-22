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
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Browse Startups
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {startups.map((startup) => (
          <div
            key={startup._id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <img
              src={startup.logo}
              alt={startup.startup_name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                {startup.startup_name}
              </h2>

              <p className="text-gray-500 mt-2">
                {startup.industry}
              </p>

              <p className="mt-3 text-sm text-gray-600">
                {startup.description?.slice(0, 100)}
              </p>

              <Link
                to={`/startup/${startup._id}`}
                className="inline-block mt-5 bg-indigo-600 text-white px-5 py-2 rounded-xl"
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