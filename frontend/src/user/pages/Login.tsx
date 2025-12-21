import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate backend login
    login('fake-jwt-token', {
      _id: '1',
      name: 'Sarah',
      email: email || 'sarah@example.com',
      role: UserRole.USER,
      profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhF6z_7qzkCf4cmonPHxgMTqadbnZm55INMLJB9orXHw390iWszh6LvKRwdvEU6DlMgN9jE18mGqEna9LB3L1masYr1n9gpe0t5bRkBIYmBlI0WzlhfsqiRXk0IpK4b5mfRFeV0f1BGp-FBeBMAES8t1Wy2gR9lL5XM_BRpbznJ823y-H3ZeL_O1S-XnazaOn33miGIMmm-r7JIxCyo5BJhR9w42GHuy5_N9ZfA8bxhZk8-B6O_P3oP-iiCgDNPmcg6xuCCOZMVJo'
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background-light dark:bg-background-dark">
      {/* Left Side: Hero Image */}
      <div className="relative hidden lg:flex w-full lg:w-1/2 bg-surface-light dark:bg-surface-dark items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCA2_IQM4-iJssyQhbwjmeJKkJ6C1MCNf4M9u4-qngRo0ZbXjN5EhR7hM3Nb92fC9FWjF2zhN5wf4tijaTVTHl1sx-27Af-ALugwzqc4UlaAvMVAKXn124UHihgoaatEobfOhoe7EAqIySLuWf4_jPB1ogk1sSFNxjLRc8a_DZGf002kNT9Hq_b0d66cQRCsCuKvCmyruFTrgQV1zf1k8l4S-qgvLvRjiPBdS6yteQpQPuKiGg17mzYJJ6db3F1l6b0ULrhEuZaVVk")'}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">verified</span>
            <p className="font-bold text-lg">Verified Community</p>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-2">Join thousands of happy pet owners.</h2>
          <p className="text-white/90 text-lg">Find companionship, playdates, and more for your furry best friend.</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-[440px] flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-3 mb-2">
            <div className="size-10 bg-primary/20 dark:bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">pets</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-text-main dark:text-white">PawMate</span>
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight text-text-main dark:text-white">
              Welcome Back! 🐾
            </h1>
            <p className="text-text-muted dark:text-gray-400 text-base font-medium">
              Enter your details to access your account.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-14 rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-dark/80 transition-colors">
              <img alt="Google" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLXkJzuYmNkGwC-PTQewXbcxJZhiI4s5IKbw9OP0khOQuh0VoH2Z4puWeoTEjhnDvHVtazn0kB-ZtRHxMzSsPITj8DglRFy0NUcFz22mS1NZDKu8sDDL_1MRnU2InuxMJU23WLa4G2bNzkknpRsQBrqAPG4RPKYEEblj4qOGJuCLPjP_vkTxaXPTo-CCdWt7f4DqOFlNqXNEQuvSvfhgu4rRTKEfLAd8lmHWo5Jeau3XDo3-6i1hPFj6bTipgZn3otPYtstqHHZbg" />
              <span className="text-sm font-bold text-text-main dark:text-white">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 h-14 rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-surface-dark/80 transition-colors">
              <span className="material-symbols-outlined text-2xl">star</span>
              <span className="text-sm font-bold text-text-main dark:text-white">Apple</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border dark:border-gray-700"></div>
            <span className="flex-shrink-0 mx-4 text-sm text-text-muted dark:text-gray-500 font-medium">Or log in with email</span>
            <div className="flex-grow border-t border-border dark:border-gray-700"></div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <label className="flex flex-col gap-2">
              <span className="text-text-main dark:text-gray-200 text-sm font-bold">Email Address</span>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 pl-4 pr-10 rounded-xl bg-white dark:bg-surface-dark border border-border dark:border-gray-700 text-text-main dark:text-white placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base" 
                  placeholder="user@example.com" 
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-text-main dark:text-gray-200 text-sm font-bold">Password</span>
              <div className="relative group">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 pl-4 pr-10 rounded-xl bg-white dark:bg-surface-dark border border-border dark:border-gray-700 text-text-main dark:text-white placeholder:text-text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base" 
                  placeholder="•••••••••" 
                />
              </div>
            </label>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">Forgot Password?</Link>
            </div>

            <button type="submit" className="mt-2 w-full h-14 bg-primary hover:bg-primary-hover text-[#1b140d] font-bold text-base rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
              <span>Log In</span>
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-text-muted dark:text-gray-400 text-base">
              Don't have an account? 
              <Link to="/register" className="text-primary font-bold hover:underline ml-1">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;