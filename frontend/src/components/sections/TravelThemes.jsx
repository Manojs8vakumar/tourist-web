import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Compass, Sparkles } from 'lucide-react';

export default function TravelThemes() {
  const [activeTheme, setActiveTheme] = useState('Heritage and Palaces');

  const themes = [
    {
      code: 'A',
      name: 'Northern India',
      headline: 'Empires, sacred ghats and timeless monuments.',
      description: 'The monumental cradle of royal dynasties. Experience the Taj Mahal at silent dawn, take private wooden boats along the sacred Ganga in Varanasi, and dine in imperial Awadhi courtyards.',
      period: 'October to March',
      destinations: [
        { name: 'Uttar Pradesh', slug: 'uttar-pradesh', note: 'Agra, Varanasi & Lucknow' },
        { name: 'Uttarakhand', slug: 'uttarakhand', note: 'Rishikesh, Haridwar & Corbett' },
        { name: 'Rajasthan', slug: 'rajasthan', note: 'Jaipur, Jodhpur & Udaipur' }
      ],
      packagesCount: 14,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'B',
      name: 'Himalayan Escapes',
      headline: 'Towering cedar ridges, Buddhist gompas and snowbound passes.',
      description: 'Ascend beyond the clouds into silent alpine sanctuaries. From colonial mountain estates in Shimla and Dalai Lama retreats in Dharamshala to high-altitude moonscapes in Ladakh and Spiti.',
      period: 'April to October & Winter Snow',
      destinations: [
        { name: 'Kashmir', slug: 'kashmir', note: 'Srinagar, Gulmarg & Pahalgam' },
        { name: 'Ladakh', slug: 'ladakh', note: 'Leh, Nubra Valley & Pangong Tso' },
        { name: 'Himachal Pradesh', slug: 'himachal-pradesh', note: 'Shimla, Spiti & Dharamshala' },
        { name: 'Sikkim & Darjeeling', slug: 'sikkim', note: 'Kanchenjunga & Tea Estates' }
      ],
      packagesCount: 18,
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'C',
      name: 'Heritage and Palaces',
      headline: 'Living sandstone citadels and floating marble mirages.',
      description: 'Step into private living residences of Indian Maharajas. Sleep in suite chambers once reserved for visiting kings, dine under desert constellations, and marvel at centuries of Rajput and Mughal chivalry.',
      period: 'October to March',
      destinations: [
        { name: 'Rajasthan', slug: 'rajasthan', note: 'Amber Fort, Lake Pichola & Thar Dunes' },
        { name: 'Odisha', slug: 'odisha', note: 'Konark Sun Temple & Puri Shore' },
        { name: 'South India', slug: 'south-india', note: 'Chettinad Mansions & Thanjavur' }
      ],
      packagesCount: 15,
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'D',
      name: 'Southern India',
      headline: 'Emerald backwaters, spice plantations and Dravidian temple towers.',
      description: 'Slow travel along the palm-lined waterways of God\'s Own Country and the millennia-old stone temple complexes of Tamil Nadu and Karnataka. Relish fragrant Chettinad feasts and serene wellness.',
      period: 'September to March',
      destinations: [
        { name: 'Kerala', slug: 'kerala', note: 'Alleppey Kettuvallams & Munnar Hills' },
        { name: 'South India', slug: 'south-india', note: 'Madurai, Pondicherry & Nilgiris' }
      ],
      packagesCount: 12,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'E',
      name: 'Wildlife and Nature',
      headline: 'Royal Bengal tigers, one-horned rhinos and ancient sal forests.',
      description: 'Venture into India\'s dense jungle corridors in private open-top 4x4 gypsies. Guided by elite master naturalists, track elusive predators through Bandhavgarh, Kanha, Kaziranga and Ranthambore.',
      period: 'October to May',
      destinations: [
        { name: 'Madhya Pradesh', slug: 'madhya-pradesh', note: 'Bandhavgarh & Kanha Tiger Reserves' },
        { name: 'North-East India', slug: 'north-east-india', note: 'Kaziranga Rhino Safaris & Meghalaya' },
        { name: 'Uttarakhand', slug: 'uttarakhand', note: 'Jim Corbett National Park' }
      ],
      packagesCount: 10,
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80'
    },
    {
      code: 'F',
      name: 'Islands and Beaches',
      headline: 'Pristine turquoise lagoons and castaway tropical seclusion.',
      description: 'Deep in the Bay of Bengal and along tropical coastlines, surrender to barefoot island luxury. Dive into private coral gardens, relax in overwater and beachfront villas, and kayak under starlit skies.',
      period: 'October to May',
      destinations: [
        { name: 'Andaman Islands', slug: 'andaman-islands', note: 'Havelock, Neil Island & Radhanagar' }
      ],
      packagesCount: 6,
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const currentTheme = themes.find(t => t.name === activeTheme) || themes[0];

  return (
    <section id="themes" className="travel-themes-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="themes-header">
          <span className="section-tag">05 / CURATED TRAVEL THEMES</span>
          <h2 className="section-heading">
            Find the journey that <em>speaks to you</em>.
          </h2>
          <p className="section-subtext">
            Organised by landscape, spirit and heritage ethos. Select a travel theme to reveal dedicated regional itineraries and ideal travel windows.
          </p>
        </div>

        {/* Tab Navigation Strip */}
        <div className="theme-tabs-nav">
          {themes.map((th) => (
            <button
              key={th.name}
              onClick={() => setActiveTheme(th.name)}
              className={`theme-tab-btn ${activeTheme === th.name ? 'active' : ''}`}
            >
              <span className="theme-code">{th.code}.</span>
              <span className="theme-tab-name font-serif">{th.name}</span>
            </button>
          ))}
        </div>

        {/* Active Theme Showcase Editorial Box */}
        <div className="theme-showcase-box animate-fade-in" key={currentTheme.name}>
          <div className="theme-media-col">
            <img
              src={currentTheme.image}
              alt={currentTheme.name}
              className="theme-main-img"
            />
            <div className="theme-img-tag">
              <Sparkles size={14} />
              <span>{currentTheme.packagesCount} Curated Itineraries</span>
            </div>
          </div>

          <div className="theme-content-col">
            <span className="theme-badge">{currentTheme.name}</span>
            <h3 className="theme-headline font-serif">{currentTheme.headline}</h3>
            <p className="theme-description">{currentTheme.description}</p>

            <div className="theme-info-grid">
              <div className="info-item">
                <Calendar size={18} className="info-icon" />
                <div>
                  <span className="info-title">Recommended Season</span>
                  <span className="info-val">{currentTheme.period}</span>
                </div>
              </div>
              <div className="info-item">
                <Compass size={18} className="info-icon" />
                <div>
                  <span className="info-title">Bespoke Curation</span>
                  <span className="info-val">Private Chauffeur & Curated Guides</span>
                </div>
              </div>
            </div>

            <div className="theme-dest-links-section">
              <span className="dest-links-heading">Associated Regional Provinces:</span>
              <div className="dest-pills-list">
                {currentTheme.destinations.map((d) => (
                  <Link
                    key={d.slug}
                    to={`/destinations/${d.slug}`}
                    className="theme-dest-pill"
                  >
                    <span className="pill-name">{d.name}</span>
                    <span className="pill-note">({d.note})</span>
                    <ArrowRight size={13} className="pill-arrow" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="theme-action-row">
              <Link
                to={`/packages?search=${encodeURIComponent(currentTheme.name.split(' ')[0])}`}
                className="btn-gold"
              >
                Explore {currentTheme.name} Journeys
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .travel-themes-section {
          background-color: var(--bg-primary);
        }
        .themes-header {
          margin-bottom: 3.5rem;
        }
        .theme-tabs-nav {
          display: flex;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 3.5rem;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .theme-tabs-nav::-webkit-scrollbar {
          height: 3px;
        }
        .theme-tabs-nav::-webkit-scrollbar-thumb {
          background: var(--accent-gold);
        }
        .theme-tab-btn {
          flex: 1;
          min-width: 170px;
          background: none;
          border: none;
          padding: 1.25rem 1rem;
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          cursor: pointer;
          position: relative;
          transition: var(--transition);
          text-align: left;
        }
        .theme-tab-btn:hover {
          color: var(--accent-gold);
        }
        .theme-code {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-gold);
          letter-spacing: 0.1em;
        }
        .theme-tab-name {
          font-size: 1.2rem;
          color: var(--text-primary);
        }
        .theme-tab-btn.active .theme-tab-name {
          color: var(--accent-gold);
          font-weight: 600;
        }
        .theme-tab-btn::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: transparent;
          transition: var(--transition);
        }
        .theme-tab-btn.active::after {
          background-color: var(--accent-gold);
        }
        .theme-showcase-box {
          background: #ffffff;
          border: 1px solid var(--border-light);
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .theme-media-col {
          position: relative;
          min-height: 480px;
        }
        .theme-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .theme-img-tag {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(20, 19, 17, 0.85);
          backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 0.78rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .theme-content-col {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .theme-badge {
          display: inline-block;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .theme-headline {
          font-size: 2.2rem;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }
        .theme-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .theme-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 2rem;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .info-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .info-title {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .info-val {
          font-size: 0.88rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .theme-dest-links-section {
          margin-bottom: 2.5rem;
        }
        .dest-links-heading {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 0.85rem;
        }
        .dest-pills-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .theme-dest-pill {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.75rem 1rem;
          border-radius: 2px;
          transition: var(--transition);
        }
        .theme-dest-pill:hover {
          border-color: var(--accent-gold);
          transform: translateX(4px);
        }
        .pill-name {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .pill-note {
          font-size: 0.8rem;
          color: var(--text-muted);
          flex: 1;
        }
        .pill-arrow {
          color: var(--accent-gold);
        }
        .theme-action-row {
          display: flex;
        }
        @media (max-width: 1024px) {
          .theme-showcase-box {
            grid-template-columns: 1fr;
          }
          .theme-media-col {
            min-height: 320px;
          }
          .theme-content-col {
            padding: 2.25rem;
          }
        }
      `}</style>
    </section>
  );
}
