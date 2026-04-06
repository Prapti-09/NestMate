import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, User, ShieldCheck, Briefcase } from 'lucide-react';
import { postRequest } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await postRequest('/login', { email, password });
      
      if (result.error) {
        setError(result.error);
      } else {
        // Success
        login(result); // result contains { id, name, role }
        
        // Redirect based on role
        if (result.role === 'student') navigate('/dashboard');
        else if (result.role === 'employee') navigate('/employee');
        else if (result.role === 'admin') navigate('/institute');
      }
    } catch (err) {
      setError('Connection refused. Is the server running on port 5000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <motion.div 
        className="card auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-header">
           <h1>Welcome Back</h1>
           <p>Log in to manage your student stay and roommate matches.</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
           <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap-auth">
                 <Mail size={20} className="icon" />
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
              </div>
           </div>

           <div className="form-group">
              <div className="label-row">
                 <label>Password</label>
                 <a href="#" className="forgot-link">Forgot?</a>
              </div>
              <div className="input-wrap-auth">
                 <Lock size={20} className="icon" />
                 <input 
                   type="password" 
                   placeholder="Enter password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
              </div>
           </div>

           <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Login to Workspace"}
              {!loading && <ArrowRight size={18} />}
           </button>
        </form>

        <div className="auth-footer">
           <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
        </div>
      </motion.div>

      <style>{`
        .auth-page { display: flex; align-items: center; justify-content: center; min-height: 80vh; padding: 2rem; background: var(--bg-main); }
        .auth-card { padding: 3rem; max-width: 440px; width: 100%; border-radius: 24px; box-shadow: var(--shadow-lg); }
        .auth-header { text-align: center; margin-bottom: 2.5rem; }
        .auth-header h1 { font-size: 2.25rem; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .auth-header p { color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; }
        
        .auth-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.75rem; font-weight: 700; font-size: 0.85rem; color: var(--text-main); }
        .label-row { display: flex; justify-content: space-between; align-items: center; }
        .forgot-link { font-size: 0.8rem; color: var(--primary); text-decoration: none; font-weight: 700; }
        
        .input-wrap-auth { display: flex; align-items: center; gap: 1rem; background: var(--bg-alt); padding: 0.85rem 1.25rem; border-radius: 14px; border: 1px solid var(--border); transition: all 0.2s; }
        .input-wrap-auth:focus-within { border-color: var(--primary); background: var(--bg-card); box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1); }
        .input-wrap-auth input { border: none; outline: none; flex: 1; background: transparent; font-weight: 600; font-size: 0.95rem; color: var(--text-main); }
        .input-wrap-auth .icon { color: var(--text-muted); }

        .auth-btn { width: 100%; padding: 1rem; margin-top: 1rem; font-size: 1rem; }
        
        .error-alert { background: #fef2f2; color: #dc2626; padding: 14px; border-radius: 12px; font-size: 0.85rem; font-weight: 700; text-align: center; margin-bottom: 1.5rem; border: 1px solid #fee2e2; }
        [data-theme='dark'] .error-alert { background: #450a0a; color: #f87171; border-color: #7f1d1d; }

        .auth-footer { margin-top: 2.5rem; text-align: center; font-weight: 600; font-size: 0.9rem; }
        .auth-footer a { color: var(--primary); font-weight: 800; text-decoration: none; margin-left: 5px; }
      `}</style>
    </div>
  );
};

export default LoginPage;
