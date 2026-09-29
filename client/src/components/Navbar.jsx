import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-xl tracking-wider">
            <Link to={`/${user.role}/dashboard`}>CampusEvents</Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-sm font-medium">
              <span className="opacity-75">Welcome, </span>
              {user.name} 
              <span className="ml-2 bg-indigo-500 px-2 py-1 rounded text-xs uppercase tracking-widest">{user.role}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 hover:bg-indigo-500 px-3 py-2 rounded transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
