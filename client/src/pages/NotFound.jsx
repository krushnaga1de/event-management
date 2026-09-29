import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/login" 
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;
