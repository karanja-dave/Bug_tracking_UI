// This component handles non existing routes 

import { Link } from "react-router"

export const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 max-w-md text-center">
        Sorry, we can’t find the page you’re looking for.  
        It might have been moved, deleted, or never existed.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};
