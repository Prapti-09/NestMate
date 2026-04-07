import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, Users, BarChart3, Settings, 
  Plus, Search, ArrowRight, ShieldCheck, 
  MapPin, Clock, Zap, TrendingUp, TrendingDown,
  UserCheck, AlertCircle, LayoutDashboard, Check
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color, subtext }) => (
  <div className="card stat-card-inst">
    <div className="stat-top">
       <div className="stat-icon-wrap" style={{ backgroundColor: `${color}20`, color }}>
          <Icon size={24} />
       </div>
       {trend && (
          <div className={`trend-pill ${trend > 0 ? 'up' : 'down'}`}>
             {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
             <span>{Math.abs(trend)}%</span>
          </div>
       )}
    </div>
    <div className="stat-body">
       <div className="stat-label">{label}</div>
       <h3 className="stat-value">{value}</h3>
       <p className="stat-subtext">{subtext}</p>
    </div>
  </div>
);

const EmployeeRow = ({ name, role, completed, time, efficiency }) => (
  <tr className="employee-row">
     <td>
        <div className="employee-info">
           <div className="emp-avatar">{name[0]}</div>
           <div>
              <div className="emp-name">{name}</div>
              <div className="emp-role">{role}</div>
           </div>
        </div>
     </td>
     <td className="emp-comp">{completed} <small>Students</small></td>
     <td className="emp-time">{time} <small>Avg/Task</small></td>
     <td>
        <div className="efficiency-box">
           <div className="efficiency-bar">
              <div className="eff-fill" style={{ width: `${efficiency}%`, backgroundColor: efficiency > 90 ? '#10b981' : '#f97316' }}></div>
           </div>
           <span className="eff-val">{efficiency}%</span>
        </div>
     </td>
     <td><button className="btn btn-outline btn-sm" onClick={() => alert(`Reviewing reports for ${name}...`)}>Reviews Reports</button></td>
  </tr>
);

const InstitutePanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAddBuilding = () => {
     alert('Opening Building Configuration Wizard...');
  };

  const handleSecurity = () => {
     alert('Security Protocols: All systems nominal. SSL/TLS 1.3 Active.');
  };

  return (
    <div className="institute-panel-v2">
      <div className="container">
        <header className="panel-header">
           <div className="header-left">
              <h1>Admin Authority</h1>
              <p>SRM University - Hostel Allocation Hub</p>
           </div>
           <div className="header-actions">
              <button className="btn btn-outline" onClick={handleSecurity}><ShieldCheck size={20} /> <span>Security Protocols</span></button>
              <button className="btn btn-primary" onClick={handleAddBuilding}><Plus size={20} /> <span>Add Building</span></button>
           </div>
        </header>

        <nav className="panel-nav-tabs">
           {['dashboard', 'hostels', 'staff', 'algorithms'].map(tab => (
              <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
           ))}
        </nav>

        {activeTab === 'dashboard' && (
           <div className="dashboard-view animate-fade-in">
              <div className="stats-grid">
                 <StatCard icon={Users} label="Total Applicants" value="1,248" trend={12} color="#7c3aed" subtext="42 new today" />
                 <StatCard icon={Building} label="Room Occupancy" value="92%" trend={-2} color="#10b981" subtext="Current Fill Rate" />
                 <StatCard icon={Clock} label="Waitlist Queue" value="156" trend={34} color="#f97316" subtext="FIFO Position Tracking" />
                 <StatCard icon={Zap} label="Compatibility" value="84%" trend={5} color="#3b82f6" subtext="Match Accuracy Avg" />
              </div>

              <div className="panel-grid-2">
                 <div className="card table-card-v2">
                    <div className="card-header-v2">
                       <h3>Active Building Inventory</h3>
                       <button className="btn-text-inst" onClick={() => setActiveTab('hostels')}>Full Inventory <ArrowRight size={16} /></button>
                    </div>
                    <div className="modern-list">
                       {[
                         { name: "Nelson Mandela Hall", rooms: "124/150", type: "Boys" },
                         { name: "Kalpana Chawla Hall", rooms: "188/200", type: "Girls" },
                         { name: "Global Residency", rooms: "45/50", type: "Premium" },
                       ].map(b => (
                          <div className="list-item" key={b.name}>
                             <div className="item-left">
                                <div className="bul-icon"><Building size={18} /></div>
                                <div className="item-text">
                                   <h4>{b.name}</h4>
                                   <p>{b.type} • AC / Standard</p>
                                </div>
                             </div>
                             <div className="item-inventory">
                                <strong>{b.rooms}</strong>
                                <span>Slots Taken</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="card match-insights-card">
                    <h3>Compatibility Insights</h3>
                    <div className="radar-placeholder">
                       <BarChart3 size={48} color="#94a3b8" />
                       <p>Clustering analysis indicates high personality correlation in Kalpana Chawla Hall (94%).</p>
                    </div>
                    <div className="insights-footer">
                       <div className="insight-stat">
                          <UserCheck size={18} color="#10b981" />
                          <span>58 Successful Manual Overrides</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'hostels' && (
           <div className="hostels-view animate-fade-in">
              <div className="card table-card-v2" style={{ padding: '2rem' }}>
                 <div className="card-header-v2" style={{ marginBottom: '2rem' }}>
                    <h3>Hostel Inventory & Capacity</h3>
                    <div className="header-actions">
                       <button className="btn btn-primary btn-sm" onClick={handleAddBuilding}><Plus size={16} /> New Building</button>
                    </div>
                 </div>
                 <div className="grid grid-3" style={{ gap: '1.5rem' }}>
                    {[
                      { name: 'Nelson Mandela Hall', block: 'A-Block', rooms: 45, students: 124, type: 'Boys' },
                      { name: 'Kalpana Chawla Hall', block: 'B-Block', rooms: 62, students: 188, type: 'Girls' },
                      { name: 'Global Residency', block: 'Premium', rooms: 12, students: 45, type: 'Mixed' },
                      { name: 'Tagore Block', block: 'C-Block', rooms: 24, students: 0, type: 'Boys (Inactive)' },
                    ].map((h, i) => (
                       <div className="card hostel-info-card" key={i}>
                          <div className={`type-tag ${h.type.toLowerCase().includes('girls') ? 'girl' : 'boy'}`}>{h.type}</div>
                          <h4>{h.name}</h4>
                          <p>{h.block}</p>
                          <div className="h-stats">
                             <div className="st"><strong>{h.rooms}</strong> <span>Rooms</span></div>
                             <div className="st"><strong>{h.students}</strong> <span>Students</span></div>
                          </div>
                          <button className="btn btn-outline btn-sm w-full mt-4" onClick={() => alert(`Managing wings for ${h.name}...`)}>Manage Wing</button>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'algorithms' && (
           <div className="algorithms-view animate-fade-in">
              <div className="card algorithm-card">
                 <div className="alg-header">
                    <Zap size={32} color="#7c3aed" />
                    <div className="alg-text">
                       <h3>Smart Allocation Dashboard</h3>
                       <p>Configure and trigger the global student matching engine.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => alert('Global Matching Engine Triggered...')}><Zap size={18} /> Trigger Global Allocation</button>
                 </div>
                 
                 <div className="panel-grid-2" style={{ marginTop: '3rem' }}>
                    <div className="card inner-alg-card">
                       <h4>FIFO Queue Processing</h4>
                       <p>Allocates strictly based on application timestamp (#1 applied first, #1 gets first choice).</p>
                       <div className="status-indicator enabled">
                          <Check size={14} /> <span>Enabled</span>
                       </div>
                       <button className="btn btn-outline btn-sm mt-4">Adjust Parameters</button>
                    </div>
                    <div className="card inner-alg-card">
                       <h4>Rule-Based Personality Matching</h4>
                       <p>Uses lifestyle questionnaire data to match highly compatible roommates (90%+ score).</p>
                       <div className="status-indicator enabled">
                          <Check size={14} /> <span>Enabled</span>
                       </div>
                       <button className="btn btn-outline btn-sm mt-4">Manage Weights</button>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'staff' && (
           <div className="staff-view animate-fade-in">
              <div className="card table-card-v2" style={{ padding: '2rem' }}>
                 <div className="card-header-v2" style={{ marginBottom: '2rem' }}>
                    <h3>Employee Efficiency Performance</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => alert('Generating aggregate performance report...')}><TrendingUp size={16} /> Performance Report</button>
                 </div>
                 <table className="modern-table">
                    <thead>
                       <tr>
                          <th>Employee</th>
                          <th>Allocations Done</th>
                          <th>Avg Handling Time</th>
                          <th>Efficiency Score</th>
                          <th>Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                       <EmployeeRow name="Aditi Rao" role="Senior Staff" completed={342} time="4.2m" efficiency={96} />
                       <EmployeeRow name="Vikram Singh" role="Junior Staff" completed={218} time="5.8m" efficiency={88} />
                       <EmployeeRow name="Pooja Sharma" role="Intern" completed={145} time="8.1m" efficiency={74} />
                       <EmployeeRow name="Kapil Dev" role="Senior Staff" completed={412} time="3.9m" efficiency={98} />
                    </tbody>
                 </table>
              </div>
           </div>
        )}
      </div>

      <style>{`
        .institute-panel-v2 { padding: 4rem 0; background: var(--bg-main); min-height: 100vh; }
        .panel-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; }
        .header-left h1 { font-size: 2.75rem; letter-spacing: -0.02em; }
        .header-left p { font-size: 1.125rem; }
        .header-actions { display: flex; gap: 1rem; }

        .panel-nav-tabs { display: flex; gap: 1rem; margin-bottom: 3rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        .panel-nav-tabs button { padding: 10px 24px; border-radius: 9999px; border: none; background: transparent; color: var(--text-muted); font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 1rem; }
        .panel-nav-tabs button:hover { color: var(--primary); background: var(--bg-card); }
        .panel-nav-tabs button.active { background: var(--primary); color: white; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4); }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-bottom: 4rem; }
        .stat-card-inst { padding: 2rem; }
        .stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
        .stat-icon-wrap { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .trend-pill { display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; }
        .trend-pill.up { background: #dcfce7; color: #166534; }
        .trend-pill.down { background: #fee2e2; color: #dc2626; }
        .stat-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem; }
        .stat-value { font-size: 2rem; font-weight: 800; line-height: 1; margin-bottom: 0.5rem; }
        .stat-subtext { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

        .panel-grid-2 { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; }
        .card-header-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .btn-text-inst { background: none; border: none; color: var(--primary); font-weight: 800; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .modern-list { display: flex; flex-direction: column; gap: 1rem; }
        .list-item { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: var(--bg-alt); border-radius: 14px; border: 1px solid transparent; transition: all 0.2s; }
        .list-item:hover { border-color: var(--primary); transform: translateX(8px); }
        .item-left { display: flex; gap: 1.25rem; align-items: center; }
        .bul-icon { width: 44px; height: 44px; background: var(--bg-card); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary); box-shadow: var(--shadow-sm); }
        .item-text h4 { font-size: 1rem; margin-bottom: 2px; }
        .item-text p { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .item-inventory { text-align: right; }
        .item-inventory strong { display: block; font-size: 1.15rem; color: var(--primary); }
        .item-inventory span { display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; }

        .match-insights-card { padding: 2rem; display: flex; flex-direction: column; }
        .radar-placeholder { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 1.5rem; padding: 3rem 0; color: var(--text-muted); }
        .radar-placeholder p { font-size: 0.95rem; line-height: 1.6; }
        .insights-footer { padding-top: 2rem; border-top: 1px solid var(--border); }
        .insight-stat { display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 0.9rem; color: var(--text-main); }

        .employee-row td { padding: 1.5rem 1rem !important; }
        .employee-info { display: flex; align-items: center; gap: 1rem; }
        .emp-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--gradient-main); display: flex; align-items: center; justify-content: center; font-weight: 800; color: white; }
        .emp-name { font-weight: 700; font-size: 1rem; }
        .emp-role { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); }
        .emp-comp, .emp-time { font-weight: 800; font-size: 1.15rem; }
        .emp-comp small, .emp-time small { display: block; font-size: 0.7rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; margin-top: 2px; }

        .hostel-info-card { padding: 2rem; }
        .type-tag { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; padding: 4px 8px; border-radius: 6px; display: inline-block; margin-bottom: 1rem; }
        .type-tag.girl { background: #fee2e2; color: #b91c1c; }
        .type-tag.boy { background: #dbeafe; color: #1d4ed8; }
        .h-stats { display: flex; gap: 1.5rem; margin-top: 1.5rem; }
        .h-stats .st { display: flex; flex-direction: column; }
        .h-stats .st strong { font-size: 1.25rem; color: var(--text-main); }
        .h-stats .st span { font-size: 0.7rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }

        .algorithm-card { padding: 3rem; }
        .alg-header { display: flex; gap: 2rem; align-items: center; padding-bottom: 2.5rem; border-bottom: 1px solid var(--border); }
        .alg-text { flex: 1; }
        .alg-text h3 { font-size: 1.5rem; margin-bottom: 4px; }
        .inner-alg-card { padding: 2rem; }
        .status-indicator { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 800; margin-top: 1rem; }
        .status-indicator.enabled { background: #dcfce7; color: #166534; }

        @media (max-width: 1200px) {
           .panel-grid-2 { grid-template-columns: 1fr; }
           .stats-grid { grid-template-columns: repeat(2, 1fr); }
           .grid-3 { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
};

export default InstitutePanel;
