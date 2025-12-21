import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    // Adjust paths to check if they match the user routes structure
    const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && <Navbar />}
            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    );
};

export default UserLayout;
