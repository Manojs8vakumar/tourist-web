import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Compass, Sparkles, Navigation, Search, Filter } from 'lucide-react';
import { api } from '../../services/api';
import { DESTINATION_COORDINATES, calculateHaversineDistance } from '../../services/locationService';

export default function ExploreRegions({ userLocation }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    api.getDestinations()
      .then(data => setDestinations(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    'All',
    'Heritage and Palaces',
    'Himalayan Escapes',
    'Southern India',
    'Northern India',
    'Wildlife and Nature',
    'Islands and Beaches'
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory =
      selectedCategory === 'All' || dest.regionCategory?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.highlights?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="regions" className="explore-regions-section section-padding">
      <div className="container">
        {/* Editorial Section Heading */}
        <div className="regions-header">
          <div className="regions-title-col">
            <span className="section-tag">03 / PROVINCIAL ATLAS</span>
            <h2 className="section-heading">
              Explore the <em>regions</em> of India.
            </h2>
          </div>
          <div className="regions-desc-col">
            <p className="section-subtext">
              Each Indian state possesses its own distinct architectural language, culinary philosophy, and spiritual landscape. We curate private journeys across 13 sovereign territories.
            </p>
          </div>
        </div>

        {/* Search & Regional Category Filter Controls */}
        <div className="atlas-controls-bar">
          <div className="atlas-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search Indian destinations, palaces, temples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="atlas-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                Clear
              </button>
            )}
          </div>

          <div className="atlas-filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        {loading ? (
          <div className="regions-loading">Loading provincial archives...</div>
        ) : filteredDestinations.length === 0 ? (
          <div className="empty-results-box">
            <p>No Indian destinations match your search "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn-gold"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="asymmetric-regions-grid">
            {filteredDestinations.map((dest, idx) => {
              const isHeroCard = idx % 5 === 0;
              const cardClass = isHeroCard ? 'region-card hero-span' : 'region-card standard-span';

              // Calculate distance from user location
              const targetCoords = DESTINATION_COORDINATES[dest.slug] || { lat: 26.9124, lon: 75.7873 };
              const distanceKm = userLocation
                ? calculateHaversineDistance(userLocation.lat, userLocation.lon, targetCoords.lat, targetCoords.lon)
                : null;

              return (
                <div key={dest.id} className={cardClass}>
                  <div className="region-img-wrap">
                    <img
                      src={dest.cardImage || dest.heroImage}
                      alt={dest.name}
                      className="region-img"
                      loading="lazy"
                    />
                    <div className="region-img-overlay" />
                    <span className="region-category-pill">{dest.regionCategory}</span>

                    {distanceKm !== null && (
                      <span className="region-dist-badge">
                        <Navigation size={11} /> {distanceKm.toLocaleString('en-IN')} km from {userLocation?.name?.split(',')[0]}
                      </span>
                    )}

                    <span className="region-tours-badge">
                      <Compass size={13} /> {dest.availableTourCount} Curated Tours
                    </span>
                  </div>

                  <div className="region-content">
                    <div className="region-meta-top">
                      <span className="region-num">0{idx + 1}</span>
                      <div className="region-season">
                        <Calendar size={13} className="season-icon" />
                        <span>Best: {dest.bestTimeToVisit}</span>
                      </div>
                    </div>

                    <h3 className="region-name font-serif">{dest.name}</h3>
                    <p className="region-tagline">"{dest.tagline}"</p>
                    <p className="region-desc">{dest.description}</p>

                    <div className="region-highlights-row">
                      <span className="highlights-label">Signature Highlights:</span>
                      <p className="highlights-text">{dest.highlights}</p>
                    </div>

                    <div className="region-footer">
                      <Link to={`/destinations/${dest.slug}`} className="btn-secondary explore-link">
                        Explore {dest.name}
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .explore-regions-section {
          background-color: var(--bg-primary);
        }
        .regions-header {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          margin-bottom: 2.5rem;
        }

        .atlas-controls-bar {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 3.5rem;
          box-shadow: var(--shadow-sm);
        }
        .atlas-search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: 6px;
          padding: 0.75rem 1.25rem;
        }
        .search-icon {
          color: #2563eb;
        }
        .atlas-search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .search-clear-btn {
          background: none;
          border: none;
          font-size: 0.75rem;
          color: #94a3b8;
          cursor: pointer;
        }
        .atlas-filter-pills {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
        }
        .category-pill-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.8rem;
          padding: 0.45rem 0.95rem;
          border-radius: 20px;
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        .category-pill-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .category-pill-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }

        .region-dist-badge {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          z-index: 2;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(6px);
          color: #38bdf8;
          font-size: 0.72rem;
          font-family: var(--font-mono, monospace);
          padding: 0.3rem 0.65rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          border: 1px solid rgba(56, 189, 248, 0.25);
        }

        .empty-results-box {
          text-align: center;
          padding: 5rem 1rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 6px;
        }

        .asymmetric-regions-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2.5rem;
        }
        .hero-span {
          grid-column: span 12;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
        }
        .standard-span {
          grid-column: span 6;
          display: flex;
          flex-direction: column;
        }
        .region-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-light);
          overflow: hidden;
          transition: var(--transition);
        }
        .region-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: #2563eb;
        }
        .region-img-wrap {
          position: relative;
          overflow: hidden;
          min-height: 320px;
        }
        .hero-span .region-img-wrap {
          min-height: 440px;
        }
        .region-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .region-card:hover .region-img {
          transform: scale(1.05);
        }
        .region-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%);
        }
        .region-category-pill {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          color: #38bdf8;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          font-weight: 600;
          border-radius: 4px;
        }
        .region-tours-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: #ffffff;
          color: var(--text-primary);
          font-size: 0.74rem;
          padding: 0.35rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
          border-radius: 4px;
        }
        .region-content {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .region-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .region-num {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: #2563eb;
          font-weight: 600;
        }
        .region-season {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .season-icon {
          color: #2563eb;
        }
        .region-name {
          font-size: 1.85rem;
          margin-bottom: 0.35rem;
        }
        .region-tagline {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-style: italic;
          color: #2563eb;
          margin-bottom: 1.1rem;
        }
        .region-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .region-highlights-row {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
          border-radius: 4px;
        }
        .highlights-label {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          font-weight: 600;
        }
        .highlights-text {
          font-size: 0.82rem;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .explore-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          background: #ffffff;
          color: #000000;
          padding: 0.65rem 1.35rem;
          border-radius: 4px;
          border: 1px solid #ffffff;
          transition: var(--transition);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
        }
        .explore-link:hover {
          background: #e2e8f0;
          color: #000000;
        }
        @media (max-width: 1024px) {
          .hero-span {
            grid-template-columns: 1fr;
          }
          .standard-span {
            grid-column: span 12;
          }
          .regions-header {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}