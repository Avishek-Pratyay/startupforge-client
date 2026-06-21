import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="my-4">
        Page Not Found
      </p>

      <Link to="/">
        Back Home
      </Link>

    </div>
  );
};

export default ErrorPage;