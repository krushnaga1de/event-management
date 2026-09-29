import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, role, adminSecret);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register for CampusEvents</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
              placeholder="Create a password (min 6 chars)"
              minLength={6}
            />
          </div>

          {role === 'admin' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Admin Secret Code</label>
              <input
                type="password"
                required
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Enter admin secret code"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
