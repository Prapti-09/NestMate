import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, BookOpen, User, Hotel, Plus, Info, LayoutDashboard, LogOut } from 'lucide-react';

// Theme & Auth Context
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ThemeToggle from './components/ThemeToggle';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyDetails from './pages/PropertyDetails';
import UserDashboard from './pages/UserDashboard';
import InstitutePanel from './pages/InstitutePanel';
import EmployeePanel from './pages/EmployeePanel';
import CompatibilityForm from './pages/CompatibilityForm';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="loading-spinner">Loading authentication...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

// Layout Components
const Navbar = () => {
  const { user, logout } = useAuth();
  const role = user?.role || 'guest';
  const isInstitute = role === 'admin' || role === 'employee';

  return (
    <nav className={`navbar ${isInstitute ? 'inst-nav' : 'student-nav'}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <Hotel size={32} color={isInstitute ? '#0f172a' : '#8b5cf6'} />
          <span className={isInstitute ? 'logo-inst' : 'logo-student'}>NestMate</span>
        </Link>
        <div className="nav-links">
          {role === 'student' ? (
            <>
              <Link to="/search">Explore Stays</Link>
              <Link to="/dashboard#bookings">My Bookings</Link>
              <Link to="/dashboard#profile" className="btn btn-outline btn-sm">My Profile</Link>
            </>
          ) : role === 'admin' ? (
            <>
              <Link to="/institute">Authority Dashboard</Link>
              <Link to="/search">Manage Stays</Link>
              <button onClick={logout} className="nav-btn-outline">Logout</button>
            </>
          ) : role === 'employee' ? (
            <>
              <Link to="/employee">Staff taskbar</Link>
              <Link to="/search">Review Listings</Link>
              <button onClick={logout} className="nav-btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/search">Explore</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="nav-btn">Get Started</Link>
            </>
          )}
          <ThemeToggle />
          {user && (
            <button onClick={logout} className="logout-icon-btn" aria-label="Logout">
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
      <style>{`
        .loading-spinner { height: 100vh; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary); }
        .logout-icon-btn { background: none; border: none; color: #ef4444; cursor: pointer; padding: 10px; border-radius: 50%; display: flex; transition: all 0.2s; }
        .logout-icon-btn:hover { background: #fee2e2; transform: scale(1.1); }
        .nav-btn-outline { background: none; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; color: inherit; }
        .inst-nav .nav-btn-outline { border-color: #0f172a; color: #0f172a; }
      `}</style>
    </nav>
  );
};

const Layout = ({ children }) => {
  const { user } = useAuth();
  const role = user?.role || 'student';

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={useLocation().pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col branding">
             <Link to="/" className="logo">
                <Hotel size={24} color="#ffffff" />
                <span className="logo-white">NestMate</span>
             </Link>
             <p>Simplifying student living with smart room allocations and premium services.</p>
          </div>
          <div className="footer-col">
             <h3>Platform</h3>
             <ul>
                <li><Link to="/search">Find Stays</Link></li>
                <li><Link to="/compatibility">Personality Match</Link></li>
                <li><Link to="/dashboard">Bookings</Link></li>
             </ul>
          </div>
          <div className="footer-col">
             <h3>Institute</h3>
             <ul>
                <li><Link to="/institute">Admin Portal</Link></li>
                <li><Link to="/employee">Staff Login</Link></li>
                <li><Link to="/">Support</Link></li>
             </ul>
          </div>
        </div>
        <div className="footer-bottom">
           <p>&copy; 2026 NestMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Student Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/compatibility" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <CompatibilityForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payment" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <PaymentPage />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Staff/Admin Routes */}
              <Route 
                path="/institute/*" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <InstitutePanel />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee" 
                element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployeePanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
