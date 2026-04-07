import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Shield, 
  ChevronRight, ArrowLeft, CheckCircle2,
  AlertCircle, Building, Smartphone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { postRequest } from '../services/api';

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const validateEmail = (email) => {
    return email.endsWith('.edu') || email.endsWith('.org') || email.endsWith('.in');
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Please use a valid institution email (.edu, .org, or .res.in)');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Generate Mock OTP
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    alert(`[MOCK OTP SERVICE]: Your 4-digit code for ${formData.email} is: ${code}`);
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleFinalRegister = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp !== generatedOtp) {
      setError('Invalid verification code. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const response = await postRequest('/register', formData);
      if (response.id || response.message) {
        navigate('/login', { state: { message: 'Verification successful! Please login.' } });
      } else {
        setError(response.error || 'Registration failed');
      }
    } catch (err) {
      setError('Connection failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-v2">
      <div className="auth-container-v2">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="auth-card-v2"
            >
              <div className="auth-header-v2">
                <div className="auth-logo-v2"><Building size={24} /></div>
                <h1>Join NestMate</h1>
                <p>Create your institutional account</p>
              </div>

              {error && <div className="error-alert-v2"><AlertCircle size={16} />{error}</div>}

              <form onSubmit={handleInitialSubmit} className="auth-form-v2">
                <div className="input-group-v2">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="input-group-v2">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="Institutional Email (.edu, .org)" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="input-group-v2">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <div className="role-selector-v2">
                   <p>I am a:</p>
                   <div className="role-options">
                      {['student', 'employee', 'admin'].map(r => (
                        <button 
                          key={r}
                          type="button"
                          className={formData.role === r ? 'active' : ''}
                          onClick={() => setFormData({...formData, role: r})}
                        >
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                      ))}
                   </div>
                </div>

                <button type="submit" className="btn-auth-v2">
                  Get Verification Code <ChevronRight size={18} />
                </button>
              </form>

              <p className="auth-footer-v2">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="auth-card-v2 otp-card"
            >
              <button onClick={() => setStep(1)} className="btn-back">
                <ArrowLeft size={16} /> Back to details
              </button>
              
              <div className="auth-header-v2">
                <div className="auth-logo-v2 accent"><Smartphone size={24} /></div>
                <h1>Verify Email</h1>
                <p>We've sent a 4-digit code to <strong>{formData.email}</strong></p>
              </div>

              {error && <div className="error-alert-v2"><AlertCircle size={16} />{error}</div>}

              <div className="otp-input-container">
                {otp.map((digit, idx) => (
                  <input 
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="otp-box"
                  />
                ))}
              </div>

              <button 
                onClick={handleFinalRegister} 
                className="btn-auth-v2"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Finish Registration'} <CheckCircle2 size={18} />
              </button>

              <div className="resend-text">
                 Didn't get the code? <button onClick={handleInitialSubmit}>Resend Code</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .auth-page-v2 { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f4f8; padding: 20px; }
        .auth-container-v2 { width: 100%; max-width: 440px; }
        .auth-card-v2 { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .auth-header-v2 { text-align: center; margin-bottom: 30px; }
        .auth-logo-v2 { width: 48px; height: 48px; background: #7c3aed; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; }
        .auth-logo-v2.accent { background: #f97316; }
        .auth-header-v2 h1 { font-size: 1.75rem; color: #1e293b; margin-bottom: 8px; }
        .auth-header-v2 p { color: #64748b; font-size: 0.95rem; }

        .input-group-v2 { position: relative; margin-bottom: 16px; }
        .input-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .input-group-v2 input { width: 100%; padding: 14px 14px 14px 48px; border: 2px solid #e2e8f0; border-radius: 12px; outline: none; transition: 0.3s; font-size: 0.95rem; }
        .input-group-v2 input:focus { border-color: #7c3aed; box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1); }

        .role-selector-v2 { margin-bottom: 24px; }
        .role-selector-v2 p { font-size: 0.85rem; font-weight: 700; color: #64748b; margin-bottom: 10px; }
        .role-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .role-options button { padding: 10px; border: 2px solid #e2e8f0; border-radius: 10px; background: white; color: #64748b; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .role-options button.active { border-color: #7c3aed; background: #f5f3ff; color: #7c3aed; }

        .btn-auth-v2 { width: 100%; padding: 16px; background: #7c3aed; color: white; border: none; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: 0.3s; }
        .btn-auth-v2:hover { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(124, 58, 237, 0.2); }
        .btn-auth-v2:disabled { opacity: 0.7; cursor: not-allowed; }

        .otp-input-container { display: flex; justify-content: space-between; gap: 15px; margin: 30px 0; }
        .otp-box { width: 60px; height: 70px; text-align: center; font-size: 1.5rem; font-weight: 800; border: 2px solid #e2e8f0; border-radius: 12px; outline: none; transition: 0.3s; }
        .otp-box:focus { border-color: #f97316; box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1); }

        .error-alert-v2 { background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: 10px; margin-bottom: 20px; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .btn-back { display: flex; align-items: center; gap: 6px; border: none; background: none; color: #64748b; font-weight: 700; font-size: 0.85rem; cursor: pointer; margin-bottom: 20px; }
        .resend-text { text-align: center; margin-top: 20px; font-size: 0.85rem; color: #64748b; }
        .resend-text button { background: none; border: none; color: #7c3aed; font-weight: 700; cursor: pointer; text-decoration: underline; }
        .auth-footer-v2 { text-align: center; margin-top: 25px; color: #64748b; font-size: 0.9rem; }
        .auth-footer-v2 a { color: #7c3aed; font-weight: 700; text-decoration: none; }
      `}</style>
    </div>
  );
};

export default SignupPage;
