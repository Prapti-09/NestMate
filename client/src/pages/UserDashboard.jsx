import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Calendar, Clock, Star, 
  MessageCircle, Settings, LogOut, ShieldCheck,
  Zap, Building, LayoutDashboard, ChevronRight,
  Info, CheckCircle2, AlertCircle, Edit, FileText, 
  ArrowUpRight, Download, CreditCard
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRequest, deleteRequest } from '../services/api';

const AllocationStages = ({ currentStage, hostelName }) => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  
  const stages = [
    { id: 1, title: 'Received', icon: FileText, desc: 'Application submitted', info: 'Your request for ' + (hostelName || 'Hostel') + ' was logged in our cloud database successfully.' },
    { id: 2, title: 'Verification', icon: ShieldCheck, desc: 'Identity check', info: 'Academic and residency documents are currently being cross-referenced by staff.' },
    { id: 3, title: 'Matching', icon: Zap, desc: 'Roommate sync', info: 'Finding the most compatible roommate based on your lifestyle preferences.' },
    { id: 4, title: 'Selection', icon: Building, desc: 'Room reserved', info: 'A specific room in block ' + (hostelName?.charAt(0) || 'H') + ' is being held for you.' },
    { id: 5, title: 'Key Issued', icon: CheckCircle2, desc: 'Key activated', info: 'Welcome home! Your digital key is now active on your mobile app.' }
  ];

  const handleStageClick = (stage) => {
    if (stage.id <= currentStage) {
      setSelectedInfo({ title: stage.title, text: stage.info, type: 'valid' });
    } else {
      setSelectedInfo({ title: stage.title, text: 'Note: Invalid action. You have not reached this stage for ' + hostelName + ' yet.', type: 'invalid' });
    }
  };

  return (
    <div className="allocation-context-wrapper">
      <div className="allocation-pipeline">
        {stages.map((stage, idx) => {
          const isActive = stage.id <= currentStage;
          const isCurrent = stage.id === currentStage;
          return (
            <div 
              key={stage.id} 
              className={`pipeline-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}
              onClick={() => handleStageClick(stage)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-connector-wrap">
                 <div className="step-node">
                    <stage.icon size={18} />
                 </div>
                 {idx !== stages.length - 1 && <div className="step-connector"></div>}
              </div>
              <div className="step-labels">
                 <span className="step-title">{stage.title}</span>
                 <span className="step-desc">{stage.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <AnimatePresence mode="wait">
        {selectedInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`stage-feedback-box ${selectedInfo.type}`}
          >
            <div className="feedback-content">
               <div className="feedback-icon">
                  {selectedInfo.type === 'valid' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
               </div>
               <div className="feedback-text">
                  <strong>{selectedInfo.title} Status:</strong> {selectedInfo.text}
               </div>
            </div>
            <button className="close-feedback" onClick={() => setSelectedInfo(null)}>&times;</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ComplianceTracker = () => {
  const [docs, setDocs] = useState([
    { name: 'Student ID Card', status: 'verified', date: 'April 5, 2026' },
    { name: 'Admission Letter', status: 'pending', date: 'Reviewing' },
    { name: 'Address Proof', status: 'missing', date: '-' }
  ]);

  const handleSubmit = (name) => {
    setDocs(docs.map(d => d.name === name ? { ...d, status: 'pending', date: 'Submitted Today' } : d));
    alert(`${name} submitted successfully for verification!`);
  };

  const done = docs.filter(d => d.status === 'verified').length;
  const percent = Math.round((done / docs.length) * 100);

  return (
    <div className="card compliance-card-v3">
       <div className="comp-header">
          <div className="comp-title-wrap">
             <h3>Document Compliance</h3>
             <p>{done} of {docs.length} tasks matching</p>
          </div>
          <div className="comp-percent">{percent}%</div>
       </div>
       <div className="doc-list-v3">
          {docs.map(doc => (
            <div key={doc.name} className="doc-item-v3">
               <div className={`status-dot ${doc.status}`}></div>
               <div className="doc-info">
                  <span className="doc-name">{doc.name}</span>
                  <span className="doc-statusText">{doc.date}</span>
               </div>
               {doc.status === 'missing' ? (
                 <button className="submit-tiny-btn" onClick={() => handleSubmit(doc.name)}><ArrowUpRight size={14} /> Submit</button>
               ) : doc.status === 'verified' ? (
                 <CheckCircle2 size={16} color="#10b981" />
               ) : (
                 <Clock size={16} color="#f97316" />
               )}
            </div>
          ))}
       </div>
    </div>
  );
};

const PaymentCalendar = ({ allocatedHostel, allocatedRoom }) => {
  // Hard-coded for the April 7th Presentation
  const presentationDate = new Date(2026, 3, 7); 
  const currentMonth = presentationDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const days = [];
  for (let i = -5; i < 9; i++) {
    const d = new Date(2026, 3, 7 + i);
    days.push({ 
      d: d.getDate(), 
      h: d.getDate() === 7, 
      t: d.getDate() === 7 ? 'Today' : (d.getDate() === 15 ? 'Due' : null) 
    });
  }

  // Determine dynamic price based on the actual room assigned (using room number to simulate 'single' vs 'shared' if needed)
  // Or simply base it on a standard rule. Let's use the room number letter (e.g. 102-A = Shared, 102-S = Single) or default.
  let isShared = true;
  if (allocatedRoom && String(allocatedRoom).includes('S')) {
      isShared = false;
  }
  
  const paymentAmount = isShared ? '12,400' : '15,000';
  const paymentType = isShared ? '2 Sharing AC' : 'Single Sharing AC';

  return (
    <div className="card calendar-card-v3">
       <div className="cal-header">
          <Calendar size={20} color="#7c3aed" />
          <span>{currentMonth}</span>
       </div>
       <div className="calendar-strip">
          {days.map((day, idx) => (
            <div key={idx} className={`cal-day ${day.h ? 'highlight' : ''}`}>
               <span className="day-num">{day.d}</span>
               {day.t && <span className="day-label">{day.t}</span>}
            </div>
          ))}
       </div>
       <div className="next-payment-v3">
          {allocatedRoom ? (
             <>
                <div className="pay-text">
                   <h4>Next Payment Due</h4>
                   <p>₹{paymentAmount} per month ({paymentType})</p>
                   <small style={{color: '#94a3b8', fontSize: '0.65rem'}}>For Room {allocatedRoom} in {allocatedHostel}</small>
                </div>
                <Link to="/payment" state={{ amount: paymentAmount }} className="btn btn-primary btn-sm"><CreditCard size={14} /> Pay Now</Link>
             </>
          ) : (
             <div className="pay-text waiting-v3">
                <h4>No Active Payments</h4>
                <p>Status: Waiting for Hostel Allocation</p>
             </div>
          )}
       </div>
    </div>
  );
};

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [viewRoomModal, setViewRoomModal] = useState(null);

  const getStageFromStatus = (status, hasAllocation) => {
    if (hasAllocation) return 5; // Automatically set to finish line if placed in a room
    switch (status) {
      case 'pending': return 1;
      case 'received': return 1;
      case 'approved': return 5; 
      case 'allocated': return 5;
      default: return 1;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // 1. Get Application Status (Fetch ALL applications)
        const appData = await getRequest(`/applications/user/${user.id}`);
        if (appData && Array.isArray(appData)) {
          setApplications(appData);
        } else if (appData && !appData.error) {
           setApplications([appData]);
        } else {
           setApplications([]);
        }

        // 2. Get Allocation Details (Fetch ALL allocations)
        const allocData = await getRequest(`/allocations/user/${user.id}`);
        if (allocData && Array.isArray(allocData)) {
          setAllocations(allocData);
        } else if (allocData && !allocData.error) {
           setAllocations([allocData]);
        } else {
           setAllocations([]);
        }
      } catch (err) {
        console.error('Failed to sync with Cloud DB:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const getCurrentAllocationForApp = (appId) => {
    return allocations.find(a => a.application_id === appId);
  };

  const handleWithdraw = async (appId) => {
     if (window.confirm("Are you sure you want to withdraw this application? This will also definitively cancel any room assignments.")) {
        const result = await deleteRequest(`/applications/${appId}`);
        if (result && !result.error) {
            setApplications(prev => prev.filter(app => app.id !== appId));
            setAllocations(prev => prev.filter(a => a.application_id !== appId));
            alert("Application withdrawn successfully. The space has been freed.");
        } else {
            alert("Failed to withdraw application: " + (result?.error || "Unknown Error"));
        }
     }
  };

  return (
    <div className="user-dashboard-v3">
      <div className="container">
        <div className="dashboard-grid-v3">
           <aside className="db-sidebar-v3">
              <div className="card sidebar-inner-v3">
                 <div className="db-profile">
                    <div className="profile-img-v3">{user?.name ? user.name[0] : 'P'}</div>
                    <div className="profile-info">
                       <h3>{user?.name || 'Prapti'}</h3>
                       <p>Student • {user?.college || 'SRM University'}</p>
                    </div>
                 </div>
                 <nav className="db-nav-v3">
                    <button className="active"><LayoutDashboard size={18} /> <span>Main Dashboard</span></button>
                    <Link to="/search" className="db-nav-link"><Building size={18} /> <span>Explore Stays</span></Link>
                    <Link to="/compatibility" className="db-nav-link"><Zap size={18} /> <span>Match Profile</span></Link>
                    <button className="db-nav-link logout-v3" onClick={() => { logout(); navigate('/login'); }}>
                       <LogOut size={18} /> <span>Sign Out</span>
                    </button>
                 </nav>
              </div>
           </aside>

           <main className="db-content-main-v3">
              <header className="db-top-header-v3">
                 <div className="title-stack">
                    <h1>Welcome, {user?.name || 'Prapti'}!</h1>
                    <p>Semester: Spring 2026 • Academic Year: 2025-26</p>
                 </div>
                 <div className="id-badge-v3">
                    <ShieldCheck size={16} /> <span>Identity Verified</span>
                 </div>
              </header>

              <div className="summary-widgets-v3">
                 <ComplianceTracker />
                 <PaymentCalendar 
                    allocatedHostel={allocations.length > 0 ? allocations[0].hostel_name : null}
                    allocatedRoom={allocations.length > 0 ? allocations[0].room_number : null}
                 />
              </div>

              <section className="dashboard-section-v3" id="bookings">
                 <div className="section-title-v3">
                    <h2>Hostel Allocation Lifecycle</h2>
                    <span className="live-pill">{applications.length} Active Requests</span>
                 </div>
                 
                 {applications.length > 0 ? (
                    <div className="applications-stack">
                       {applications.map(app => {
                          const appAlloc = getCurrentAllocationForApp(app.id);
                          return (
                            <div key={app.id} className="card pipeline-card-v3 mb-4">
                                <div className="pipeline-header">
                                   <div className="hostel-ref">
                                      <Building size={16} />
                                      <strong>{app.hostel_name}</strong>
                                   </div>
                                   <div className="status-badge">
                                      <Clock size={14} /> <span>{app.status.toUpperCase()}</span>
                                   </div>
                                </div>
                                
                                <AllocationStages currentStage={getStageFromStatus(app.status, !!appAlloc)} hostelName={app.hostel_name} />
                                
                                {appAlloc ? (
                                   <div className="allocation-success-box">
                                      <div className="residence-card">
                                         <div className="res-icon"><Building size={24} /></div>
                                         <div className="res-info">
                                            <h4>{appAlloc.hostel_name}</h4>
                                            <p>Room {appAlloc.room_number} • Your booking is finalized.</p>
                                         </div>
                                         <button 
                                            className="btn btn-primary btn-sm" 
                                            onClick={() => setViewRoomModal(appAlloc)}
                                         >
                                            Click here to see your Room
                                         </button>
                                      </div>
                                   </div>
                                ) : (
                                   <div className="allocation-notice-v3">
                                      <Info size={18} />
                                      <p style={{flex: 1}}>Booking for {app.hostel_name}. Interaction above will show detailed step progress.</p>
                                      <button 
                                          className="btn btn-outline btn-sm" 
                                          style={{color: '#ef4444', borderColor: '#ef4444', border: '1px solid #ef4444', height: '32px', backgroundColor: 'white'}}
                                          onClick={() => handleWithdraw(app.id)}
                                      >
                                          Withdraw Request
                                      </button>
                                   </div>
                                )}
                            </div>
                          );
                       })}
                    </div>
                 ) : (
                    <div className="card pipeline-card-v3">
                      <div className="empty-state-v3">
                         <Building size={48} color="#cbd5e1" />
                         <h3>No Applications Found</h3>
                         <p>You haven't applied for a hostel yet. Explore our stays to begin.</p>
                         <Link to="/search" className="btn btn-primary">Browse Hostels</Link>
                      </div>
                    </div>
                 )}
              </section>

              <section className="dashboard-section-v3" id="profile">
                 <div className="section-title-v3">
                    <h2>Lifestyle Profile</h2>
                 </div>
                 <div className="card action-card-v3">
                    <div className="action-main">
                       <Zap size={32} color="#7c3aed" />
                       <div className="action-text">
                          <h3>Roommate Match Tuning</h3>
                          <p>Your current lifestyle score is optimized for quiet environments. Need to update your habits?</p>
                       </div>
                       <button onClick={() => navigate('/compatibility')} className="btn btn-primary">Edit Match Profile</button>
                    </div>
                 </div>
              </section>
           </main>
        </div>
      </div>

      <AnimatePresence>
         {viewRoomModal && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="modal-overlay-v3"
            >
               <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="card room-detail-modal"
               >
                  <div className="room-modal-image">
                     <img 
                        src="/hostel-room.png" 
                        alt="Your assigned room" 
                     />
                     <div className="room-modal-tag">Room {viewRoomModal.room_number}</div>
                     <button className="close-btn-layered" onClick={() => setViewRoomModal(null)}>&times;</button>
                  </div>
                  
                  <div className="room-modal-body">
                     <h3 className="room-title">Welcome to {viewRoomModal.hostel_name}</h3>
                     <p className="room-address"><MapPin size={16}/> SRM University Main Campus, Student Housing Block</p>
                     
                     <div className="room-specs-grid">
                        <div className="spec-card">
                           <span className="spec-label">Room Type</span>
                           <strong className="spec-value">{String(viewRoomModal.room_number).includes('S') ? 'Premium Single AC' : 'Double Sharing AC'}</strong>
                        </div>
                        <div className="spec-card">
                           <span className="spec-label">Monthly Rent</span>
                           <strong className="spec-value" style={{color: '#7c3aed'}}>₹{String(viewRoomModal.room_number).includes('S') ? '15,000' : '12,400'}</strong>
                        </div>
                        <div className="spec-card">
                           <span className="spec-label">Move-in Date</span>
                           <strong className="spec-value">Available Immediately</strong>
                        </div>
                        <div className="spec-card">
                           <span className="spec-label">Digital Key</span>
                           <strong className="spec-value" style={{color: '#10b981'}}>Active & Synced</strong>
                        </div>
                     </div>
                     
                     <div className="room-modal-actions">
                         <button className="btn btn-outline" onClick={() => alert("Digital Key sent to your SMS!")}><Zap size={18}/> Get Mobile Key</button>
                         <button className="btn btn-primary" onClick={() => alert("Connecting you to your new roommate!")}><MessageCircle size={18}/> Contact Roommate</button>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <style>{`
        .user-dashboard-v3 { padding: 4rem 0; background: #f8fafc; min-height: 100vh; }
        .dashboard-grid-v3 { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; }
        
        .sidebar-inner-v3 { padding: 2rem; border-radius: 20px; position: sticky; top: 120px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .db-profile { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 2.5rem; }
        .profile-img-v3 { width: 80px; height: 80px; background: linear-gradient(135deg, #7c3aed 0%, #f97316 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 1rem; box-shadow: 0 8px 16px rgba(124, 58, 237, 0.2); border: 4px solid white; }
        .profile-info h3 { font-size: 1.25rem; margin-bottom: 2px; }
        .profile-info p { font-size: 0.8rem; color: #64748b; font-weight: 600; }

        .db-nav-v3 { display: flex; flex-direction: column; gap: 0.5rem; }
        .db-nav-link, .db-nav-v3 button { display: flex; align-items: center; gap: 1rem; padding: 14px 18px; border-radius: 12px; border: none; background: transparent; color: #64748b; font-weight: 700; cursor: pointer; transition: all 0.2s; text-decoration: none; font-size: 0.95rem; text-align: left; }
        .active, .db-nav-link:hover { background: #f1f5f9; color: #7c3aed; }
        .logout-v3 { margin-top: 2rem; color: #ef4444 !important; }
        .logout-v3:hover { background: #fee2e2 !important; }

        .db-top-header-v3 { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; }
        .title-stack h1 { font-size: 2.5rem; letter-spacing: -0.03em; margin-bottom: 4px; }
        .title-stack p { font-size: 0.95rem; color: #64748b; font-weight: 600; }
        .id-badge-v3 { display: flex; align-items: center; gap: 8px; padding: 6px 14px; background: #dcfce7; color: #166534; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; }

        .summary-widgets-v3 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 4rem; }
        .compliance-card-v3, .calendar-card-v3 { padding: 2rem; }
        
        .comp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .comp-title-wrap h3 { font-size: 1.15rem; margin-bottom: 2px; }
        .comp-title-wrap p { font-size: 0.8rem; color: #94a3b8; font-weight: 600; }
        .comp-percent { font-size: 1.5rem; font-weight: 800; color: #10b981; }

        .doc-list-v3 { display: flex; flex-direction: column; gap: 12px; }
        .doc-item-v3 { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .status-dot.verified { background: #10b981; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
        .status-dot.pending { background: #f97316; }
        .status-dot.missing { background: #cbd5e1; }
        .doc-info { flex: 1; display: flex; flex-direction: column; }
        .doc-name { font-size: 0.85rem; font-weight: 700; color: #1e293b; }
        .doc-statusText { font-size: 0.7rem; color: #94a3b8; font-weight: 600; }

        .cal-header { display: flex; align-items: center; gap: 10px; font-weight: 800; color: #7c3aed; margin-bottom: 1.5rem; text-transform: uppercase; font-size: 0.85rem; }
        .calendar-strip { display: flex; justify-content: space-between; margin-bottom: 2rem; }
        .cal-day { width: 44px; height: 50px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 10px; background: #f8fafc; flex-shrink: 0; }
        .cal-day.highlight { background: #7c3aed; color: white; transform: scale(1.1); box-shadow: 0 10px 15px rgba(124, 58, 237, 0.3); }
        .day-num { font-weight: 800; font-size: 1rem; }
        .day-label { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; margin-top: 2px; }
        
        .next-payment-v3 { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid #f1f5f9; }
        .pay-text h4 { font-size: 0.9rem; margin-bottom: 2px; }
        .pay-text p { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

        .pipeline-card-v3 { padding: 2.5rem; }
        .pipeline-header { display: flex; align-items: center; gap: 10px; font-size: 0.75rem; font-weight: 800; color: #f97316; text-transform: uppercase; margin-bottom: 2.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
        .allocation-pipeline { display: flex; justify-content: space-between; align-items: flex-start; }
        .pipeline-step { flex: 1; position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
        
        .step-connector-wrap { position: relative; width: 100%; display: flex; justify-content: center; margin-bottom: 1rem; }
        .step-node { width: 40px; height: 40px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #94a3b8; border: 4px solid white; z-index: 2; transition: all 0.3s; }
        .step-connector { position: absolute; top: 18px; left: 50%; width: 100%; height: 4px; background: #f1f5f9; z-index: 1; }
        
        .active .step-node { background: #7c3aed; color: white; }
        .active .step-connector { background: #7c3aed; }
        .current .step-node { animation: pulse-purple 2s infinite; }
        @keyframes pulse-purple { 
           0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); } 
           70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); } 
           100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); } 
        }

        .step-labels { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 0 10px; }
        .step-title { font-size: 0.85rem; font-weight: 800; color: #1e293b; }
        .step-desc { font-size: 0.65rem; color: #94a3b8; font-weight: 600; line-height: 1.3; }

        .allocation-notice-v3 { margin-top: 3rem; background: #fff7ed; padding: 1.25rem 1.5rem; border-radius: 16px; display: flex; align-items: center; gap: 1rem; color: #9a3412; font-size: 0.85rem; border-left: 5px solid #f97316; }

        .residence-card { margin-top: 3rem; background: #fdf2ff; border: 2px solid #7c3aed; border-radius: 20px; padding: 1.5rem 2rem; display: flex; align-items: center; gap: 2rem; }
        .res-icon { width: 56px; height: 56px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #7c3aed; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .res-info { flex: 1; }
        .res-info h4 { font-size: 1.1rem; margin-bottom: 2px; }

        .action-card-v3 { padding: 2.5rem; overflow: hidden; position: relative; }
        .action-main { display: flex; align-items: center; gap: 2rem; }
        .action-text { flex: 1; }
        .action-text h3 { font-size: 1.25rem; margin-bottom: 8px; }

        @media (max-width: 1024px) {
           .dashboard-grid-v3 { grid-template-columns: 1fr; }
           .db-sidebar-v3 { display: none; }
           .summary-widgets-v3 { grid-template-columns: 1fr; }
           .allocation-pipeline { grid-template-columns: 1fr; display: grid; gap: 2rem; }
           .step-connector { display: none; }
           .pipeline-step { flex-direction: row; text-align: left; align-items: flex-start; gap: 1.5rem; }
           .step-labels { align-items: flex-start; }
        }

        /* Modal Styles */
        .modal-overlay-v3 { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1.5rem; }
        .room-detail-modal { background: white; width: 100%; max-width: 600px; border-radius: 24px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: none; }
        .room-modal-image { position: relative; width: 100%; height: 280px; }
        .room-modal-image img { width: 100%; height: 100%; object-fit: cover; }
        .room-modal-tag { position: absolute; bottom: -20px; right: 30px; background: #7c3aed; color: white; padding: 10px 24px; border-radius: 9999px; font-weight: 800; font-size: 1.25rem; border: 4px solid white; box-shadow: 0 10px 15px rgba(124, 58, 237, 0.3); }
        .close-btn-layered { position: absolute; top: 20px; right: 20px; width: 36px; height: 36px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; backdrop-filter: blur(4px); transition: all 0.2s; }
        .close-btn-layered:hover { background: rgba(0,0,0,0.8); transform: scale(1.1); }
        
        .room-modal-body { padding: 3rem 2rem 2rem 2rem; }
        .room-title { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
        .room-address { display: flex; align-items: center; gap: 8px; color: #64748b; font-weight: 600; font-size: 0.9rem; margin-bottom: 2rem; }
        
        .room-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
        .spec-card { background: #f8fafc; padding: 1rem; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 4px; }
        .spec-label { font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 800; }
        .spec-value { font-size: 1.1rem; color: #1e293b; }

        .room-modal-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
      `}</style>
    </div>
  );
};

export default UserDashboard;
