import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, ShieldCheck, MailPlus, ArrowRight, Building } from 'lucide-react';
import { postRequest } from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    college: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await postRequest('/register', formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        if (result.role === 'employee' && result.verification_status === 'pending') {
            setError('Sent to admin for verification. You can login once approved.');
            return;
        }

        // Success
        login(result); // result contains { id, name, role }
        
        // Redirect based on role
        if (result.role === 'student') navigate('/compatibility'); 
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
    <div className="auth-page signup-page">
      <motion.div 
        className="card auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="auth-header">
           <h1>Start with NestMate</h1>
           <p>Your journey to perfect student living begins here.</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSignup} className="auth-form">
           <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrap-auth">
                 <User size={20} className="icon" />
                 <input 
                   type="text" 
                   placeholder="Enter your name" 
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                 />
              </div>
           </div>

           <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrap-auth">
                 <Mail size={20} className="icon" />
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                 />
              </div>
           </div>

           <div className="form-group">
              <label>Password</label>
              <div className="input-wrap-auth">
                 <Lock size={20} className="icon" />
                 <input 
                   type="password" 
                   placeholder="Create a strong password" 
                   value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                 />
              </div>
           </div>

           <div className="form-group">
              <label>Your Role</label>
              <div className="role-selector">
                 {[
                   { id: 'student', icon: User, label: 'Student' },
                   { id: 'employee', icon: Briefcase, label: 'Employee' },
                   { id: 'admin', icon: ShieldCheck, label: 'Admin' }
                 ].map(r => (
                   <button 
                     key={r.id}
                     type="button"
                     className={`role-choice ${formData.role === r.id ? 'active' : ''}`}
                     onClick={() => setFormData({...formData, role: r.id})}
                   >
                     <r.icon size={20} />
                     <span>{r.label}</span>
                   </button>
                 ))}
              </div>
           </div>

           {formData.role === 'student' && (
              <div className="form-group">
                 <label>College / University</label>
                 <div className="input-wrap-auth">
                    <Building size={20} className="icon" />
                    <input 
                      type="text" 
                      placeholder="e.g. SRM University" 
                      value={formData.college}
                      onChange={(e) => setFormData({...formData, college: e.target.value})}
                    />
                 </div>
              </div>
           )}

           <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? "Joining..." : "Create Account"}
              {!loading && <MailPlus size={18} />}
           </button>
        </form>

        <div className="auth-footer">
           <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </motion.div>

      <style>{`
        .signup-page .auth-card { max-width: 500px; padding: 2.5rem; }
        .role-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 0.5rem; }
        .role-choice { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 12px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-alt); color: var(--text-muted); cursor: pointer; transition: all 0.2s; }
        .role-choice:hover { border-color: var(--primary); color: var(--primary); }
        .role-choice.active { border-color: var(--primary); color: var(--primary); background: var(--bg-card); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1); }
        .role-choice span { font-size: 0.8rem; font-weight: 700; }
        
        .auth-page { display: flex; align-items: center; justify-content: center; min-height: 80vh; padding: 2rem; }
        .auth-card { padding: 3rem; max-width: 440px; width: 100%; border-radius: 24px; }
        .auth-header { text-align: center; margin-bottom: 2.5rem; }
        .auth-header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .auth-header p { color: var(--text-muted); font-size: 0.9rem; }
        
        .auth-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.75rem; font-weight: 700; font-size: 0.85rem; color: #475569; }
        .input-wrap-auth { display: flex; align-items: center; gap: 1rem; background: var(--bg-alt); padding: 0.75rem 1.25rem; border-radius: 14px; border: 1px solid var(--border); transition: all 0.2s; }
        .input-wrap-auth:focus-within { border-color: var(--primary); background: var(--bg-card); box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1); }
        .input-wrap-auth input { border: none; outline: none; flex: 1; background: transparent; font-weight: 500; font-size: 0.95rem; }
        .input-wrap-auth .icon { color: var(--text-muted); }

        .auth-btn { width: 100%; padding: 1rem; margin-top: 1rem; }
        
        .error-alert { background: #fef2f2; color: #dc2626; padding: 12px; border-radius: 12px; font-size: 0.85rem; font-weight: 700; text-align: center; margin-bottom: 1.5rem; border: 1px solid #fee2e2; }
        [data-theme='dark'] .error-alert { background: #450a0a; color: #f87171; border-color: #7f1d1d; }

        .auth-footer { margin-top: 2rem; text-align: center; }
        .auth-footer a { color: var(--primary); font-weight: 800; text-decoration: none; }
      `}</style>
    </div>
  );
};

export default SignupPage;
