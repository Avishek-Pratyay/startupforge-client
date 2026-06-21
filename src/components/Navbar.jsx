import { Link } from "react-router-dom";

const Navbar = () => {
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

          <Link className="hover:text-indigo-600" to="/my-applications">
            Applications
          </Link>

          <Link className="hover:text-indigo-600" to="/admin-dashboard">
            Admin
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
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
        </div>

      </div>
    </nav>
  );
};

export default Navbar;