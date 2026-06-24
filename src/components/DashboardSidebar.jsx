import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-indigo-600 mb-8">
        StartupForge
      </h2>

      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="px-4 py-3 rounded-xl hover:bg-indigo-50"
        >
          Dashboard
        </Link>

        <Link
          to="/founder-dashboard"
          className="px-4 py-3 rounded-xl hover:bg-indigo-50"
        >
          Founder Dashboard
        </Link>

        <Link
          to="/browse-startups"
          className="px-4 py-3 rounded-xl hover:bg-indigo-50"
        >
          Browse Startups
        </Link>

        <Link
          to="/browse-opportunities"
          className="px-4 py-3 rounded-xl hover:bg-indigo-50"
        >
          Opportunities
        </Link>

        <Link
          to="/my-applications"
          className="px-4 py-3 rounded-xl hover:bg-indigo-50"
        >
          My Applications
        </Link>

        <Link
          to="/profile"
          className="px-4 py-3 rounded-xl hover:bg-indigo-50"
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;