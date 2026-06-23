import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, dbUser, logoutUser } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight"
        >
          StartupForge
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link className="hover:text-indigo-600" to="/">
            Home
          </Link>

          <Link className="hover:text-indigo-600" to="/browse-startups">
            Startups
          </Link>

          <Link className="hover:text-indigo-600" to="/browse-opportunities">
            Opportunities
          </Link>

          {user && (
            <Link className="hover:text-indigo-600"
                to={
                  dbUser?.role === "admin"
                    ? "/my-applications"
                    :dbUser?.role === "founder"
                    ? "/founder-applications"
                    : "/my-applications"
                }
                
              >
                Applications
              </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                Login
              </Link>
              

              <Link
                to="/register"
                className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="text-right">
                <p className="font-medium text-sm">
                  {dbUser?.name || user?.displayName || "User"}
                </p>

                <p className="text-xs text-gray-500 capitalize">
                  {dbUser?.role}
                </p>
              </div>

              
              <Link
                to={
                  dbUser?.role === "admin"
                    ? "/profile"
                    :dbUser?.role === "founder"
                    ? "/profile"
                    : "/profile"
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Profile
              </Link>

              <Link
                to={
                  dbUser?.role === "admin"
                    ? "/admin-dashboard"
                    :dbUser?.role === "founder"
                    ? "/founder-dashboard"
                    : "/collaborator-dashboard"
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Dashboard
              </Link>

              <button
                onClick={logoutUser}
                to="/login"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;