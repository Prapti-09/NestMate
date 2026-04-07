import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Users, Info, 
  Search, ShieldCheck, Wifi, Coffee, 
  ChevronRight, Bookmark, Filter, School,
  Sparkles, CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRequest } from '../services/api';

const AcademicBadge = ({ text, type = 'info' }) => {
  const styles = {
    safety: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    distance: 'bg-blue-50 text-blue-700 border-blue-100',
    facility: 'bg-purple-50 text-purple-700 border-purple-100',
    info: 'bg-slate-50 text-slate-600 border-slate-100'
  };
  return (
    <span className={`academic-badge ${styles[type]}`}>
      {text}
    </span>
  );
};

const SearchPage = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const data = await getRequest('/hostels');
        if (Array.isArray(data)) setHostels(data);
      } catch (err) {
        console.error('Fetch failed');
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  const filteredHostels = hostels.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || h.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="explore-page-v3">
      {/* Dynamic Campus Header */}
      <section className="campus-header-v3">
        <div className="container">
           <div className="header-flex-v3">
              <div className="header-text-v3">
                 <div className="uni-pill"><School size={14} /> University Managed Housing</div>
                 <h1>Find Your Campus Wing</h1>
                 <p>Secure, connected, and compatible student residencies across departments.</p>
              </div>
              <div className="search-bar-v3">
                 <Search className="search-icon-v3" />
                 <input 
                    type="text" 
                    placeholder="Search Halls, Wings or Departments..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>
        </div>
      </section>

      <div className="container">
        {/* Academic Filters */}
        <div className="hall-filters-v3">
           <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All Blocks</button>
           <button onClick={() => setFilter('boys')} className={filter === 'boys' ? 'active' : ''}>Boys Wing</button>
           <button onClick={() => setFilter('girls')} className={filter === 'girls' ? 'active' : ''}>Girls Wing</button>
           <button onClick={() => setFilter('mixed')} className={filter === 'mixed' ? 'active' : ''}>Mixed Blocks</button>
        </div>

        {loading ? (
          <div className="academic-loader">
             <div className="pulse-disc"></div>
             <p>Syncing Registry...</p>
          </div>
        ) : (
          <div className="hostel-grid-v3">
            {filteredHostels.map(hostel => (
              <motion.div 
                key={hostel.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hall-card-v3"
              >
                <div className="hall-image-v3">
                   <div className="hall-type-overlay">{hostel.type.toUpperCase()} ONLY</div>
                   {/* Using university building style icons/patterns instead of hotel photos */}
                   <div className="academic-pattern-bg">
                      <Building2 size={48} />
                   </div>
                </div>

                <div className="hall-content-v3">
                   <div className="hall-title-row">
                      <h3>{hostel.name}</h3>
                      <div className="match-score">
                         <Sparkles size={14} />
                         <span>98% Match</span>
                      </div>
                   </div>

                   <p className="hall-stats-v3">
                      <span><Users size={14} /> {hostel.total_capacity} Capacity</span>
                      <span><CheckCircle size={14} /> Verified Hall</span>
                   </p>

                   <div className="badge-cloud-v3">
                      <AcademicBadge text="Walk to Library" type="distance" />
                      <AcademicBadge text="Mess Included" type="facility" />
                      <AcademicBadge text="24/7 Security" type="safety" />
                      <AcademicBadge text="Edu-Wifi" type="facility" />
                   </div>

                   <div className="hall-footer-v3">
                      <div className="price-stack">
                         <span className="price-val">₹{Math.floor(hostel.total_capacity * 150 / hostel.total_rooms)}</span>
                         <span className="price-unit">per semester</span>
                      </div>
                      <Link to={`/hostel/${hostel.id}`} className="btn-apply-v3">
                         View Details <ChevronRight size={16} />
                      </Link>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .explore-page-v3 { padding-bottom: 5rem; background: #f8fafc; min-height: 100vh; }
        .campus-header-v3 { background: #1e293b; padding: 4rem 0; color: white; margin-bottom: 3rem; }
        .uni-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); padding: 6px 14px; border-radius: 99px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 20px; color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); }
        .header-flex-v3 { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; }
        .header-text-v3 h1 { font-size: 2.5rem; letter-spacing: -0.04em; margin-bottom: 10px; }
        .header-text-v3 p { font-size: 1.1rem; color: #94a3b8; }
        
        .search-bar-v3 { position: relative; width: 100%; max-width: 400px; }
        .search-icon-v3 { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: #64748b; }
        .search-bar-v3 input { width: 100%; padding: 18px 20px 18px 56px; background: white; border: none; border-radius: 16px; color: #1e293b; font-weight: 600; font-size: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }

        .hall-filters-v3 { display: flex; gap: 12px; margin-bottom: 2.5rem; overflow-x: auto; padding-bottom: 10px; }
        .hall-filters-v3 button { white-space: nowrap; padding: 10px 20px; border-radius: 99px; border: 2px solid #e2e8f0; background: white; color: #64748b; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .hall-filters-v3 button.active { border-color: #7c3aed; background: #7c3aed; color: white; }

        .hostel-grid-v3 { display: grid; grid-template-columns: repeat(auto-fill, min-minmax(350px, 1fr)); gap: 2rem; }
        .hall-card-v3 { background: white; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; transition: 0.3s; }
        .hall-card-v3:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        
        .hall-image-v3 { height: 200px; position: relative; background: #f1f5f9; display: flex; align-items: center; justify-content: center; }
        .hall-type-overlay { position: absolute; top: 20px; left: 20px; background: white; padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 800; color: #7c3aed; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .academic-pattern-bg { width: 100%; height: 100%; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); display: flex; align-items: center; justify-content: center; color: #94a3b8; }

        .hall-content-v3 { padding: 24px; }
        .hall-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .hall-title-row h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; }
        .match-score { display: flex; align-items: center; gap: 6px; background: #f5f3ff; color: #7c3aed; padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 800; }

        .hall-stats-v3 { display: flex; gap: 20px; color: #64748b; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; }
        .hall-stats-v3 span { display: flex; align-items: center; gap: 8px; }

        .badge-cloud-v3 { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
        .academic-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; border: 1px solid; }

        .hall-footer-v3 { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid #f1f5f9; }
        .price-val { font-size: 1.5rem; font-weight: 800; color: #1e293b; display: block; }
        .price-unit { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
        .btn-apply-v3 { display: flex; align-items: center; gap: 8px; background: #1e293b; color: white; padding: 10px 18px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 0.85rem; transition: 0.2s; }
        .btn-apply-v3:hover { background: #7c3aed; transform: scale(1.05); }

        .academic-loader { display: flex; flex-direction: column; align-items: center; padding: 100px 0; gap: 20px; }
        .pulse-disc { width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; animation: academic-pulse 1.5s infinite ease-in-out; }
        @keyframes academic-pulse { 0% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.8); opacity: 0.5; } }

        @media (max-width: 768px) {
           .header-flex-v3 { flex-direction: column; align-items: flex-start; }
           .search-bar-v3 { max-width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
