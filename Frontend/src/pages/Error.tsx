import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">Oops!</h1>
      <p className="mt-4 text-lg leading-6 text-gray-900">We can't seem to find the page you're looking for.</p>
      {/* <p className="mt-1 text-md text-gray-600">Error code: 404</p> */}
      <Link to="/" className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow">
        Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;
