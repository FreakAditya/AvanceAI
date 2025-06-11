import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Positions from './pages/dashboard/Positions';
import Orders from './pages/dashboard/Orders';
import BasketOrders from './pages/dashboard/BasketOrders';
import Strategy from './pages/dashboard/Strategy';
import Reports from './pages/dashboard/Reports';
import AuthRequired from './components/auth/AuthRequired';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <AuthRequired>
              <DashboardLayout />
            </AuthRequired>
          }>
            <Route index element={<Dashboard />} />
            <Route path="paper-trading">
              <Route path="positions" element={<Positions />} />
              <Route path="orders" element={<Orders />} />
              <Route path="basket-orders" element={<BasketOrders />} />
              <Route index element={<Navigate to="positions" replace />} />
            </Route>
            <Route path="charts" element={<Strategy />} />
            <Route path="strategy" element={<Strategy />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;