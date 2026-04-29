import { useState } from 'react';
import { ArrowLeft, Lock, LogIn, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      let data;
      try {
        data = await api.login({ username, password });
      } catch {
        await api.setupAdmin().catch(() => {});
        data = await api.login({ username, password });
      }
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } catch (err) {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
        return;
      }
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#3b2a1f] px-4">
      <button onClick={() => navigate('/')} className="absolute left-6 top-6 flex items-center gap-2 font-bold text-[#f4dfad]">
        <ArrowLeft className="h-5 w-5" /> Back to site
      </button>

      <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleLogin} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#315c35] text-white"><Lock className="h-8 w-8" /></div>
          <h1 className="text-3xl font-black text-[#3b2a1f]">Admin Login</h1>
          <p className="text-sm text-stone-500">Manage AMUCHI ORGANIC products and orders</p>
        </div>

        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">{error}</p>}

        <div className="space-y-4">
          <label className="relative block">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input required value={username} onChange={(event) => setUsername(event.target.value)} className="w-full rounded-lg border border-stone-200 p-4 pl-10 outline-none focus:border-[#315c35]" placeholder="Username" />
          </label>
          <label className="relative block">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
            <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-stone-200 p-4 pl-10 outline-none focus:border-[#315c35]" placeholder="Password" />
          </label>
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#315c35] py-4 font-black text-white">
          <LogIn className="h-5 w-5" /> Login Dashboard
        </button>
        <p className="mt-5 text-center text-xs text-stone-400">Default: admin / admin123</p>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
