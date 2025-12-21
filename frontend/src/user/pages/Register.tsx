import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate backend register
      login('fake-jwt-token', {
        _id: 'new-user',
        name: 'New User',
        email: 'new@example.com',
        role: UserRole.USER,
        profileImage: 'https://picsum.photos/200'
      });
      navigate('/');
    };

  return (
    <div className="relative flex min-h-screen w-full flex-col lg:flex-row bg-background-light dark:bg-background-dark text-text-main dark:text-white">
      <div className="relative hidden h-full w-full flex-1 bg-cover bg-center lg:flex lg:h-auto lg:w-1/2" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTKkG5sGMtAgAzws3lEb7ozU2rqFGJQx7b10ve3M1ib2dkqV_q1q-SZduHOAkJWt3rFvsv-BC6lrG0wmdvIw9jZTDjHhEoRxRrOq41cI5dy6Kou6pERHLVcCncrrF1bWHjzJaDK-bUx9Doly6vbd4awYDDiz5NCnMExvh8tUTdT-SYFgGxOXQ6XTU_-7nkhTZVSCi6Tad_AbMWz1hEN2zoZawNdRQ6cTZRbFKP6xOlChoENyVDRaYl4Mlc8ZASsrro32Z5GvEUF_g")'}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">Find the perfect match for your furry friend.</h2>
            <p className="text-white/90 text-lg">Join thousands of dog owners who trust PawMate for safe, fun, and verified playdates.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 xl:px-24">
        <Link to="/" className="mb-10 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">
            <span className="material-symbols-outlined">pets</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">PawMate</h1>
        </Link>

        <div className="mx-auto w-full max-w-[480px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Join the Pack! 🐾</h2>
            <p className="mt-2 text-text-muted">Create an account to start your journey.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-surface-dark py-3 px-4 text-sm font-bold hover:bg-gray-50 transition-colors">
              <img alt="Google" className="h-5 w-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCirvJKdu7uXOu_EsxAGmsJrpXnD0IJYLB15roIDdFGyIxgGBbmyr9KVMtaqZOeVHNhv_iESHlAt2bWqldx1ceuvxyzwEGbigCmswSJfMxdp9y0o8yqRRG10kz1VlF0c2UFZxxmav0_bH_IFZqwMyHdQ9P6vtDDkdzMmJgNIrjZvou_2b-YdL9O79D1VsCGjmsPxdtJ_LTj9kqMFgwJQ1iDbOAH_n2ZPbtPQy9M-RoOX_6JttFhNZgaluD6n2UwYfcgddZSXXbhN7E" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-surface-dark py-3 px-4 text-sm font-bold hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-[20px]">star</span>
              <span>Apple</span>
            </button>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Full Name</label>
              <div className="relative">
                <input className="w-full rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-surface-dark p-4 pl-12 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm outline-none" placeholder="e.g. Charlie Brown" type="text" />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">person</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Email Address</label>
              <div className="relative">
                <input className="w-full rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-surface-dark p-4 pl-12 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm outline-none" placeholder="name@example.com" type="email" />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">mail</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Password</label>
              <div className="relative">
                <input className="w-full rounded-xl border border-border dark:border-gray-700 bg-white dark:bg-surface-dark p-4 pl-12 pr-12 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm outline-none" placeholder="Create a password" type="password" />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">lock</span>
              </div>
            </div>

            <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all active:scale-[0.98]">
               Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-muted">
            Already have an account? 
            <Link to="/login" className="font-bold text-primary hover:underline ml-1">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;