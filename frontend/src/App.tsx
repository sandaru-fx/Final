import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// User Imports
import { AuthProvider as UserAuthProvider } from './user/context/AuthContext';
import UserLayout from './user/layouts/UserLayout';
import { useAuth as useUserAuth } from './user/context/AuthContext';
import UserHome from './user/pages/Home';
import UserLogin from './user/pages/Login';
import UserRegister from './user/pages/Register';
import UserForgotPassword from './user/pages/ForgotPassword';
import DogProfile from './user/pages/DogProfile';
import CreateDogProfile from './user/pages/CreateDogProfile';
import MatchRequests from './user/pages/MatchRequests';
import Messages from './user/pages/Messages';
import Notifications from './user/pages/Notifications';
import UserReports from './user/pages/Reports';

// Admin Imports
import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/Dashboard';
import AdminUsers from './admin/pages/Users';
import AdminDogs from './admin/pages/Dogs';
import AdminLogin from './admin/pages/Login';
import AdminSettings from './admin/pages/Settings';
import AdminReports from './admin/pages/Reports';

// Protected Route Wrappers
const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useUserAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('pawmate_token');
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }
    return <AdminLayout>{children}</AdminLayout>;
};

const App: React.FC = () => {
    return (
        <UserAuthProvider>
            <HashRouter>
                <Routes>
                    {/* User Routes */}
                    <Route path="/" element={<UserLayout><UserProtectedRoute><UserHome /></UserProtectedRoute></UserLayout>} />
                    <Route path="/login" element={<UserLayout><UserLogin /></UserLayout>} />
                    <Route path="/register" element={<UserLayout><UserRegister /></UserLayout>} />
                    <Route path="/forgot-password" element={<UserLayout><UserForgotPassword /></UserLayout>} />
                    <Route path="/dog/:id" element={<UserLayout><UserProtectedRoute><DogProfile /></UserProtectedRoute></UserLayout>} />
                    <Route path="/create-dog" element={<UserLayout><UserProtectedRoute><CreateDogProfile /></UserProtectedRoute></UserLayout>} />
                    <Route path="/requests" element={<UserLayout><UserProtectedRoute><MatchRequests /></UserProtectedRoute></UserLayout>} />
                    <Route path="/messages" element={<UserLayout><UserProtectedRoute><Messages /></UserProtectedRoute></UserLayout>} />
                    <Route path="/notifications" element={<UserLayout><UserProtectedRoute><Notifications /></UserProtectedRoute></UserLayout>} />
                    <Route path="/reports" element={<UserLayout><UserProtectedRoute><UserReports /></UserProtectedRoute></UserLayout>} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
                    <Route path="/admin/users" element={<AdminProtectedRoute><AdminUsers /></AdminProtectedRoute>} />
                    <Route path="/admin/dogs" element={<AdminProtectedRoute><AdminDogs /></AdminProtectedRoute>} />
                    <Route path="/admin/reports" element={<AdminProtectedRoute><AdminReports /></AdminProtectedRoute>} />
                    <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />

                    {/* Catch All */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </HashRouter>
        </UserAuthProvider>
    );
};

export default App;
