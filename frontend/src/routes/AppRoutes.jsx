import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../views/login/Login';
import Signup from '../views/signup/Signup';
import EmailVerification from '../views/email-verification/EmailVerification';
import { useAuthStore } from '../store/useAuthStore';
import Dashboard from '../views/home/Dashboard';
import ForgotPassword from '../views/forgot-password/ForgotPassword';
import ResetPassword from '../views/reset-password/ResetPassword';

const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user.isVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/login"
                element={
                    <RedirectAuthenticatedUser>
                        <Login />
                    </RedirectAuthenticatedUser>
                }
            />
            <Route
                path="/signup"
                element={
                    <RedirectAuthenticatedUser>
                        <Signup />
                    </RedirectAuthenticatedUser>
                }
            />
            <Route path="/verify-email" element={<EmailVerification />} />
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route
                path="/forgot-password"
                element={
                    <RedirectAuthenticatedUser>
                        <ForgotPassword />
                    </RedirectAuthenticatedUser>
                }
            />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
    );
};

export default AppRoutes;
