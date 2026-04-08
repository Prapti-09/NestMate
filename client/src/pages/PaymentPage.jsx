import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, ShieldCheck, CheckCircle, ArrowLeft, 
  Lock, Wallet, Landmark, Info, Smartphone 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const basePriceStr = location.state?.amount || '12,400';
  const basePriceNum = parseInt(basePriceStr.replace(',', ''), 10);
  const serviceTax = Math.floor(basePriceNum * 0.01);
  const totalAmount = (basePriceNum + serviceTax).toLocaleString('en-IN');

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="payment-page animate-fade-in">
        <div className="container center-card">
           <div className="card payment-card text-center">
              <CheckCircle size={64} color="#10b981" />
              <h1 style={{ marginTop: '1.5rem' }}>Payment Successful!</h1>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                Your hostel fees for August 2026 have been paid. <br />
                Transaction ID: #NM_PAY_{Math.floor(Math.random() * 100000)}
              </p>
              <button onClick={() => navigate('/dashboard')} className="btn btn-primary w-full">
                Go to Dashboard
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back-payment">
           <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="payment-layout">
           <div className="payment-options">
              <h2>Select Payment Method</h2>
              <div className="methods-grid">
                 {[
                   { id: 'card', name: 'Card', icon: CreditCard },
                   { id: 'upi', name: 'UPI', icon: Smartphone },
                   { id: 'banking', name: 'Net Banking', icon: Landmark },
                   { id: 'wallet', name: 'Wallet', icon: Wallet }
                 ].map(m => (
                   <button 
                     key={m.id}
                     className={`method-btn ${method === m.id ? 'active' : ''}`}
                     onClick={() => setMethod(m.id)}
                   >
                     <m.icon size={24} />
                     <span>{m.name}</span>
                   </button>
                 ))}
              </div>

              <div className="card method-details">
                 {method === 'card' && (
                    <form onSubmit={handlePayment} className="card-form">
                       <div className="form-group-v2">
                          <label>Card Number</label>
                          <input type="text" placeholder="xxxx xxxx xxxx xxxx" required />
                       </div>
                       <div className="grid grid-2" style={{ gap: '1rem' }}>
                          <div className="form-group-v2">
                             <label>Expiry Date</label>
                             <input type="text" placeholder="MM / YY" required />
                          </div>
                          <div className="form-group-v2">
                             <label>CVV</label>
                             <input type="password" placeholder="***" required />
                          </div>
                       </div>
                       <button type="submit" className="btn btn-primary w-full mt-4" disabled={processing}>
                          {processing ? 'Processing...' : `Pay ₹${basePriceStr} Now`}
                       </button>
                    </form>
                 )}
                 {method !== 'card' && (
                    <div className="upi-demo text-center">
                       <Info size={32} color="#7c3aed" style={{ marginBottom: '1rem' }} />
                       <p>Please enter your ID to proceed with {method.toUpperCase()} payment.</p>
                       <input type="text" className="vpa-input" placeholder={`Enter ${method} ID`} />
                       <button onClick={handlePayment} className="btn btn-primary w-full mt-4" disabled={processing}>
                          {processing ? 'Connecting...' : 'Proceed'}
                       </button>
                    </div>
                 )}
              </div>
           </div>

           <aside className="payment-summary">
              <div className="card summary-inner">
                 <h3>Order Summary</h3>
                 <div className="summary-row">
                    <span>Hostel Monthly Fees</span>
                    <span>₹{basePriceStr}</span>
                 </div>
                 <div className="summary-row">
                    <span>Service Tax (1%)</span>
                    <span>₹{serviceTax}</span>
                 </div>
                 <div className="summary-row">
                    <span>Security Deposit</span>
                    <span>₹0</span>
                 </div>
                 <div className="total-row">
                    <span>Total Amount</span>
                    <span>₹{totalAmount}</span>
                 </div>
                 <div className="security-note">
                    <ShieldCheck size={18} />
                    <span>Secure 256-bit SSL Encryption</span>
                 </div>
              </div>
           </aside>
        </div>
      </div>

      <style>{`
        .payment-page { padding: 4rem 0; min-height: 100vh; background: #f8fafc; }
        .center-card { display: flex; align-items: center; justify-content: center; height: 60vh; }
        .payment-card { max-width: 450px; width: 100%; padding: 3rem; border-radius: 24px; }
        .btn-back-payment { background: none; border: none; display: flex; align-items: center; gap: 8px; font-weight: 700; color: #64748b; cursor: pointer; margin-bottom: 2.5rem; transition: color 0.2s; }
        .btn-back-payment:hover { color: var(--primary); }
        
        .payment-layout { display: grid; grid-template-columns: 1fr 380px; gap: 4rem; }
        .payment-options h2 { font-size: 1.75rem; font-weight: 800; margin-bottom: 2rem; }
        
        .methods-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
        .method-btn { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 1.5rem; background: white; border: 2px solid #e2e8f0; border-radius: 16px; cursor: pointer; transition: all 0.2s; color: #64748b; }
        .method-btn:hover { border-color: var(--primary); color: var(--primary); }
        .method-btn.active { border-color: var(--primary); background: #f5f3ff; color: var(--primary); }
        .method-btn span { font-size: 0.8rem; font-weight: 800; }

        .method-details { padding: 2.5rem; }
        .form-group-v2 { margin-bottom: 1.5rem; }
        .form-group-v2 label { display: block; font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 0.5rem; }
        .form-group-v2 input { width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 10px; outline: none; font-size: 1rem; font-weight: 500; }
        .form-group-v2 input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1); }
        
        .vpa-input { width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; margin-top: 1rem; text-align: center; font-size: 1.25rem; font-weight: 700; color: var(--primary); }

        .summary-inner { padding: 2rem; }
        .summary-inner h3 { font-size: 1.25rem; margin-bottom: 1.5rem; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; color: #64748b; font-weight: 600; font-size: 0.95rem; }
        .total-row { display: flex; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px dashed #e2e8f0; font-weight: 800; font-size: 1.35rem; color: #0f172a; }
        .security-note { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 2rem; font-size: 0.8rem; color: #10b981; font-weight: 700; }

        @media (max-width: 1024px) {
           .payment-layout { grid-template-columns: 1fr; }
           .methods-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
