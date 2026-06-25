import { Link, useNavigate } from "react-router-dom";import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
const { user, dbUser, logoutUser } = useAuth();
const [sidebarOpen, setSidebarOpen] = useState(false);
const navigate = useNavigate();
const handleLogout = async () => {
  try {
    await logoutUser();

    setSidebarOpen(false);

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

return (
<>
{/* Overlay */}
{sidebarOpen && (
<div
className="fixed inset-0 bg-black/50 z-40"
onClick={() => setSidebarOpen(false)}
/>
)}


  {/* Sidebar */}
  <div
    className={`
      fixed top-0 left-0 h-full w-72 z-50
      bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950
      text-white shadow-2xl
      transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >
    {/* Header */}
    <div className="flex items-center justify-between p-5 border-b border-white/10">
      <h2 className="text-xl font-bold">
        StartupForge
      </h2>

      <button
        onClick={() => setSidebarOpen(false)}
        className="text-2xl hover:text-red-400"
      >
        <HiX />
      </button>
    </div>

    {/* User Info */}
    {user && (
      <div className="p-5 border-b border-white/10">
        <p className="font-semibold">
          {dbUser?.name}
        </p>

        <p className="text-xs text-gray-400">
          {dbUser?.email}
        </p>

        <div className="mt-2 flex items-center gap-2">
          {dbUser?.isPremiumFounder && (
            <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
              👑 PRO
            </span>
          )}

          <span className="text-xs capitalize text-gray-300">
            {dbUser?.role}
          </span>
        </div>
      </div>
    )}

    {/* Navigation */}
    <div className="flex flex-col p-5 gap-3">

      <Link
        to="/"
        onClick={() => setSidebarOpen(false)}
        className="px-4 py-3 rounded-xl hover:bg-white/10 transition"
      >
        🏠 Home
      </Link>

      <Link
        to="/browse-startups"
        onClick={() => setSidebarOpen(false)}
        className="px-4 py-3 rounded-xl hover:bg-white/10 transition"
      >
        🚀 Startups
      </Link>

      <Link
        to="/browse-opportunities"
        onClick={() => setSidebarOpen(false)}
        className="px-4 py-3 rounded-xl hover:bg-white/10 transition"
      >
        💼 Opportunities
      </Link>

      {user && (
        <Link
          to={
            dbUser?.role === "founder"
              ? "/founder-applications"
              : "/my-applications"
          }
          onClick={() => setSidebarOpen(false)}
          className="px-4 py-3 rounded-xl hover:bg-white/10 transition"
        >
          📄 Applications
        </Link>
      )}

      {!user ? (
        <>
          <Link
            to="/login"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            🔑 Login
          </Link>

          <Link
            to="/register"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-center"
          >
            Get Started
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            👤 Profile
          </Link>

          <Link
            to={
              dbUser?.role === "admin"
                ? "/admin-dashboard"
                : dbUser?.role === "founder"
                ? "/founder-dashboard"
                : "/collaborator-dashboard"
            }
            onClick={() => setSidebarOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-white/10 transition"
          >
            📊 Dashboard
          </Link>

<button
  onClick={handleLogout}
  className="mt-6 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
>
  Logout
</button>
        </>
      )}
    </div>
  </div>

  {/* Navbar */}
  <nav className="sticky top-0 z-30 border-b bg-white/70 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => setSidebarOpen(true)}
          className="text-3xl text-slate-700 hover:text-indigo-600"
        >
          <HiMenuAlt3 />
        </button>

        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 tracking-tight"
        >
          StartupForge
        </Link>

      </div>

      {/* Desktop Links */}
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
          <Link
            className="hover:text-indigo-600"
            to={
              dbUser?.role === "founder"
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

              <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                {dbUser?.isPremiumFounder && (
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold">
                    👑 PRO
                  </span>
                )}

                {dbUser?.role}
              </p>
            </div>

            <Link
              to="/profile"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Profile
            </Link>

            <Link
              to={
                dbUser?.role === "admin"
                  ? "/admin-dashboard"
                  : dbUser?.role === "founder"
                  ? "/founder-dashboard"
                  : "/collaborator-dashboard"
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Dashboard
            </Link>

<button
  onClick={handleLogout}
  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
>
  Logout
</button>
          </>
        )}
      </div>
    </div>
  </nav>
</>


);
};

export default Navbar;
