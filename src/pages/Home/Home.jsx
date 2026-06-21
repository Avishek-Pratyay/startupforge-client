const Home = () => {
  return (
    <div className="bg-slate-50">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build Your Startup Dream Team
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Connect founders with talented collaborators worldwide and build the next big idea together.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/browse-opportunities"
              className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100"
            >
              Explore Opportunities
            </a>

            <a
              href="/browse-startups"
              className="px-6 py-3 border border-white/40 rounded-xl hover:bg-white/10"
            >
              Browse Startups
            </a>
          </div>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
          <h3 className="font-bold text-lg mb-2">Find Startups</h3>
          <p className="text-gray-600 text-sm">
            Discover innovative startup ideas and growing teams.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
          <h3 className="font-bold text-lg mb-2">Apply Easily</h3>
          <p className="text-gray-600 text-sm">
            One-click applications to opportunities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
          <h3 className="font-bold text-lg mb-2">Build Together</h3>
          <p className="text-gray-600 text-sm">
            Collaborate with founders globally.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;