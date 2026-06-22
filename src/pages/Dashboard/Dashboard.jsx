import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { dbUser } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        Collaborator Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          to="/browse-opportunities"
          className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Browse Opportunities
          </h2>
          <p className="text-gray-500">
            Explore startup opportunities and apply.
          </p>
        </Link>

        <Link
          to="/my-applications"
          className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            My Applications
          </h2>
          <p className="text-gray-500">
            Track all your submitted applications.
          </p>
        </Link>

        <Link
          to="/profile"
          className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            Profile
          </h2>
          <p className="text-gray-500">
            Update your name, image, skills and bio.
          </p>
        </Link>

      </div>

      <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
        <h3 className="font-semibold text-lg">
          Welcome, {dbUser?.name || "Collaborator"} 👋
        </h3>

        <p className="text-gray-600 mt-2">
          Complete your profile to improve your chances of being selected by founders.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;