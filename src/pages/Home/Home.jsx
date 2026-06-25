import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
FaRocket,
FaUsers,
FaHandshake,
FaChartLine,
FaLightbulb,
FaGlobe,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../services/api";
const Home = () => {
  const [startups, setStartups] = useState([]);
const [opportunities, setOpportunities] = useState([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const startupRes = await api.get("/startups");
      const oppRes = await api.get("/opportunities");

      setStartups(
        startupRes.data
          .filter((s) => s.status === "Approved" || s.status === "approved")
          .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
          .slice(0, 3)
      );

      setOpportunities(
        oppRes.data.opportunities .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    }
  };

  loadData();
}, []);
return ( <div>

  {/* HERO SECTION */}
  <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white">

    <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-20"></div>
    <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

    <div className="max-w-7xl mx-auto px-6 py-28 text-center relative">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold"
      >
        Build Your Startup Dream Team
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-3xl mx-auto text-xl text-white/90"
      >
        StartupForge connects founders with talented collaborators,
        helping innovative ideas become successful startups.
      </motion.p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          to="/browse-opportunities"
          className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
        >
          Explore Opportunities
        </Link>

        <Link
          to="/browse-startups"
          className="border border-white px-8 py-4 rounded-2xl hover:bg-white/10 transition"
        >
          Browse Startups
        </Link>

      </div>

    </div>
  </section>

  {/* FEATURED STARTUPS */}
  <section className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white py-20">
    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Startups
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {startups.map((startup) => (
          <motion.div
  key={startup._id}
  whileHover={{ y: -10 }}
  className="bg-white rounded-3xl shadow-xl border border-cyan-200 p-6"
>
  <img
    src={startup.logo}
    alt={startup.startup_name}
    className="h-48 w-full object-cover rounded-2xl"
  />

  <h3 className="font-bold text-2xl text-indigo-700 mt-4">
    {startup.startup_name}
  </h3>

 

  <p className="text-gray-600">
    Industry: {startup.industry}
  </p>
  <p className="text-gray-600">
             Created At:   {new Date(startup.createdAt).toLocaleDateString()}
  </p>


  <Link
    to={`/startup/${startup._id}`}
    className="inline-block mt-5 bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"
  >
    View Startup
  </Link>
</motion.div>
        ))}

      </div>
      <div className="text-center mt-10">
  <Link
    to="/browse-startups"
    className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
  >
    View All Startups →
  </Link>
</div>

    </div>

  </section>

  {/* FEATURED OPPORTUNITIES */}
  <section className="bg-gradient-to-r from-slate-800 via-indigo-800 to-purple-800 text-white py-20">
    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Opportunities
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

{opportunities.map((opportunity) => (
          <motion.div
  key={opportunity._id}
  whileHover={{ scale: 1.03 }}
  className="bg-white rounded-3xl shadow-xl p-6 border border-purple-200"
>
  <h3 className="text-2xl font-bold text-purple-700">
    {opportunity.role_title}
  </h3>

  <p className="text-gray-500 mt-2">
    {opportunity.industry}
  </p>

  <div className="flex flex-wrap gap-2 mt-4">
    {opportunity.required_skills?.map((skill, index) => (
      <span
        key={index}
        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs"
      >
        {skill}
      </span>
    ))}
  </div>

  <p className="mt-4 text-gray-500">
    Deadline: {opportunity.deadline}
  </p>

  <Link
    to={`/opportunities/${opportunity._id}`}
    className="inline-block mt-5 bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700"
  >
    Apply Now
  </Link>
</motion.div>
        ))}

      </div>
      <div className="text-center mt-10">
  <Link
    to="/browse-opportunities"
    className="inline-block bg-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-lg"
  >
    View All Opportunities →
  </Link>
</div>

    </div>

  </section>

  {/* ANIMATED WHY JOIN SECTION */}
<section className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-200 py-20">
    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Why Join StartupForge?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <motion.div
          whileHover={{ rotate: 2, scale: 1.05 }}
          className="bg-white p-8 rounded-3xl shadow-xl text-center"
        >
          <FaRocket className="mx-auto text-5xl text-indigo-600 mb-4" />
          <h3 className="font-bold text-xl">
            Launch Faster
          </h3>
          <p className="mt-3 text-gray-600">
            Build your startup with the right people.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ rotate: -2, scale: 1.05 }}
          className="bg-white p-8 rounded-3xl shadow-xl text-center"
        >
          <FaUsers className="mx-auto text-5xl text-pink-600 mb-4" />
          <h3 className="font-bold text-xl">
            Find Talent
          </h3>
          <p className="mt-3 text-gray-600">
            Discover skilled collaborators worldwide.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ rotate: 2, scale: 1.05 }}
          className="bg-white p-8 rounded-3xl shadow-xl text-center"
        >
          <FaHandshake className="mx-auto text-5xl text-green-600 mb-4" />
          <h3 className="font-bold text-xl">
            Collaborate
          </h3>
          <p className="mt-3 text-gray-600">
            Work together and create something amazing.
          </p>
        </motion.div>

      </div>

    </div>

  </section>

  {/* STARTUP STATISTICS */}
  <section className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white py-20">

    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        StartupForge Statistics
      </h2>

      <div className="grid md:grid-cols-4 gap-6 text-center">

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <FaUsers className="mx-auto text-4xl mb-4" />
          <h3 className="text-5xl font-bold">500+</h3>
          <p className="mt-2">Users</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <FaLightbulb className="mx-auto text-4xl mb-4" />
          <h3 className="text-5xl font-bold">150+</h3>
          <p className="mt-2">Startups</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <FaChartLine className="mx-auto text-4xl mb-4" />
          <h3 className="text-5xl font-bold">300+</h3>
          <p className="mt-2">Opportunities</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <FaGlobe className="mx-auto text-4xl mb-4" />
          <h3 className="text-5xl font-bold">50+</h3>
          <p className="mt-2">Countries</p>
        </div>

      </div>

    </div>

  </section>

  {/* TESTIMONIALS */}
  <section className="bg-gradient-to-r from-slate-800 via-indigo-800 to-purple-800 text-white py-20">

    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        Success Stories
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white p-8 rounded-3xl shadow-xl"
          >
            <p className="italic text-gray-600">
              "StartupForge helped us find incredible team members and launch successfully."
            </p>

            <h4 className="font-bold mt-5 text-indigo-700">
              Founder
            </h4>
          </div>
        ))}

      </div>

    </div>

  </section>

  {/* FINAL CTA */}
  <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 text-center">

    <h2 className="text-5xl font-bold">
      Ready To Build Something Amazing?
    </h2>

    <p className="mt-5 text-xl">
      Join StartupForge today and connect with innovators worldwide.
    </p>

    <Link
      to="/register"
      className="inline-block mt-8 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold hover:scale-110 transition"
    >
      Get Started Today
    </Link>

  </section>

</div>
);
};

export default Home;