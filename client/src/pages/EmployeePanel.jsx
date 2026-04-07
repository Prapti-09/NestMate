import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, CheckCircle, Clock, Zap, 
  Search, Filter, ChevronRight, AlertCircle,
  TrendingUp, Award, BarChart3
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card stat-card-v2">
    <div className="stat-icon" style={{ backgroundColor: `${color}20`, color }}>
      <Icon size={24} />
    </div>
    <div className="stat-content">
      <span className="stat-label">{label}</span>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
);

const EmployeePanel = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [apps, setApps] = useState([
     { id: 'APP102', student: 'Rahul Sharma', email: 'rahul.s@srm.edu', college: 'SRM University', date: '2026-04-06', compatibility: 88, hostel: 'Nelson Mandela Hall' },
     { id: 'APP103', student: 'Priya Patel', email: 'priya.p@vit.edu', college: 'VIT Chennai', date: '2026-04-06', compatibility: 92, hostel: 'Kalpana Chawla Hall' },
     { id: 'APP104', student: 'Amit Gupta', email: 'amit.g@iit.edu', college: 'IIT Madras', date: '2026-04-07', compatibility: 75, hostel: 'Tagore Block' },
  ]);
  const [history, setHistory] = useState([
     { id: 'APP101', student: 'Ananya Rao', email: 'ananya@srm.edu', hostel: 'Global Residency', room: '102-A', date: '2026-04-07' }
  ]);
  
  const handleAutoAllocate = () => {
    setLoading(true);
    setTimeout(() => {
      // Move all current apps to history
      const newHistory = apps.map(app => ({
        ...app,
        room: Math.floor(100 + Math.random() * 900) + '-B',
        date: '2026-04-07'
      }));
      setHistory([...history, ...newHistory]);
      setApps([]);
      setLoading(false);
      alert('FIFO Queue Processed: 3 Students Assigned to Cloud Rooms.');
    }, 2000);
  };

  const handleRunEngine = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Smart Matching Engine Complete: Best roommate pairs discovered.');
    }, 1500);
  };

  return (
    <div className="employee-panel">
      <div className="container">
        <header className="panel-header">
           <div className="header-text">
              <h1>Employee Taskbar</h1>
              <p>Hostel Allocation & Student Management System</p>
           </div>
           <div className="performance-summary">
              <Award size={20} color="#7c3aed" />
              <span>Efficiency Score: <strong>94%</strong></span>
           </div>
        </header>

        <div className="stats-grid">
           <StatCard icon={Clock} label="Pending Reviews" value={apps.length} color="#f97316" />
           <StatCard icon={CheckCircle} label="Allocated Today" value={apps.length === 0 ? "11" : "8"} color="#10b981" />
           <StatCard icon={Zap} label="Auto-Matches Ready" value="5" color="#7c3aed" />
           <StatCard icon={TrendingUp} label="Weekly Goal" value="85%" color="#3b82f6" />
        </div>

        <div className="panel-content-layout">
           <aside className="panel-sidebar">
              <div className="card inner-sidebar">
                 <h3>Queue Management</h3>
                 <nav className="side-nav">
                    <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>
                       <Clock size={18} /> <span>Application Queue</span>
                    </button>
                    <button className={activeTab === 'allocation' ? 'active' : ''} onClick={() => setActiveTab('allocation')}>
                       <Zap size={18} /> <span>Smart Allocation</span>
                    </button>
                    <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
                       <BarChart3 size={18} /> <span>My Performance</span>
                    </button>
                 </nav>
              </div>
           </aside>

           <main className="panel-main">
               {activeTab === 'pending' && (
                  <div className="apps-stack-v3">
                    <div className="card table-card mb-4">
                        <div className="table-header">
                          <h2>Live Application Queue (FIFO)</h2>
                          <div className="table-actions">
                              <button 
                                className="btn btn-primary btn-sm" 
                                onClick={handleAutoAllocate}
                                disabled={loading || apps.length === 0}
                              >
                                {loading ? 'Processing...' : <><Zap size={16} /> Auto-Allocate All</>}
                              </button>
                          </div>
                        </div>
                        {apps.length > 0 ? (
                          <table className="modern-table">
                              <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Account</th>
                                    <th>College</th>
                                    <th>Preferred Stay</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {apps.map(app => (
                                    <tr key={app.id}>
                                      <td>{app.id}</td>
                                      <td>
                                          <div className="student-profile-v3">
                                            <strong>{app.student}</strong>
                                            <small>{app.email}</small>
                                          </div>
                                      </td>
                                      <td>{app.college}</td>
                                      <td><div className="hostel-badge-v3">{app.hostel}</div></td>
                                      <td>
                                          <div className="score-pill" style={{ background: app.compatibility > 85 ? '#dcfce7' : '#fef9c3' }}>
                                            {app.compatibility}% Match
                                          </div>
                                      </td>
                                      <td>
                                          <button className="btn-icon-table" onClick={() => alert(`Reviewing documents for ${app.student}...`)}><ChevronRight size={18} /></button>
                                      </td>
                                    </tr>
                                ))}
                              </tbody>
                          </table>
                        ) : (
                          <div className="empty-state text-center py-10">
                              <CheckCircle size={48} color="#10b981" />
                              <h3 className="mt-4">Queue Clear!</h3>
                              <p>All applications have been moved to the Audit History.</p>
                          </div>
                        )}
                    </div>

                    <div className="card table-card history-card-v3">
                       <div className="table-header">
                          <h2 style={{ color: '#64748b' }}>Allocation Audit History</h2>
                          <span className="live-pill" style={{ background: '#f1f5f9', color: '#64748b' }}>LATEST: APRIL 7, 2026</span>
                       </div>
                       <table className="modern-table history-table">
                          <thead>
                             <tr>
                                <th>Student Account</th>
                                <th>Assigned Hostel</th>
                                <th>Room ID</th>
                                <th>Staff Action</th>
                                <th>Timestamp</th>
                             </tr>
                          </thead>
                          <tbody>
                             {history.map(item => (
                                <tr key={item.id}>
                                   <td>
                                       <div className="student-profile-v3">
                                          <strong>{item.student}</strong>
                                          <small>{item.email}</small>
                                       </div>
                                   </td>
                                   <td>{item.hostel}</td>
                                   <td><strong>{item.room}</strong></td>
                                   <td><span className="status-badge success">ALLOCATED</span></td>
                                   <td className="text-muted">{item.date} 12:45 PM</td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  </div>
               )}

              {activeTab === 'allocation' && (
                 <div className="smart-allocation-view">
                    <div className="card highlight-card">
                       <Zap size={32} color="#7c3aed" />
                       <div className="text">
                          <h3>Rule-Based Engine Ready</h3>
                          <p>The system has found 5 pairs of highly compatible students based on lifestyle scores.</p>
                       </div>
                       <button 
                         className="btn btn-primary" 
                         onClick={handleRunEngine}
                         disabled={loading}
                       >
                          {loading ? 'Analyzing...' : 'Run Engine'}
                       </button>
                    </div>

                    <div className="grid grid-2" style={{ marginTop: '2rem' }}>
                       <div className="card compatibility-match">
                          <div className="match-top">
                             <span className="match-score">96% Match</span>
                             <h3>Room 204C Potential</h3>
                          </div>
                          <div className="students">
                             <div className="student-p">Rahul Sharma <small>(Early Bird, Quiet)</small></div>
                             <div className="plus">+</div>
                             <div className="student-p">Amit Verma <small>(Early Bird, Neat)</small></div>
                          </div>
                           <button 
                             className="btn btn-outline btn-sm w-full" 
                             onClick={() => alert('Manual Allocation Confirmed: Rooms updated.')}
                           >
                              Confirm Allocation
                           </button>
                       </div>
                    </div>
                 </div>
              )}
           </main>
        </div>
      </div>

      <style>{`
        .employee-panel { padding: 4rem 0; background: var(--bg-main); min-height: 100vh; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .header-text h1 { font-size: 2.25rem; font-weight: 800; }
        .performance-summary { background: var(--bg-card); padding: 12px 20px; border-radius: 9999px; border: 1px solid var(--border); display: flex; align-items: center; gap: 10px; font-size: 0.875rem; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
        .stat-card-v2 { padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
        .stat-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .stat-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; }
        .stat-value { font-size: 1.75rem; font-weight: 800; }

        .panel-content-layout { display: grid; grid-template-columns: 280px 1fr; gap: 3rem; }
        .inner-sidebar { padding: 1.5rem; }
        .inner-sidebar h3 { font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1.5rem; }
        .side-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .side-nav button { display: flex; align-items: center; gap: 1rem; padding: 12px; border-radius: 10px; border: none; background: transparent; color: var(--text-muted); font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: left; }
        .side-nav button:hover { background: var(--bg-alt); color: var(--primary); }
        .side-nav button.active { background: var(--bg-alt); color: var(--primary); box-shadow: inset 4px 0 0 var(--primary); }

        .table-card { padding: 2rem; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .modern-table { width: 100%; border-collapse: collapse; }
        .modern-table th { text-align: left; padding: 1rem; border-bottom: 2px solid var(--border); font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted); }
        .modern-table td { padding: 1.25rem 1rem; border-bottom: 1px solid var(--border); }
        .score-pill { padding: 4px 10px; border-radius: 6px; font-weight: 800; font-size: 0.8rem; display: inline-block; color: #166534; }
        .btn-icon-table { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

        .highlight-card { padding: 2rem; background: var(--bg-card); display: flex; align-items: center; gap: 2rem; border: 2px dashed var(--primary); }
        .highlight-card .text { flex: 1; }

        .compatibility-match { padding: 1.5rem; }
        .match-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .match-score { background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; }
        .students { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .student-p { font-weight: 700; font-size: 1rem; }
        .student-p small { display: block; font-weight: 500; color: var(--text-muted); font-size: 0.75rem; }
        .plus { text-align: center; font-size: 1.25rem; color: var(--primary); font-weight: 800; }

        @media (max-width: 1024px) {
           .panel-content-layout { grid-template-columns: 1fr; }
           .stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
};

export default EmployeePanel;
