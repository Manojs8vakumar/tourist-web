import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, X, Check, Search, AlertCircle } from 'lucide-react';
import { requestUserLocation, POPULAR_ORIGIN_CITIES } from '../services/locationService';

export default function LocationDetectorBanner({ userLocation, onLocationChange }) {
  const [isOpenManualModal, setIsOpenManualModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    setStatusMessage('Querying device GPS and network coordinates...');
    const res = await requestUserLocation();
    setIsDetecting(false);
    onLocationChange(res.location, res.status);
    if (res.status === 'granted') {
      setStatusMessage('Location synchronized successfully!');
      setTimeout(() => setStatusMessage(''), 3500);
    } else {
      setStatusMessage(res.message);
    }
  };

  const handleSelectCity = (city) => {
    onLocationChange(city, 'manual');
    setIsOpenManualModal(false);
    setStatusMessage(`Origin updated to ${city.name}`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const filteredCities = POPULAR_ORIGIN_CITIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="location-detector-strip">
      <div className="container location-inner">
        <div className="location-status-badge">
          <div className="loc-dot-wrap">
            <span className="loc-dot" />
            <Navigation size={14} className="loc-icon" />
          </div>
          <div className="loc-text-col">
            <span className="loc-heading">LOCATION AWARENESS</span>
            <p className="loc-current">
              Origin: <strong>{userLocation?.name || 'Namakkal, Tamil Nadu'}</strong>
            </p>
          </div>
        </div>

        <div className="location-actions">
          {statusMessage && (
            <span className="location-feedback-toast animate-fade-in font-mono">
              {statusMessage}
            </span>
          )}

          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="loc-btn auto-detect-btn"
            title="Detect location from browser"
          >
            <Compass size={14} className={isDetecting ? 'spinning' : ''} />
            <span>{isDetecting ? 'Detecting...' : 'Detect My Location'}</span>
          </button>

          <button
            onClick={() => setIsOpenManualModal(true)}
            className="loc-btn change-city-btn"
            title="Manually choose or search your city"
          >
            <MapPin size={14} />
            <span>Choose City</span>
          </button>
        </div>
      </div>

      {/* Manual City Selection Modal */}
      {isOpenManualModal && (
        <div className="loc-modal-overlay animate-fade-in" onClick={() => setIsOpenManualModal(false)}>
          <div className="loc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="loc-modal-top">
              <div>
                <span className="section-tag">CHOOSE YOUR ORIGIN</span>
                <h3 className="loc-modal-title font-serif">Select or Search Your City</h3>
              </div>
              <button
                onClick={() => setIsOpenManualModal(false)}
                className="loc-modal-close"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <p className="loc-modal-desc">
              Select your departure city across India to calculate real-time transit distances and optimal routes for every Indian destination.
            </p>

            {/* City Search Bar */}
            <div className="city-search-box">
              <Search size={16} className="city-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city (e.g. Chennai, London, Mumbai, New York...)"
                className="city-search-input"
                autoFocus
              />
            </div>

            {/* Cities List */}
            <div className="cities-grid">
              {filteredCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleSelectCity(city)}
                  className={`city-pill ${userLocation?.name === city.name ? 'active' : ''}`}
                >
                  <MapPin size={14} />
                  <span>{city.name}</span>
                  {userLocation?.name === city.name && <Check size={14} className="city-check" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .location-detector-strip {
          background: #0f172a;
          color: #e2e8f0;
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .location-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .location-status-badge {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .loc-dot-wrap {
          position: relative;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loc-dot {
          position: absolute;
          top: 3px;
          right: 3px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
        }
        .loc-icon {
          color: #60a5fa;
        }
        .loc-text-col {
          display: flex;
          flex-direction: column;
        }
        .loc-heading {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #94a3b8;
          text-transform: uppercase;
        }
        .loc-current {
          font-size: 0.88rem;
          color: #ffffff;
        }
        .loc-current strong {
          color: #38bdf8;
        }
        .location-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .location-feedback-toast {
          font-size: 0.75rem;
          color: #93c5fd;
          background: rgba(30, 58, 138, 0.4);
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }
        .loc-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.95rem;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .auto-detect-btn {
          background: #1e3a8a;
          color: #ffffff;
          border: 1px solid #3b82f6;
        }
        .auto-detect-btn:hover {
          background: #2563eb;
          box-shadow: 0 0 14px rgba(37, 99, 235, 0.4);
        }
        .change-city-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .change-city-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }
        .spinning {
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .loc-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5, 7, 12, 0.82);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .loc-modal-card {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 16px;
          max-width: 620px;
          width: 100%;
          padding: 2.25rem;
          color: #ffffff;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
        }
        .loc-modal-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        .loc-modal-title {
          font-size: 1.6rem;
          color: #ffffff;
        }
        .loc-modal-close {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }
        .loc-modal-close:hover {
          color: #ffffff;
        }
        .loc-modal-desc {
          font-size: 0.88rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .city-search-box {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .city-search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .city-search-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid #334155;
          border-radius: 8px;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .city-search-input:focus {
          border-color: #38bdf8;
          background: rgba(255, 255, 255, 0.09);
        }
        .cities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          max-height: 260px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
        .city-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 0.95rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid #1e293b;
          border-radius: 8px;
          color: #cbd5e1;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        .city-pill:hover {
          background: #1e3a8a;
          color: #ffffff;
          border-color: #3b82f6;
        }
        .city-pill.active {
          background: #2563eb;
          color: #ffffff;
          border-color: #38bdf8;
          font-weight: 600;
        }
        .city-check {
          margin-left: auto;
          color: #38bdf8;
        }
        @media (max-width: 640px) {
          .cities-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
