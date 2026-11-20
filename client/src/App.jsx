import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ToastProvider } from './components/ui/Toast';

import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedAdminRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? <AdminDashboardPage /> : <Navigate to="/admin/login" replace />;
};

const AdminLoginRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLoginPage />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PortfolioProvider>
          <ToastProvider>
            <Routes>
              
              <Route path="/" element={<HomePage />} />

              
              <Route path="/admin" element={<ProtectedAdminRoute />} />
              <Route path="/admin/login" element={<AdminLoginRoute />} />

              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ToastProvider>
        </PortfolioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
