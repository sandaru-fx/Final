import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Reset password for:", email);
    setSubmitted(true);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-solid border-border dark:border-[#3e342a] bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center gap-3 text-text-main dark:text-white hover:opacity-80 transition-opacity" to="/">
            <div className="size-8 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">PawMate</h2>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="#">About Us</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="#">Safety</Link>
          </nav>
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link className="hidden sm:block text-sm font-bold text-text-main dark:text-white hover:text-primary transition-colors" to="/register">Sign Up</Link>
            <Link to="/login" className="flex items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-primary hover:bg-primary-hover text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-lg shadow-primary/20">
              <span className="truncate">Log In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-10">
        {/* Center Card Container */}
        <div className="w-full max-w-[1000px] bg-surface-light dark:bg-surface-dark rounded-2xl md:rounded-3xl shadow-2xl shadow-black/5 dark:shadow-black/20 overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-border dark:border-[#3e342a] transition-all duration-300">
          
          {/* Illustration Side (Left) */}
          <div className="relative w-full md:w-5/12 lg:w-1/2 bg-[#faeddd] dark:bg-[#3d2e22] flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden group">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            {/* Main Illustration */}
            <div 
              className="relative z-10 w-full aspect-square max-w-[320px] bg-center bg-contain bg-no-repeat transition-transform duration-500 hover:scale-105 rounded-3xl" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyZtk0_yVXJZTUQO-K5D68SywMd3-1p6c7bo2ayF5wle-SeSzovglzwvPfDrl8j_XJ2t7xjAtF8-1Ed8JnlhxuRIoxougb4rqIkrS_hM11whblNhhViKmOxJl1129KuYU6LgnF1xwPuffLNuJTW1d2d8Eznnu-QtVk5p5B-F_NrxP_HBsEltEF54yaYY3IBlZTlOQIC9Y7wYghbZ8MCZpyeiK_eOIBD8Ui9XkDSZ5xIKSLqCiHLd2oLKVSV-f9l-aEqm2U1YsGVOA')" }}
            >
            </div>
            <div className="relative z-10 mt-8 text-center hidden md:block">
              <p className="text-lg font-bold text-[#1b140d] dark:text-[#fcfaf8]">Lost your way?</p>
              <p className="text-sm text-[#9a734c] dark:text-[#d6c2b0] mt-2">We'll help you fetch your password in no time.</p>
            </div>
          </div>

          {/* Form Side (Right) */}
          <div className="w-full md:w-7/12 lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-light dark:bg-surface-dark relative">
            {/* Back Link (Mobile Only) */}
            <Link className="md:hidden flex items-center gap-2 text-text-muted hover:text-primary mb-6 text-sm font-medium transition-colors w-fit" to="/login">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Login
            </Link>

            {submitted ? (
              <div className="flex flex-col items-center text-center">
                <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">check_mail</span>
                </div>
                <h1 className="text-3xl font-black text-text-main dark:text-white mb-3">Check your inbox</h1>
                <p className="text-text-muted mb-8">
                  We sent a password reset link to <span className="font-bold text-text-main dark:text-white">{email}</span>. Please check your email.
                </p>
                <Link to="/login" className="w-full rounded-xl h-12 bg-primary hover:bg-primary-hover text-white text-base font-bold flex items-center justify-center shadow-lg shadow-primary/25 transition-all">
                  Return to Log In
                </Link>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <span className="material-symbols-outlined text-3xl">lock_reset</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-text-main dark:text-white leading-tight tracking-[-0.02em] mb-3">Forgot password?</h1>
                  <p className="text-text-muted text-base leading-relaxed">
                    Don't worry, it happens to the best of us. Enter the email associated with your account below.
                  </p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-text-main dark:text-white ml-1" htmlFor="email">Email Address</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted/50 group-focus-within/input:text-primary transition-colors">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <input 
                        id="email" 
                        type="email" 
                        required 
                        placeholder="cooper@pawmate.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-border dark:border-[#3e342a] bg-background-light dark:bg-background-dark text-text-main dark:text-white h-14 pl-12 pr-4 placeholder:text-text-muted/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 outline-none text-base"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl h-12 bg-primary hover:bg-primary-hover text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform active:scale-[0.98]">
                    <span className="relative z-10 flex items-center gap-2">
                      Send Reset Link
                      <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                  </button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 flex flex-col gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-px w-12 bg-border dark:border-[#3e342a] bg-gray-200 dark:bg-gray-700"></span>
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Or</span>
                    <span className="h-px w-12 bg-border dark:border-[#3e342a] bg-gray-200 dark:bg-gray-700"></span>
                  </div>
                  <Link className="inline-flex items-center justify-center gap-2 text-sm font-bold text-text-main dark:text-white hover:text-primary transition-colors py-2" to="/login">
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Log In
                  </Link>
                </div>

                {/* Trust Message */}
                <div className="mt-auto pt-8 flex items-center justify-center gap-2 text-xs text-text-muted opacity-80">
                  <span className="material-symbols-outlined text-sm text-green-500">verified_user</span>
                  <span>Secure & Encrypted Verification</span>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-text-muted">
          © 2024 PawMate Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassword;