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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white px-6 py-12">

      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={startup.logo}
            alt={startup.startup_name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <h1 className="absolute bottom-6 left-6 text-4xl font-bold">
            {startup.startup_name}
          </h1>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-6">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <h3 className="text-indigo-300 text-sm">Industry</h3>
              <p className="text-xl font-semibold">
                {startup.industry}
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
  <h3 className="text-indigo-300 text-sm">Founder</h3>

  <p className="text-xl font-semibold">
    {startup.founderName || startup.founderEmail || "Unknown Founder"}
  </p>
</div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <h3 className="text-indigo-300 text-sm">Team Size Needed</h3>
              <p className="text-xl font-semibold">
                {startup.team_size || "120"}
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <h3 className="text-indigo-300 text-sm">Status</h3>
              <p className="text-xl font-semibold capitalize">
                {startup.status}
              </p>
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <h3 className="text-indigo-300 text-sm">Location</h3>
              <p className="text-xl font-semibold">
                {startup.location || "Remote"}
              </p>
            </div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <h3 className="text-indigo-300 text-sm">Created At</h3>
              <p className="text-xl font-semibold capitalize">
                {new Date(startup.createdAt).toLocaleDateString()}
              </p>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-3">
              About Startup
            </h2>

            <p className="text-gray-300 leading-relaxed">
              {startup.description}
            </p>
          </div>

          {/* SKILLS / TAGS */}
          {startup.skills && (
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-xl font-bold mb-3">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {startup.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

 

        </div>
      </div>
    </div>
  );
};

export default StartupDetails;