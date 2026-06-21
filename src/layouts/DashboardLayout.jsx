import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">
        <h2 className="text-xl font-bold text-indigo-600 mb-6">
          StartupForge
        </h2>

        <nav className="flex flex-col gap-3 text-sm">

          <Link className="hover:text-indigo-600" to="/dashboard">
            Dashboard
          </Link>

          <Link className="hover:text-indigo-600" to="/browse-startups">
            Startups
          </Link>

          <Link className="hover:text-indigo-600" to="/browse-opportunities">
            Opportunities
          </Link>

          <Link className="hover:text-indigo-600" to="/my-applications">
            Applications
          </Link>

        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;