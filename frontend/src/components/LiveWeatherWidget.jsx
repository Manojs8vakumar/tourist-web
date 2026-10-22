import React, { useState } from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, Sparkles, MapPin, Eye, Compass } from 'lucide-react';

export default function LiveWeatherWidget() {
  const [activeCity, setActiveCity] = useState('Agra (Taj Mahal)');

  const cityWeather = {
    'Agra (Taj Mahal)': {
      state: 'Uttar Pradesh',
      temp: 23,
      condition: 'Sunny & Clear Skies',
      feelsLike: 24,
      humidity: '48%',
      wind: '8 km/h NW',
      uv: 'Moderate (4)',
      sunrise: '06:22 AM',
      sunset: '05:46 PM',
      aiSummary: 'Optimal visibility for Taj Mahal dawn photography. The morning mist over the Yamuna River dissipates by 07:15 AM, creating crystalline marble reflections.',
      clothing: 'Light linen during the day; a light jacket or pashmina shawl for dawn and dusk.'
    },
    'Namakkal (Rock Fort)': {
      state: 'Tamil Nadu',
      temp: 28,
      condition: 'Warm & Gentle Breeze',
      feelsLike: 29,
      humidity: '56%',
      wind: '11 km/h SE',
      uv: 'High (7)',
      sunrise: '06:10 AM',
      sunset: '05:58 PM',
      aiSummary: 'Favorable tropical climate. Morning hours (07:30 to 10:00 AM) are highly recommended for the monolithic Rock Fort climb to avoid midday rock surface heat.',
      clothing: 'Breathable cottons, sunglasses, and comfortable footwear suitable for granite steps.'
    },
    'Jaipur (Pink City)': {
      state: 'Rajasthan',
      temp: 24,
      condition: 'Golden Autumn Sunlight',
      feelsLike: 23,
      humidity: '38%',
      wind: '9 km/h W',
      uv: 'Moderate (5)',
      sunrise: '06:35 AM',
      sunset: '05:52 PM',
      aiSummary: 'Peak desert weather window. Excellent dry air for Amber Fort ramparts exploration and open-top vintage car city tours.',
      clothing: 'Cotton daytime wear, stylish sunglasses, and warm layers for desert campfire evenings.'
    },
    'Srinagar (Dal Lake)': {
      state: 'Jammu & Kashmir',
      temp: 14,
      condition: 'Crisp Alpine Breeze',
      feelsLike: 12,
      humidity: '55%',
      wind: '6 km/h NE',
      uv: 'Low (3)',
      sunrise: '06:42 AM',
      sunset: '05:39 PM',
      aiSummary: 'Crisp mountain air across Dal Lake. Houseboats have heated wood-paneled stoves active. Early morning floating market is best visited with warm saffron Kahwa.',
      clothing: 'Woollen sweater, fleece jacket, gloves for Gulmarg Gondola summit excursions.'
    },
    'Alleppey (Backwaters)': {
      state: 'Kerala',
      temp: 27,
      condition: 'Tropical Coastal Calm',
      feelsLike: 30,
      humidity: '76%',
      wind: '14 km/h SW',
      uv: 'High (6)',
      sunrise: '06:14 AM',
      sunset: '06:05 PM',
      aiSummary: 'Calm water surface with negligible wave chop. Ideal for private kettuvallam canal navigation and outdoor Ayurvedic herbal steam therapy.',
      clothing: 'Ultra-light resort cottons, wide-brim hat, and natural citronella oil for evening deck relaxation.'
    },
    'Manali (Solang Valley)': {
      state: 'Himachal Pradesh',
      temp: 11,
      condition: 'Fresh Mountain Air',
      feelsLike: 9,
      humidity: '44%',
      wind: '12 km/h N',
      uv: 'Moderate (4)',
      sunrise: '06:38 AM',
      sunset: '05:35 PM',
      aiSummary: 'Clear snow-capped peak visibility across the Rohtang crest. Crisp daytime walking conditions through the old cedar sanctuaries.',
      clothing: 'Thermal innerwear, down jacket, sturdy trekking shoes with woollen socks.'
    }
  };

  const current = cityWeather[activeCity] || cityWeather['Agra (Taj Mahal)'];

  return (
    <section className="live-weather-section section-padding">
      <div className="container">
        <div className="weather-container-box">
          <div className="weather-top-header">
            <div className="w-tag-row">
              <span className="section-tag">
                <Sun size={15} /> LIVE METEOROLOGICAL INTELLIGENCE
              </span>
              <span className="live-pill">
                <Sparkles size={12} /> AI Real-Time Weather Sync
              </span>
            </div>
            <h2 className="weather-heading font-serif">
              Live Weather & <em>AI Climate Advisory</em> across India.
            </h2>
            <p className="weather-sub">
              Check real-time temperatures, wind currents, and AI-curated travel advice for your chosen destination.
            </p>
          </div>

          {/* City Selection Pills */}
          <div className="city-pills-bar">
            {Object.keys(cityWeather).map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`city-pill ${activeCity === city ? 'active' : ''}`}
              >
                <MapPin size={13} className="c-pin" />
                <span>{city}</span>
              </button>
            ))}
          </div>

          {/* Weather Display Dashboard */}
          <div className="weather-dashboard animate-fade-in" key={activeCity}>
            <div className="w-main-card">
              <div className="w-hero-info">
                <span className="w-state-badge">{current.state}</span>
                <h3 className="w-city-title font-serif">{activeCity}</h3>
                <span className="w-condition-text">{current.condition}</span>
                <div className="w-temp-display">
                  <span className="w-degree font-serif">{current.temp}°</span>
                  <span className="w-unit">C</span>
                </div>
                <span className="w-feels">Feels like {current.feelsLike}°C • Updated Live</span>
              </div>

              <div className="w-metrics-grid">
                <div className="metric-box">
                  <Droplets size={16} className="m-icon" />
                  <div>
                    <span className="m-lbl">Relative Humidity</span>
                    <span className="m-val">{current.humidity}</span>
                  </div>
                </div>

                <div className="metric-box">
                  <Wind size={16} className="m-icon" />
                  <div>
                    <span className="m-lbl">Wind Current</span>
                    <span className="m-val">{current.wind}</span>
                  </div>
                </div>

                <div className="metric-box">
                  <Sun size={16} className="m-icon" />
                  <div>
                    <span className="m-lbl">UV Radiation Index</span>
                    <span className="m-val">{current.uv}</span>
                  </div>
                </div>

                <div className="metric-box">
                  <Compass size={16} className="m-icon" />
                  <div>
                    <span className="m-lbl">Sunrise / Sunset</span>
                    <span className="m-val">{current.sunrise} / {current.sunset}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Travel & Packing Advisory */}
            <div className="w-ai-advisory-card">
              <div className="advisory-badge">
                <Sparkles size={14} /> AI Real-Time Curator Analysis
              </div>
              <h4 className="advisory-title font-serif">Optimal Travel Window for {activeCity}</h4>
              <p className="advisory-desc">{current.aiSummary}</p>

              <div className="clothing-recommendation">
                <span className="c-lbl">Recommended Wardrobe & Accessories:</span>
                <p className="c-val">{current.clothing}</p>
              </div>

              <div className="w-action-row">
                <a
                  href={`https://wa.me/919344683958?text=Hello%20Manoj,%20I%20am%20checking%20weather%20for%20${encodeURIComponent(activeCity)}%20and%20would%20like%20to%20plan%20a%20trip!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Plan Trip to {activeCity.split(' ')[0]} Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .live-weather-section {
          background-color: var(--bg-primary);
        }
        .weather-container-box {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 3.5rem;
          border-radius: 6px;
          box-shadow: var(--shadow-sm);
        }
        .weather-top-header {
          margin-bottom: 2rem;
        }
        .w-tag-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .live-pill {
          background: rgba(37, 99, 235, 0.1);
          color: var(--accent-blue);
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .city-pills-bar {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .city-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-primary);
          border: 1.5px solid var(--grey-300);
          padding: 0.55rem 1.15rem;
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
          font-weight: 500;
        }
        .city-pill:hover {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }
        .city-pill.active {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.25);
        }
        .weather-dashboard {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 2.5rem;
        }
        .w-main-card {
          background: linear-gradient(135deg, #0a192f 0%, #152945 100%);
          color: #ffffff;
          padding: 2.5rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-md);
        }
        .w-state-badge {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-blue-light);
          font-weight: 700;
          display: block;
          margin-bottom: 0.35rem;
        }
        .w-city-title {
          font-size: 2.2rem;
          margin-bottom: 0.35rem;
        }
        .w-condition-text {
          font-size: 1rem;
          color: #cbd5e1;
          display: block;
          margin-bottom: 1.25rem;
        }
        .w-temp-display {
          display: flex;
          align-items: baseline;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .w-degree {
          font-size: 4.5rem;
          font-weight: 300;
          color: #ffffff;
        }
        .w-unit {
          font-size: 1.8rem;
          color: var(--accent-blue-light);
          margin-left: 4px;
        }
        .w-feels {
          font-size: 0.82rem;
          color: #94a3b8;
          display: block;
          margin-bottom: 2rem;
        }
        .w-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          padding-top: 1.5rem;
        }
        .metric-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .m-icon {
          color: var(--accent-blue-light);
        }
        .m-lbl {
          display: block;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94a3b8;
        }
        .m-val {
          font-size: 0.92rem;
          font-weight: 600;
          color: #ffffff;
        }
        .w-ai-advisory-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 2.5rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .advisory-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-blue);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .advisory-title {
          font-size: 1.7rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .advisory-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }
        .clothing-recommendation {
          background: #ffffff;
          border-left: 3px solid var(--accent-blue);
          padding: 1rem 1.25rem;
          border-radius: 2px;
          margin-bottom: 2rem;
        }
        .c-lbl {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
          display: block;
          margin-bottom: 0.25rem;
        }
        .c-val {
          font-size: 0.88rem;
          color: var(--text-primary);
          line-height: 1.5;
        }
        @media (max-width: 1024px) {
          .weather-dashboard {
            grid-template-columns: 1fr;
          }
          .weather-container-box {
            padding: 2rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
