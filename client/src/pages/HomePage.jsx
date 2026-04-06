import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Clock, Star, TrendingUp, 
  ShieldCheck, Zap, ArrowRight, DollarSign, 
  Users, Building, Home, Filter, Heart 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ["All Stays", "Institute Hostels", "PG / Private Hostels", "Independent Rooms"];

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card feature-card">
    <div className="icon-wrapper">
      <Icon size={28} color="#7c3aed" />
    </div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
    <p style={{ fontSize: '0.95rem', color: '#64748b' }}>{description}</p>
  </div>
);

const PropertyCard = ({ image, price, title, travelTime, rating, type, gender, tags }) => (
  <motion.div 
    className="card property-card"
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    <div className="card-image-container">
      <img src={image} alt={title} className="property-image" />
      <div className="card-badge-top">
        <span className={`tag ${gender === 'Girls' ? 'tag-orange' : 'tag-blue'}`}>{gender === 'Girls' ? 'Girls Only' : 'Boys Only'}</span>
      </div>
      <button className="heart-btn"><Heart size={20} /></button>
    </div>
    <div className="card-body">
      <div className="card-type">{type}</div>
      <h3 className="card-title">{title}</h3>
      <div className="card-rating">
        <Star size={16} fill="#fbbf24" color="#fbbf24" />
        <span>{rating}</span>
        <span className="reviews">(124 reviews)</span>
      </div>
      <div className="card-footer">
        <div className="price-tag">
          ₹{price} <span className="unit">/mo</span>
        </div>
        <div className="property-meta">
          <Clock size={16} />
          <span>{travelTime}</span>
        </div>
      </div>
      <div className="card-tags">
        {tags.map((tag, idx) => (
          <span key={idx} className={`tag ${tag === 'Near College' ? 'tag-green' : 'tag-blue'}`}>{tag}</span>
        ))}
      </div>
      <Link to="/property/1" className="btn btn-outline card-cta">
        See Details <ArrowRight size={18} />
      </Link>
    </div>
  </motion.div>
);

const mockProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555854817-5b233633e085?auto=format&fit=crop&q=80&w=800",
    price: "12,500",
    title: "The Urban Living PG",
    type: "PG / Private Hostel",
    gender: "Boys",
    travelTime: "8 min walk",
    rating: 4.8,
    tags: ["Near College", "Best Value"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800",
    price: "8,900",
    title: "Sterling Institute Hostel",
    type: "Institute Hostel",
    gender: "Girls",
    travelTime: "2 min walk",
    rating: 4.5,
    tags: ["Managed by Inst.", "Low Cost"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    price: "18,200",
    title: "Elite Studio Apartment",
    type: "Independent Room",
    gender: "Boys",
    travelTime: "12 min walk",
    rating: 4.9,
    tags: ["AC Included", "High Speed WiFi"]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    price: "10,500",
    title: "Greenwood Female Stay",
    type: "PG / Private Hostel",
    gender: "Girls",
    travelTime: "5 min walk",
    rating: 4.7,
    tags: ["CCTV Secured", "Food Included"]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=800",
    price: "14,000",
    title: "Modern Executive PG",
    type: "PG / Private Hostel",
    gender: "Boys",
    travelTime: "10 min walk",
    rating: 4.6,
    tags: ["Gym Access", "Laundry Service"]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1536376074432-8aa63004052a?auto=format&fit=crop&q=80&w=800",
    price: "9,500",
    title: "Pinnacle Girls Residence",
    type: "Institute Hostel",
    gender: "Girls",
    travelTime: "4 min walk",
    rating: 4.4,
    tags: ["Low cost", "Strict Rules"]
  }
];

function HomePage() {
  const [activeGender, setActiveGender] = useState("All");

  return (
    <div className="home-page">
      {/* 2. HERO SECTION REDESIGN */}
      <section className="hero-section">
        <div className="container hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your Perfect <br />
            <span className="logo-student">Student Stay.</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Book verified PGs, hostels, and rooms near your college. 
            Exclusive roommate compatibility included.
          </motion.p>

          {/* 3. SEARCH BAR FIX */}
          <motion.div 
            className="search-row-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="search-row">
              <div className="input-group">
                <MapPin size={22} className="input-icon" />
                <input type="text" placeholder="Enter college name" />
              </div>
              <div className="divider-vertical"></div>
              <div className="input-group">
                <DollarSign size={22} className="input-icon" />
                <select>
                  <option>Select Budget</option>
                  <option>₹5,000 - ₹10,000</option>
                  <option>₹10,000 - ₹15,000</option>
                  <option>₹15,000+</option>
                </select>
              </div>
              <div className="divider-vertical"></div>
              <div className="input-group">
                <Building size={22} className="input-icon" />
                <select>
                  <option>Choose Type</option>
                  <option>Hostel</option>
                  <option>PG</option>
                  <option>Independent</option>
                </select>
              </div>
              <button className="btn btn-primary search-main-btn">
                <Search size={22} />
                <span>Search</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. GENDER FILTER UPGRADE */}
      <div className="container filter-navigation" style={{ marginBottom: '-3rem', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <div className="segmented-filter">
          <button 
            className={`filter-option ${activeGender === 'All' ? 'active' : ''}`}
            onClick={() => setActiveGender('All')}
          >
            <Users className="filter-icon" />
            <span>All Stays</span>
          </button>
          <button 
            className={`filter-option ${activeGender === 'Boys Stays' ? 'active' : ''}`}
            onClick={() => setActiveGender('Boys Stays')}
          >
            <TrendingUp className="filter-icon" />
            <span>Boys</span>
          </button>
          <button 
            className={`filter-option ${activeGender === 'Girls Stays' ? 'active' : ''}`}
            onClick={() => setActiveGender('Girls Stays')}
          >
            <Heart className="filter-icon" />
            <span>Girls</span>
          </button>
        </div>
      </div>

      {/* 9. SECTION DESIGN - NEAR COLLEGE */}
      <section className="container section-spacing">
        <div className="section-header">
          <div className="section-title">
            <h2>Near Your College</h2>
            <p>Walking distance from top institutes</p>
          </div>
          <Link to="/search" className="view-all-link">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-3">
          {mockProperties.slice(0, 3).map(p => (
            <PropertyCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      {/* 9. SECTION DESIGN - BUDGET FRIENDLY */}
      <section className="container section-spacing" style={{ backgroundColor: '#ffffff', borderRadius: '40px', padding: '5rem 2rem', marginTop: '4rem' }}>
        <div className="section-header">
          <div className="section-title">
            <h2>Budget Friendly</h2>
            <p>Best quality under your budget</p>
          </div>
          <Link to="/search" className="view-all-link">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-3">
          {mockProperties.slice(3, 6).map(p => (
            <PropertyCard key={p.id} {...p} />
          ))}
        </div>
      </section>

      <section className="container section-spacing" style={{ textAlign: 'center' }}>
        <div className="cta-banner">
          <h2>Managing a Hostel?</h2>
          <p>Join the largest student housing platform for institutes.</p>
          <Link to="/institute" className="btn btn-primary" style={{ marginTop: '2rem' }}>Institute Enrollment</Link>
        </div>
      </section>

      <style>{`
        .section-spacing {
          margin-top: 6rem;
        }

        .hero-section {
          background: radial-gradient(circle at 75% 20%, rgba(124, 58, 237, 0.08) 0%, transparent 40%),
                      radial-gradient(circle at 25% 80%, rgba(249, 115, 22, 0.08) 0%, transparent 40%);
          padding: 8rem 0 6rem;
          text-align: center;
          border-bottom: 1px solid rgba(0,0,0,0.03);
        }

        .hero-content {
          max-width: 900px !important;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin: 1.5rem auto 3rem;
          color: #64748b;
          max-width: 600px;
        }

        .search-row-container {
          background: white;
          padding: 8px;
          border-radius: 20px;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.15);
          border: 1px solid var(--border-light);
        }

        .search-row {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .divider-vertical {
          width: 1px;
          height: 32px;
          background: #e2e8f0;
          margin: 0 8px;
        }

        .input-group {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 1.25rem;
          gap: 0.75rem;
        }

        .input-icon {
          color: var(--primary);
          opacity: 0.8;
        }

        .input-group input, .input-group select {
          border: none;
          outline: none;
          width: 100%;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-main);
          background: transparent;
        }

        .search-main-btn {
          padding: 1rem 2.5rem;
          border-radius: 14px;
        }

        .cta-banner {
          background: #0f172a;
          color: white;
          padding: 5rem 3rem;
          border-radius: 40px;
          text-align: center;
        }

        .cta-banner h2 { color: white; margin-bottom: 1rem; }
        .cta-banner p { color: #94a3b8; font-size: 1.125rem; }

        /* 4. PROPERTY CARDS */
        .card-image-container {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .property-card:hover .property-image {
          transform: scale(1.1);
        }

        .heart-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .heart-btn:hover {
          color: var(--error);
          background: white;
        }

        .card-badge-top {
          position: absolute;
          top: 1rem;
          left: 1rem;
        }

        .card-body {
          padding: 1.5rem;
        }

        .card-type {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #0f172a;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .reviews {
          color: #94a3b8;
          font-weight: 500;
          margin-left: 0.25rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
          margin-bottom: 1.25rem;
        }

        .price-tag {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
        }

        .price-tag .unit { font-size: 0.9rem; color: #64748b; font-weight: 500; }

        .property-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
        }

        .card-tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .card-cta {
          width: 100%;
          justify-content: center;
          gap: 1rem;
          padding: 0.75rem;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .search-row {
            flex-direction: column;
            padding: 1rem;
          }
          .divider-vertical {
            width: 100%;
            height: 1px;
            margin: 12px 0;
          }
          .input-group {
            padding: 0.5rem 0;
          }
          .search-main-btn {
            width: 100%;
            margin-top: 1rem;
          }
          .hero-section {
            padding: 6rem 0 4rem;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
