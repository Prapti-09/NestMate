import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Users, Building, Activity, 
  TrendingUp, Download, Plus, Search,
  CheckCircle, ArrowUpRight, BarChart3,
  Calendar, Award, UserCheck
} from 'lucide-react';
import { getRequest } from '../services/api';

const PerformanceCard = ({ staff }) => {
  const efficiency = staff.total_actions > 0 
    ? Math.round((staff.approvals / staff.total_actions) * 100) 
    : 0;

  return (
    <div className="staff-perf-card">
       <div className="perf-top">
          <div className="perf-avatar">{staff.name[0]}</div>
          <div className="perf-meta">
             <h4>{staff.name}</h4>
             <p>{staff.email}</p>
          </div>
          <div className={`perf-badge ${efficiency > 70 ? 'high' : 'mid'}`}>
             {efficiency}% Efficiency
          </div>
       </div>

       <div className="perf-stats-grid">
          <div className="p-stat">
             <span className="p-label">Approvals</span>
             <span className="p-value">{staff.approvals}</span>
          </div>
          <div className="p-stat">
             <span className="p-label">Allocations</span>
             <span className="p-value">{staff.allocations}</span>
          </div>
          <div className="p-stat">
             <span className="p-label">Logs</span>
             <span className="p-value">{staff.total_actions}</span>
          </div>
       </div>

       <div className="perf-progress-bar">
          <div className="p-fill" style={{ width: `${efficiency}%` }}></div>
       </div>
    </div>
  );
};

const InstitutePanel = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getRequest('/admin/staff-stats');
        if (Array.isArray(data)) setStats(data);
      } catch (err) {
        console.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard-v3">
      <div className="admin-sidebar-v3">
         <div className="admin-logo-v3">
            <Shield size={24} /> <span>NestMate Admin</span>
         </div>
         <nav className="admin-nav-v3">
            <button className="active"><BarChart3 size={18} /> Performance</button>
            <button><Building size={18} /> Hall Management</button>
            <button><Users size={18} /> Security Logs</button>
            <button><Calendar size={18} /> Academic Year</button>
         </nav>
      </div>

      <main className="admin-main-v3">
         <header className="admin-header-v3">
            <div className="h-text">
               <h1>Institutional Governance</h1>
               <p>Monitoring staff performance and housing occupancy across campus.</p>
            </div>
            <div className="h-actions">
               <button className="btn-export"><Download size={16} /> Export Reports</button>
               <button className="btn-add"><Plus size={16} /> New Hall</button>
            </div>
         </header>

         <div className="admin-stats-overview">
            <div className="ov-card">
               <div className="ov-icon purple"><Users size={20} /></div>
               <div className="ov-data">
                  <h3>{stats.reduce((acc, curr) => acc + curr.total_actions, 0)}</h3>
                  <p>Total Staff Actions</p>
               </div>
            </div>
            <div className="ov-card">
               <div className="ov-icon green"><CheckCircle size={20} /></div>
               <div className="ov-data">
                  <h3>{stats.reduce((acc, curr) => acc + curr.approvals, 0)}</h3>
                  <p>Applications Verified</p>
               </div>
            </div>
            <div className="ov-card">
               <div className="ov-icon orange"><TrendingUp size={20} /></div>
               <div className="ov-data">
                  <h3>{stats.length}</h3>
                  <p>Active Staff Members</p>
               </div>
            </div>
         </div>

         <section className="admin-section-v3">
            <div className="s-header">
               <h2>Staff Performance (Live Feed)</h2>
               <div className="s-filter">
                  <Activity size={16} /> Updated Real-time
               </div>
            </div>

            {loading ? (
               <div className="admin-loader">Syncing Governance Records...</div>
            ) : (
               <div className="staff-perf-grid">
                  {stats.map((staff, idx) => (
                    <PerformanceCard key={idx} staff={staff} />
                  ))}
                  {stats.length === 0 && (
                     <div className="empty-state">No staff activity recorded in the database yet.</div>
                  )}
               </div>
            )}
         </section>
      </main>

      <style>{`
        .admin-dashboard-v3 { display: flex; min-height: 100vh; background: #f8fafc; }
        .admin-sidebar-v3 { width: 260px; background: #1e293b; color: white; padding: 30px; }
        .admin-logo-v3 { display: flex; align-items: center; gap: 12px; font-size: 1.1rem; font-weight: 800; margin-bottom: 50px; color: #7c3aed; }
        
        .admin-nav-v3 { display: flex; flex-direction: column; gap: 8px; }
        .admin-nav-v3 button { padding: 14px 18px; display: flex; align-items: center; gap: 14px; border: none; background: transparent; color: #94a3b8; font-weight: 700; cursor: pointer; border-radius: 12px; transition: 0.2s; text-align: left; }
        .admin-nav-v3 button.active, .admin-nav-v3 button:hover { background: rgba(255,255,255,0.05); color: white; }
        .admin-nav-v3 button.active { color: #7c3aed; }

        .admin-main-v3 { flex: 1; padding: 50px; overflow-y: auto; }
        .admin-header-v3 { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .h-text h1 { font-size: 2rem; margin-bottom: 5px; color: #1e293b; letter-spacing: -0.03em; }
        .h-text p { color: #64748b; font-weight: 500; }
        .h-actions { display: flex; gap: 12px; }
        .btn-export, .btn-add { padding: 10px 18px; border-radius: 10px; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; border: 1.5px solid #e2e8f0; cursor: pointer; transition: 0.2s; }
        .btn-add { background: #1e293b; color: white; border: none; }
        .btn-add:hover { background: #7c3aed; }

        .admin-stats-overview { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
        .ov-card { background: white; padding: 24px; border-radius: 20px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; }
        .ov-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .ov-icon.purple { background: #f5f3ff; color: #7c3aed; }
        .ov-icon.green { background: #f0fdf4; color: #16a34a; }
        .ov-icon.orange { background: #fff7ed; color: #ea580c; }
        .ov-data h3 { font-size: 1.5rem; color: #1e293b; }
        .ov-data p { font-size: 0.8rem; color: #64748b; font-weight: 600; }

        .s-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .s-header h2 { font-size: 1.25rem; }
        .s-filter { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 800; color: #16a34a; background: #f0fdf4; padding: 6px 14px; border-radius: 99px; }

        .staff-perf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .staff-perf-card { background: white; padding: 24px; border-radius: 20px; border: 1px solid #e2e8f0; transition: 0.3s; }
        .staff-perf-card:hover { transform: translateY(-5px); border-color: #7c3aed; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .perf-top { display: flex; align-items: center; gap: 15px; margin-bottom: 24px; position: relative; }
        .perf-avatar { width: 44px; height: 44px; background: #7c3aed; color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; }
        .perf-meta h4 { font-size: 1rem; color: #1e293b; }
        .perf-meta p { font-size: 0.75rem; color: #64748b; }
        .perf-badge { position: absolute; top: 0; right: 0; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; }
        .perf-badge.high { background: #f0fdf4; color: #16a34a; }
        .perf-badge.mid { background: #fff7ed; color: #ea580c; }

        .perf-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
        .p-stat { display: flex; flex-direction: column; gap: 4px; }
        .p-label { font-size: 0.65rem; color: #94a3b8; font-weight: 800; text-transform: uppercase; }
        .p-value { font-size: 1rem; font-weight: 800; color: #1e293b; }

        .perf-progress-bar { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
        .p-fill { height: 100%; background: #7c3aed; border-radius: 3px; }

        .admin-loader { text-align: center; padding: 50px; color: #64748b; font-weight: 700; }
        .empty-state { grid-column: 1/-1; padding: 50px; text-align: center; background: #f1f5f9; border-radius: 20px; color: #64748b; font-weight: 600; }
      `}</style>
    </div>
  );
};

export default InstitutePanel;
