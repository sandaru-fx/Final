import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      localStorage.setItem('pawmate_token', 'mock_token_123');
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#191022] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7f13ec]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative z-10 border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
           <div className="size-20 rounded-full bg-[#7f13ec] flex items-center justify-center shadow-[0_0_20px_rgba(127,19,236,0.5)] mb-4">
             <span className="material-symbols-outlined text-white text-[40px]">pets</span>
           </div>
           <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
           <p className="text-gray-400 text-sm">Sign in to manage the pack.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">mail</span>
              <input 
                type="email" 
                defaultValue="admin@pawmate.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#7f13ec] focus:ring-1 focus:ring-[#7f13ec] transition-all"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="space-y-1">
             <div className="flex justify-between items-center ml-1">
               <label className="text-sm font-medium text-gray-300">Password</label>
               <a href="#" className="text-xs text-[#7f13ec] hover:underline">Forgot password?</a>
             </div>
             <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">lock</span>
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#7f13ec] focus:ring-1 focus:ring-[#7f13ec] transition-all"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full bg-[#7f13ec] hover:bg-[#6d0ecb] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">© 2024 PawMate Inc. Admin Portal</p>
      </div>
    </div>
  );
};

export default Login;
