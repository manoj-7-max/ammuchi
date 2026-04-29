import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simplified logic for demo
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amuchi-darkbrown px-4">
      <div className="absolute top-8 left-8">
        <button 
          onClick={() => navigate('/')}
          className="text-amuchi-beige flex items-center gap-2 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Site
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="bg-amuchi-green w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="text-white h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-amuchi-darkbrown">Admin Access</h1>
          <p className="text-gray-400 mt-2">Sign in to manage your store</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-2 uppercase tracking-wider">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-amuchi-green transition-all border border-transparent focus:bg-white focus:border-amuchi-green"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-2 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-amuchi-green transition-all border border-transparent focus:bg-white focus:border-amuchi-green"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-amuchi-green text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-amuchi-darkgreen transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            <LogIn className="h-5 w-5" />
            Login Dashboard
          </button>
        </form>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          Amuchi Organic Admin Portal v1.0
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
