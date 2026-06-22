import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const StartupDetails = () => {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);

  useEffect(() => {
    const loadStartup = async () => {
      try {
        const res = await api.get(`/startups/${id}`);
        setStartup(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadStartup();
  }, [id]);

  if (!startup) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <img
        src={startup.logo}
        alt={startup.startup_name}
        className="w-full h-80 object-cover rounded-3xl"
      />

      <h1 className="text-4xl font-bold mt-6">
        {startup.startup_name}
      </h1>

      <p className="mt-4 text-gray-600">
        {startup.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold">
            Industry
          </h3>
          <p>{startup.industry}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold">
            Funding Stage
          </h3>
          <p>{startup.funding_stage}</p>
        </div>

      </div>

    </div>
  );
};

export default StartupDetails;