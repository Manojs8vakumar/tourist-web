import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Compass, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      api.getDestinations().then(setDestinations).catch(console.error);
      api.getPackages().then(setPackages).catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredDests = destinations.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d.highlights && d.highlights.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPkgs = packages.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.mood && p.mood.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectDest = (slug) => {
    onClose();
    navigate(`/destinations/${slug}`);
  };

  const handleSelectPkg = (slug) => {
    onClose();
    navigate(`/packages/${slug}`);
  };

  return (
    <div className="search-overlay animate-fade-in" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <Search size={22} className="search-icon" />
          <input
            type="text"
            autoFocus
            placeholder="Search regions, cities, moods (e.g. Rajasthan, Kashmir, Romance, Wildlife)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-results-area">
          {/* Destinations */}
          <div className="search-col">
            <span className="col-label">DESTINATIONS ({filteredDests.length})</span>
            <div className="res-list">
              {filteredDests.slice(0, 6).map((dest) => (
                <div
                  key={dest.id}
                  className="res-item"
                  onClick={() => handleSelectDest(dest.slug)}
                >
                  <MapPin size={16} className="res-icon" />
                  <div className="res-info">
                    <span className="res-title">{dest.name}</span>
                    <span className="res-meta">{dest.regionCategory} • {dest.availableTourCount} Journeys</span>
                  </div>
                  <ArrowRight size={14} className="res-arrow" />
                </div>
              ))}
              {filteredDests.length === 0 && (
                <p className="res-empty">No destinations match "{searchTerm}"</p>
              )}
            </div>
          </div>

          {/* Tour Packages */}
          <div className="search-col">
            <span className="col-label">CURATED PACKAGES ({filteredPkgs.length})</span>
            <div className="res-list">
              {filteredPkgs.slice(0, 6).map((pkg) => (
                <div
                  key={pkg.id}
                  className="res-item"
                  onClick={() => handleSelectPkg(pkg.slug)}
                >
                  <Compass size={16} className="res-icon" />
                  <div className="res-info">
                    <span className="res-title">{pkg.name}</span>
                    <span className="res-meta">{pkg.durationNights} Nights • From ₹{pkg.startingPriceInr.toLocaleString('en-IN')}</span>
                  </div>
                  <ArrowRight size={14} className="res-arrow" />
                </div>
              ))}
              {filteredPkgs.length === 0 && (
                <p className="res-empty">No packages match "{searchTerm}"</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(18, 17, 15, 0.85);
          backdrop-filter: blur(10px);
          z-index: 2100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 6rem 1.5rem 2rem;
        }
        .search-box {
          background: #ffffff;
          width: 100%;
          max-width: 820px;
          border-radius: 4px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }
        .search-input-wrap {
          display: flex;
          align-items: center;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-light);
          gap: 1rem;
        }
        .search-icon {
          color: var(--accent-gold);
        }
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1.15rem;
          font-family: var(--font-sans);
          color: var(--text-primary);
        }
        .search-close {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .search-results-area {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
          max-height: 480px;
          overflow-y: auto;
          background: var(--bg-primary);
        }
        .col-label {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: var(--text-muted);
          font-weight: 700;
          display: block;
          margin-bottom: 1rem;
        }
        .res-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .res-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 1rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          cursor: pointer;
          transition: var(--transition);
        }
        .res-item:hover {
          border-color: var(--accent-gold);
          transform: translateX(4px);
        }
        .res-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }
        .res-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .res-title {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .res-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .res-arrow {
          color: var(--text-muted);
          opacity: 0;
          transition: var(--transition);
        }
        .res-item:hover .res-arrow {
          opacity: 1;
          color: var(--accent-gold);
        }
        .res-empty {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
          padding: 1rem 0;
        }
        @media (max-width: 680px) {
          .search-results-area {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
