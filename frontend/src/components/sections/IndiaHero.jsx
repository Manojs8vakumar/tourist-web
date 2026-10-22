import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, MapPin, ArrowRight, ChevronLeft } from 'lucide-react';

export default function IndiaHero({ onOpenEnquiry }) {
  const scrollContainerRef = useRef(null);

  const destinations = [
    { num: '01', name: 'Rajasthan', slug: 'rajasthan', tag: 'Imperial Forts & Deserts' },
    { num: '02', name: 'Kashmir', slug: 'kashmir', tag: 'Dal Lake & Pine Alpine' },
    { num: '03', name: 'Ladakh', slug: 'ladakh', tag: 'Moonscapes & Glaciers' },
    { num: '04', name: 'Kerala', slug: 'kerala', tag: 'Backwaters & Wellness' },
    { num: '05', name: 'Himachal Pradesh', slug: 'himachal-pradesh', tag: 'Cedar Valleys & Snow' },
    { num: '06', name: 'Sikkim & Darjeeling', slug: 'sikkim', tag: 'Kanchenjunga & Tea' },
    { num: '07', name: 'Madhya Pradesh', slug: 'madhya-pradesh', tag: 'Tiger Reserves & Temples' },
    { num: '08', name: 'Uttar Pradesh', slug: 'uttar-pradesh', tag: 'Taj Mahal & Varanasi' },
    { num: '09', name: 'Uttarakhand', slug: 'uttarakhand', tag: 'Ganga Ghats & Rishikesh' },
    { num: '10', name: 'South India', slug: 'south-india', tag: 'Chola Temples & Coorg' },
    { num: '11', name: 'Andaman Islands', slug: 'andaman-islands', tag: 'Private Coral Lagoons' },
    { num: '12', name: 'Odisha', slug: 'odisha', tag: 'Sun Temples & Chilika' },
    { num: '13', name: 'North-East India', slug: 'north-east-india', tag: 'Living Root Bridges' }
  ];

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="india-hero-section">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="hero-backdrop">
        <img
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2160&q=85"
          alt="Palaces and landscapes of India"
          className="hero-image"
        />
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content-wrap">
        {/* Breadcrumb */}
        <nav className="hero-breadcrumb">
          <Link to="/" className="crumb-link">Home</Link>
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb-link">Destinations</span>
          <ChevronRight size={14} className="crumb-sep" />
          <span className="crumb-current">India</span>
        </nav>

        {/* Master Heading & Editorial Copy */}
        <div className="hero-editorial">
          <span className="hero-tag">
            <Sparkles size={14} /> THE SUBCONTINENTAL PORTFOLIO
          </span>
          <h1 className="hero-title font-serif">
            INDIA
          </h1>
          <p className="hero-lead">
            An imperial tapestry woven across five millennia. From the golden sandstone citadels of the Thar Desert and mist-shrouded cedar sanctuaries of Kashmir to the sacred dawn rituals of Varanasi and emerald backwaters of Kerala, India reveals itself not as a country, but as an endless world of living wonder.
          </p>

          <div className="hero-cta-row">
            <button onClick={onOpenEnquiry} className="btn-gold hero-btn">
              Begin a Journey
              <ArrowRight size={16} />
            </button>
            <a href="#trip-finder" className="btn-secondary hero-btn-alt">
              Discover by Mood & Month
            </a>
          </div>
        </div>

        {/* Highlights & Statistics Row */}
        <div className="hero-stats-bar">
          <div className="stat-card">
            <span className="stat-value">28</span>
            <span className="stat-label">Diverse States & Cultures</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">40+</span>
            <span className="stat-label">UNESCO World Heritage Sites</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">100+</span>
            <span className="stat-label">Tiger Reserves & National Parks</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">5,000+</span>
            <span className="stat-label">Years of Living Civilisation</span>
          </div>
          <div className="stat-card highlight">
            <span className="stat-value">100%</span>
            <span className="stat-label">Private Bespoke Curations</span>
          </div>
        </div>
      </div>

      {/* Horizontal Numbered Destination Selector */}
      <div className="dest-selector-strip">
        <div className="container strip-header">
          <div className="strip-title-row">
            <span className="selector-label">01 / REGIONAL DIRECTORY</span>
            <span className="selector-title font-serif">Select a Province to Explore</span>
          </div>
          <div className="scroll-controls">
            <button onClick={() => handleScroll('left')} className="scroll-arrow" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => handleScroll('right')} className="scroll-arrow" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="horizontal-dest-scroller" ref={scrollContainerRef}>
          {destinations.map((d) => (
            <Link
              key={d.slug}
              to={`/destinations/${d.slug}`}
              className="dest-selector-item"
            >
              <div className="item-header">
                <span className="dest-num">{d.num}</span>
                <span className="dest-dot" />
              </div>
              <h3 className="dest-name font-serif">{d.name}</h3>
              <p className="dest-tag">{d.tag}</p>
              <div className="dest-hover-arrow">
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .india-hero-section {
          position: relative;
          min-height: 94vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 7.5rem;
          background: #141311;
          color: #ffffff;
        }
        .hero-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 1;
        }
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.65) contrast(1.05);
          transform: scale(1.02);
          transition: transform 8s ease;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(20, 19, 17, 0.45) 0%,
            rgba(20, 19, 17, 0.3) 40%,
            rgba(20, 19, 17, 0.92) 100%
          );
        }
        .hero-content-wrap {
          position: relative;
          z-index: 2;
          padding-top: 2rem;
          padding-bottom: 3.5rem;
        }
        .hero-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #c5bcb0;
          margin-bottom: 2rem;
        }
        .crumb-link {
          color: #d1c8bc;
          transition: var(--transition);
        }
        .crumb-link:hover {
          color: var(--accent-gold);
        }
        .crumb-sep {
          color: var(--accent-gold);
        }
        .crumb-current {
          color: var(--accent-gold);
          font-weight: 600;
        }
        .hero-editorial {
          max-width: 900px;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          letter-spacing: 0.25em;
          color: var(--accent-gold);
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .hero-title {
          font-size: clamp(4.5rem, 11vw, 9.5rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 0.9;
          color: #ffffff;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.35);
        }
        .hero-lead {
          font-size: clamp(1.05rem, 1.8vw, 1.32rem);
          font-weight: 300;
          line-height: 1.8;
          color: #e5ded4;
          max-width: 780px;
          margin-bottom: 2.5rem;
          font-family: var(--font-sans);
        }
        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }
        .hero-btn {
          font-size: 0.88rem;
          padding: 1rem 2.2rem;
        }
        .hero-btn-alt {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
          font-size: 0.88rem;
          padding: 1rem 2rem;
        }
        .hero-btn-alt:hover {
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }
        .hero-stats-bar {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 1.75rem 2rem;
          border-radius: 4px;
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding-right: 1rem;
        }
        .stat-card:last-child {
          border-right: none;
        }
        .stat-value {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 400;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .stat-card.highlight .stat-value {
          color: var(--accent-gold);
        }
        .stat-label {
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #b5ada2;
        }
        .dest-selector-strip {
          position: relative;
          z-index: 2;
          background: rgba(14, 13, 11, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.75rem 0 2rem;
        }
        .strip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.25rem;
        }
        .strip-title-row {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .selector-label {
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--accent-gold);
          font-weight: 600;
        }
        .selector-title {
          font-size: 1.4rem;
          color: #ffffff;
          font-weight: 300;
        }
        .scroll-controls {
          display: flex;
          gap: 0.5rem;
        }
        .scroll-arrow {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .scroll-arrow:hover {
          background: var(--accent-gold);
          border-color: var(--accent-gold);
        }
        .horizontal-dest-scroller {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          padding: 0.5rem 2rem 1.25rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }
        .horizontal-dest-scroller::-webkit-scrollbar {
          height: 4px;
        }
        .horizontal-dest-scroller::-webkit-scrollbar-thumb {
          background: rgba(195, 154, 52, 0.4);
          border-radius: 2px;
        }
        .dest-selector-item {
          flex: 0 0 240px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 2px;
          scroll-snap-align: start;
          transition: var(--transition);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .dest-selector-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-gold);
          transform: translateY(-4px);
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }
        .dest-num {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--accent-gold);
          font-weight: 500;
        }
        .dest-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
        }
        .dest-name {
          font-size: 1.35rem;
          color: #ffffff;
          font-weight: 400;
          margin-bottom: 0.35rem;
        }
        .dest-tag {
          font-size: 0.76rem;
          color: #9f988d;
          line-height: 1.4;
        }
        .dest-hover-arrow {
          margin-top: 1rem;
          color: var(--accent-gold);
          opacity: 0;
          transform: translateX(-6px);
          transition: var(--transition);
        }
        .dest-selector-item:hover .dest-hover-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 1024px) {
          .hero-stats-bar {
            grid-template-columns: repeat(3, 1fr);
          }
          .stat-card:nth-child(3) {
            border-right: none;
          }
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 4.8rem;
          }
          .hero-stats-bar {
            grid-template-columns: 1fr 1fr;
          }
          .stat-card:nth-child(2) {
            border-right: none;
          }
          .dest-selector-item {
            flex: 0 0 200px;
          }
        }
      `}</style>
    </section>
  );
}
