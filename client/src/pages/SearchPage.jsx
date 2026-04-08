import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, MapPin, Star, Filter, Search as SearchIcon, 
  ChevronRight, Heart, Users, TrendingUp, Info, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRequest } from '../services/api';

const SearchPage = () => {
  const [filter, setFilter] = useState('all');
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      try {
        const data = await getRequest('/hostels');
        if (data.error) throw new Error(data.error);

        // Map backend data to frontend UI fields (with fallback mocks for design)
        const formattedData = data.map(h => ({
          id: h.id,
          name: h.name,
          type: h.type === 'boys' ? 'Boys Hostel' : h.type === 'girls' ? 'Girls Hostel' : 'Mixed Stay',
          price: "12,400", // Mock for demo, should be in DB later
          location: "Near Main Gate",
          rating: (4.2 + Math.random() * 0.8).toFixed(1),
          capacity: h.total_capacity,
          available_rooms: h.available_rooms,
          availableFrom: h.available_rooms > 0 ? `${h.available_rooms} Rooms Available` : 'No Rooms Available', // dynamically populate this
          amenities: ["Free Wi-Fi", "Laundry", "Gym"],
          image: "/hostel-room.png" 
        }));
        setHostels(formattedData);
      } catch (err) {
        setError('Failed to load listings. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  const filtered = hostels.filter(h => {
    if (filter === 'all') return true;
    if (filter === 'boys') return h.type.toLowerCase().includes('boys');
    if (filter === 'girls') return h.type.toLowerCase().includes('girls');
    return true;
  });

  return (
    <div className="search-page-v2">
      <div className="container">
        {/* Header Section */}
        <header className="search-header-v2">
          <div className="header-content-v2">
             <div className="badge-v2"><TrendingUp size={14} /> <span>High Demand: {hostels.length} Stays Found</span></div>
             <h1>Explore Premium Stays</h1>
             <p>All-inclusive student housing with smart allocation features.</p>
          </div>
          
          <div className="search-controls-v2">
            <div className="search-bar-v2">
              <SearchIcon size={20} color="#94a3b8" />
              <input type="text" placeholder="Search by name or college..." />
            </div>
            
            <div className="segmented-filter">
               <button className={`filter-option ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                 <span>All</span>
               </button>
               <button className={`filter-option ${filter === 'boys' ? 'active' : ''}`} onClick={() => setFilter('boys')}>
                 <Users size={16} className="filter-icon" />
                 <span>Boys</span>
               </button>
               <button className={`filter-option ${filter === 'girls' ? 'active' : ''}`} onClick={() => setFilter('girls')}>
                 <Heart size={16} className="filter-icon" />
                 <span>Girls</span>
               </button>
            </div>
          </div>
        </header>

        {/* Results Grid */}
        <div className="results-layout-v2">
          {loading ? (
            <div className="loading-state-v2">
               <div className="spinner-v2"></div>
               <p>Searching best stays for you...</p>
            </div>
          ) : error ? (
            <div className="error-card-v2">
               <Info size={32} />
               <h3>{error}</h3>
               <p>Make sure your MySQL backend is running on http://localhost:5000</p>
            </div>
          ) : (
            <div className="grid grid-3">
              <AnimatePresence>
                {filtered.map((room, index) => (
                  <motion.div 
                    key={room.id}
                    className="card room-card-v2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="card-image-wrapper">
                       <img src="/hostel-room.png" alt={room.name} />
                       <div className="price-tag">₹{room.price} <span>/mo</span></div>
                    </div>
                    <div className="card-body-v2">
                       <div className="card-top-v2">
                          <span className="room-type-tag">{room.type}</span>
                          <div className="rating-pill-v2"><Star size={12} fill="currentColor" /> {room.rating}</div>
                       </div>
                       <h3>{room.name}</h3>
                       <div className="card-loc-v2"><MapPin size={14} /> {room.location}</div>
                       <div className="date-availability-v3">
                          <Zap size={12} color={room.available_rooms > 0 ? "#10b981" : "#ef4444"} fill={room.available_rooms > 0 ? "#10b981" : "#ef4444"} />
                          <span style={{color: room.available_rooms > 0 ? 'inherit' : '#ef4444'}}>{room.availableFrom}</span>
                       </div>
                       
                       <div className="amenity-strip-v2">
                          {room.amenities.map(a => <span key={a} className="amenity-dot">{a}</span>)}
                       </div>

                       <div className="card-footer-v2">
                          <div className="capacity-info">
                             <Users size={14} />
                             <span>Capacity: {room.capacity} Labs</span>
                          </div>
                          <Link to={`/property/${room.id}`} className="btn-icon-v2">
                             <ChevronRight size={18} />
                          </Link>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .search-page-v2 { padding: 4rem 0; background: var(--bg-main); min-height: 100vh; }
        .search-header-v2 { margin-bottom: 4rem; }
        .header-content-v2 h1 { font-size: 3rem; font-weight: 800; letter-spacing: -0.03em; margin: 0.75rem 0; }
        .header-content-v2 p { font-size: 1.15rem; color: var(--text-muted); font-weight: 500; }
        .badge-v2 { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: rgba(124, 58, 237, 0.1); color: var(--primary); border-radius: 9999px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; }
        
        .search-controls-v2 { display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; gap: 2rem; }
        .search-bar-v2 { flex: 1; max-width: 500px; position: relative; background: var(--bg-card); padding: 0.85rem 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 12px; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
        .search-bar-v2 input { border: none; outline: none; background: transparent; font-weight: 600; font-size: 1rem; width: 100%; color: var(--text-main); }

        .loading-state-v2 { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 6rem 0; gap: 1.5rem; }
        .spinner-v2 { width: 40px; height: 40px; border: 4px solid var(--bg-alt); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s infinite linear; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .error-card-v2 { grid-column: 1 / -1; background: #fff1f2; color: #be123c; padding: 3rem; border-radius: 24px; text-align: center; border: 1px solid #fecdd3; }
        .error-card-v2 h3 { font-size: 1.5rem; margin: 1rem 0 0.5rem; }

        .room-card-v2 { overflow: hidden; height: 100%; display: flex; flex-direction: column; }
        .card-image-v2 { position: relative; height: 200px; overflow: hidden; }
        .card-image-v2 img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .room-card-v2:hover .card-image-v2 img { transform: scale(1.1); }
        .price-badge-v2 { position: absolute; bottom: 16px; left: 16px; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(8px); color: white; padding: 6px 14px; border-radius: 8px; font-weight: 800; font-size: 1.15rem; }
        .price-badge-v2 span { font-size: 0.7rem; font-weight: 600; opacity: 0.8; }

        .card-body-v2 { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .card-top-v2 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .room-type-tag { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--primary); background: rgba(124, 58, 237, 0.1); padding: 4px 10px; border-radius: 6px; }
        .rating-pill-v2 { display: flex; align-items: center; gap: 4px; font-weight: 800; font-size: 0.85rem; }
        .card-body-v2 h3 { font-size: 1.25rem; margin-bottom: 0.5rem; letter-spacing: -0.01em; }
        .card-loc-v2 { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; }
        
        .amenity-strip-v2 { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 1.5rem; }
        .amenity-dot { font-size: 0.7rem; font-weight: 700; color: #475569; background: var(--bg-alt); padding: 3px 10px; border-radius: 9999px; }

        .card-footer-v2 { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 1rem; margin-top: auto; }
        .capacity-info { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }
        .btn-icon-v2 { width: 36px; height: 36px; border-radius: 10px; background: var(--bg-alt); display: flex; align-items: center; justify-content: center; color: var(--primary); text-decoration: none; transition: all 0.2s; }
        .btn-icon-v2:hover { background: var(--primary); color: white; transform: rotate(-45deg); }

        @media (max-width: 768px) {
           .search-controls-v2 { flex-direction: column; align-items: stretch; }
           .search-bar-v2 { max-width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
