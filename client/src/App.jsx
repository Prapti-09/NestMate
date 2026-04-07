import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyDetails from './pages/PropertyDetails';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import CompatibilityForm from './pages/CompatibilityForm';
import EmployeePanel from './pages/EmployeePanel';
import InstitutePanel from './pages/InstitutePanel';
import PaymentPage from './pages/PaymentPage';

// Protected Route Component for Role-Based Access Control
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, authenticated } = useAuth();
  
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirectPath = user.role === 'student' ? '/dashboard' : 
                         user.role === 'employee' ? '/employee' : '/admin';
    return <Navigate to={redirectPath} />;
  }

  return children;
};

const App = () => {
  const { role } = useAuth();

  return (
    <Router>
      <div className="app-main">
        <Navbar role={role} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/hostel/:id" element={<PropertyDetails />} />

          {/* Student Protected Routes */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute allowedRoles={['student']}><UserDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/compatibility" 
            element={<ProtectedRoute allowedRoles={['student']}><CompatibilityForm /></ProtectedRoute>} 
          />
          <Route 
            path="/payment" 
            element={<ProtectedRoute allowedRoles={['student']}><PaymentPage /></ProtectedRoute>} 
          />

          {/* Employee/Staff Protected Routes */}
          <Route 
            path="/employee" 
            element={<ProtectedRoute allowedRoles={['employee']}><EmployeePanel /></ProtectedRoute>} 
          />

          {/* Admin Protected Routes */}
          <Route 
            path="/admin" 
            element={<ProtectedRoute allowedRoles={['admin']}><InstitutePanel /></ProtectedRoute>} 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
