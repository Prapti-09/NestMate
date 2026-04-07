import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, MapPin, Clock, ShieldCheck, Check, 
  Wifi, Coffee, Utensils, Zap, Users, Info, 
  ArrowLeft, Share2, Heart, MessageCircle, 
  Bike, Car, Bus, Footprints, Plus, Minus,
  Eye, Calendar, GraduationCap, Phone
} from 'lucide-react';
import { postRequest } from '../services/api';

const Amenity = ({ icon: Icon, label }) => (
  <div className="amenity-item">
    <div className="amenity-icon"><Icon size={18} /></div>
    <span>{label}</span>
  </div>
);

const TravelTime = ({ icon: Icon, label, time, active }) => (
  <div className={`travel-time-card ${active ? 'active' : ''}`}>
    <Icon size={24} className="travel-icon" />
    <div className="travel-info">
      <span className="method">{label}</span>
      <span className="time">{time} min</span>
    </div>
  </div>
);

function PropertyDetails() {
  const { id } = useParams();
  const [numRoommates, setNumRoommates] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const basePrice = 12500;
  
  const totalPrice = basePrice / numRoommates;

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        alert("Please login as a student to book.");
        window.location.href = '/login';
        return;
      }

      const bookingData = {
        user_id: userData.id,
        hostel_id: id,
        hostel_name: "The Urban Living PG", // Should be dynamic from state/props
        room_type: numRoommates === 1 ? "Single" : "Shared",
        monthly_payment: totalPrice,
        status: 'received'
      };

      const response = await postRequest('/applications', bookingData);
      if (response.error) throw new Error(response.error);

      alert("Booking Request Received! Check your dashboard for the live tracker.");
      window.location.href = '/dashboard#bookings';
    } catch (err) {
      alert("Booking failed: " + err.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="property-details-page">
      <div className="property-hero-gallery">
        <div className="container gallery-container">
          <Link to="/" className="back-floating-btn">
             <ArrowLeft size={18} /> <span>Back</span>
          </Link>
          <div className="main-image-wrap">
             <img src="/hostel-room.png" alt="Room" />
          </div>
          <div className="side-images">
             <img src="/hostel-room.png" alt="Bed View" />
             <div className="more-images-overlay">
                <img src="/hostel-room.png" alt="Lobby" />
                <div className="overlay-content"><Plus size={24} /> <span>12+ Photos</span></div>
             </div>
          </div>
        </div>
      </div>

      <div className="container details-layout">
        <main className="details-main-content">
          <header className="details-header">
            <div className="header-left">
              <div className="gender-tag girl">Girls Only Stay</div>
              <h1>The Urban Living PG</h1>
              <div className="header-meta">
                 <div className="meta-item location"><MapPin size={18} /> <span>Near SRM University, Chennai</span></div>
                 <div className="meta-item rating"><Star size={18} fill="#fbbf24" color="#fbbf24" /> <span>4.8 (124 reviews)</span></div>
              </div>
            </div>
            <div className="header-actions">
               <button className="action-btn"><Share2 size={20} /></button>
               <button className="action-btn"><Heart size={20} /></button>
            </div>
          </header>

          <section className="info-section">
            <h2 className="section-title-sm">Description</h2>
            <p className="description-text">
              Unmatched comfort in the heart of the SRM student hub. This premium PG offers 
              modern air-conditioned rooms, healthy home-style meals, and high-speed fiber-optic WiFi. 
              Our priority is providing a safe, focus-driven environment where students can thrive. 
              Each floor is monitored by 24/7 security and housekeeping service.
            </p>
            <div className="live-visitor-count"><Eye size={16} /> <span>Currently, 5 other students are viewing this property.</span></div>
          </section>

          <section className="info-section">
            <h2 className="section-title-sm">Travel to Campus</h2>
            <div className="travel-grid">
              <TravelTime icon={Footprints} label="Walking" time={8} active />
              <TravelTime icon={Bike} label="Bike" time={3} />
              <TravelTime icon={Bus} label="Bus" time={5} />
              <TravelTime icon={Car} label="Car" time={4} />
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title-sm">Key Amenities</h2>
            <div className="amenities-grid">
               <Amenity icon={Wifi} label="Gigabit WiFi" />
               <Amenity icon={Utensils} label="Tiffin Service" />
               <Amenity icon={Check} label="Daily Cleaning" />
               <Amenity icon={ShieldCheck} label="24/7 Security" />
               <Amenity icon={Coffee} label="Coffee Lounge" />
               <Amenity icon={Zap} label="Backup Power" />
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title-sm">Reviews</h2>
            <div className="review-card-modern">
               <div className="reviewer-top">
                  <div className="profile-img">A</div>
                  <div className="profile-info">
                     <h3>Aniket Verma</h3>
                     <p><GraduationCap size={14} /> 2nd Year CSE</p>
                  </div>
                  <div className="review-stars-pill"><Star size={14} fill="#fbbf24" color="#fbbf24" /> <span>5.0</span></div>
               </div>
               <p className="review-body">
                  "The internet speed is amazing for late-night project deadlines. 
                  The management is very responsive, and the food actually tastes like home."
               </p>
               <span className="review-date"><Calendar size={14} /> Posted 2 days ago</span>
            </div>
          </section>
        </main>

        <aside className="details-sidebar">
           <div className="card booking-sticky-card">
              <div className="price-header">
                 <div className="price-big">₹{basePrice} <span className="unit">/mo</span></div>
                 <div className="verified-seal"><ShieldCheck size={16} /> <span>Verified</span></div>
              </div>

              <div className="split-calculator">
                 <label>Split cost with roommates</label>
                 <div className="counter">
                    <button onClick={() => setNumRoommates(Math.max(1, numRoommates - 1))} className="counter-btn"><Minus size={18} /></button>
                    <span className="counter-val">{numRoommates} {numRoommates === 1 ? 'Person' : 'People'}</span>
                    <button onClick={() => setNumRoommates(Math.min(4, numRoommates + 1))} className="counter-btn"><Plus size={18} /></button>
                 </div>
                 {numRoommates > 1 && (
                    <div className="per-person-box animate-fade-in">
                       <span>Total per person:</span>
                       <h3>₹{totalPrice.toLocaleString()}</h3>
                    </div>
                 )}
              </div>

              <div className="cta-group">
                 <button 
                   className={`btn btn-primary w-full ${!isBooking ? 'pulse-animation' : ''}`}
                   onClick={handleBooking}
                   disabled={isBooking}
                 >
                   {isBooking ? 'Processing Request...' : 'Request Booking'}
                 </button>
                 <button className="btn btn-outline w-full"><Phone size={18} /> <span>Call Manager</span></button>
              </div>

              <div className="urgency-label">
                <Zap size={14} /> <span>Only 2 rooms left for this semester!</span>
              </div>
           </div>

           <div className="card info-addon-card">
              <h3>Included Add-ons</h3>
              <div className="addon-item">
                 <div className="addon-icon"><Utensils size={18} /></div>
                 <div className="addon-text">
                    <h4>Premium Tiffin</h4>
                    <p>Veg / Non-veg available</p>
                 </div>
                 <span className="addon-price">Free</span>
              </div>
              <div className="addon-item">
                 <div className="addon-icon"><MessageCircle size={18} /></div>
                 <div className="addon-text">
                    <h4>Internal Chat</h4>
                    <p>Connect with flatmates</p>
                 </div>
                 <Plus size={18} className="addon-add" />
              </div>
           </div>
        </aside>
      </div>

      <style>{`
        .property-details-page { background: #f8fafc; padding-bottom: 6rem; }
        .property-hero-gallery { background: white; padding: 2.5rem 0; border-bottom: 1px solid var(--border-light); }
        .gallery-container { display: grid; grid-template-columns: 1.8fr 1fr; gap: 1.5rem; height: 500px; position: relative; }
        .back-floating-btn { position: absolute; top: 1.5rem; left: 3.5rem; z-index: 10; background: rgba(255, 255, 255, 0.95); padding: 0.6rem 1.25rem; border-radius: 9999px; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; color: #1e293b; font-weight: 700; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 1px solid var(--border-light); }
        .main-image-wrap img { width: 100%; height: 100%; object-fit: cover; border-radius: 24px; }
        .side-images { display: grid; grid-template-rows: 1fr 1fr; gap: 1.5rem; }
        .side-images img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
        .more-images-overlay { position: relative; }
        .overlay-content { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); border-radius: 20px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: white; font-weight: 800; cursor: pointer; }
        .details-layout { display: grid; grid-template-columns: 1.8fr 1fr; gap: 4rem; margin-top: 3.5rem; }
        .details-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
        .gender-tag { display: inline-block; padding: 4px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 1rem; }
        .gender-tag.girl { background: #fee2e2; color: #dc2626; }
        .details-header h1 { font-size: 2.75rem; }
        .header-meta { display: flex; gap: 2rem; margin-top: 1rem; }
        .meta-item { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--text-muted); }
        .header-actions { display: flex; gap: 1rem; }
        .action-btn { width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--border-light); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .action-btn:hover { background: #f8fafc; border-color: var(--primary); color: var(--primary); }
        .section-title-sm { font-size: 1.35rem; margin-bottom: 1.5rem; }
        .info-section { margin-bottom: 4rem; }
        .description-text { font-size: 1.125rem; color: #475569; line-height: 1.8; }
        .live-visitor-count { display: inline-flex; align-items: center; gap: 0.5rem; padding: 8px 16px; background: #fffbeb; border: 1px solid #fef3c7; color: #b45309; border-radius: 9999px; font-size: 0.875rem; font-weight: 700; margin-top: 1.5rem; }
        .travel-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .travel-time-card { padding: 1.5rem; background: white; border-radius: var(--radius-lg); text-align: center; border: 2px solid transparent; box-shadow: var(--shadow-sm); }
        .travel-time-card.active { border-color: var(--primary); background: #f5f3ff; }
        .travel-icon { margin-bottom: 0.75rem; color: #94a3b8; }
        .active .travel-icon { color: var(--primary); }
        .travel-info .method { display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #94a3b8; }
        .travel-info .time { font-size: 1.5rem; font-weight: 800; color: #1e293b; }
        .amenities-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .amenity-item { display: flex; align-items: center; gap: 1.25rem; font-weight: 600; color: #334155; }
        .amenity-icon { width: 40px; height: 40px; background: #f1f5f9; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary); }
        .review-card-modern { background: white; padding: 2rem; border-radius: 24px; box-shadow: var(--shadow-sm); }
        .reviewer-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .profile-img { width: 50px; height: 50px; background: var(--gradient-main); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; }
        .profile-info h3 { font-size: 1.1rem; }
        .profile-info p { font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; font-weight: 600; }
        .review-stars-pill { margin-left: auto; background: #fefce8; padding: 4px 12px; border-radius: 9999px; font-weight: 700; color: #854d0e; }
        .review-body { color: #475569; line-height: 1.6; margin-bottom: 1.5rem; }
        .review-date { font-size: 0.8rem; font-weight: 600; color: #94a3b8; display: flex; align-items: center; gap: 0.4rem; }
        .booking-sticky-card { position: sticky; top: 120px; padding: 2rem; }
        .price-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .price-big { font-size: 2.25rem; font-weight: 800; }
        .price-big .unit { font-size: 1rem; color: #64748b; font-weight: 500; }
        .verified-seal { display: flex; align-items: center; gap: 0.5rem; background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 800; }
        .split-calculator { background: #f1f5f9; padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem; }
        .split-calculator label { display: block; font-size: 0.875rem; font-weight: 700; color: #64748b; margin-bottom: 1rem; }
        .counter { display: flex; justify-content: space-between; align-items: center; background: white; padding: 8px; border-radius: 12px; margin-bottom: 1.25rem; }
        .counter-btn { width: 40px; height: 40px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .counter-btn:hover { background: var(--bg-main); border-color: var(--primary); }
        .counter-val { font-weight: 800; font-size: 1rem; }
        .per-person-box h3 { color: var(--primary); font-size: 1.75rem; margin-top: 0.25rem; }
        .pulse-animation { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); } 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); } }
        .cta-group { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .urgency-label { display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--error); font-size: 0.85rem; font-weight: 700; }
        .info-addon-card { padding: 1.5rem; margin-top: 2rem; }
        .info-addon-card h3 { margin-bottom: 1.5rem; }
        .addon-item { display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #f1f5f9; }
        .addon-icon { width: 36px; height: 36px; background: #eff6ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #2563eb; }
        .addon-text h4 { font-size: 0.95rem; }
        .addon-text p { font-size: 0.75rem; color: #94a3b8; }
        .addon-price { font-weight: 800; color: var(--success); margin-left: auto; }
        .addon-add { margin-left: auto; cursor: pointer; color: var(--primary); }
        @media (max-width: 1024px) { .gallery-container { grid-template-columns: 1fr; height: auto; } .main-image-wrap { height: 400px; } .side-images { display: none; } .details-layout { grid-template-columns: 1fr; gap: 4rem; } .details-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; } .booking-sticky-card { position: static; } }
        @media (max-width: 768px) { .details-sidebar { grid-template-columns: 1fr; } .travel-grid { grid-template-columns: 1fr 1fr; } .amenities-grid { grid-template-columns: 1fr 1fr; } .header-left h1 { font-size: 1.75rem; } }
      `}</style>
    </div>
  );
}

export default PropertyDetails;
