import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">

      <div className="text-8xl mb-4">
        🚀
      </div>

      <h1 className="text-5xl font-bold">
        404
      </h1>

      <p className="mt-4 text-gray-300">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-indigo-600 rounded-xl"
      >
        Back Home
      </Link>

    </div>
  );
};

export default ErrorPage;