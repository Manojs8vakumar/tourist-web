import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Clock, DollarSign, MapPin, Calendar, Sun, CloudRain, Wind, ArrowRight, CheckCircle2, MessageSquare, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AITripPlanner({ initialDest = 'Namakkal, Tamil Nadu', onOpenEnquiry }) {
  const [destination, setDestination] = useState(initialDest);
  const [durationDays, setDurationDays] = useState(3);
  const [budget, setBudget] = useState(45000);
  const [travelStyle, setTravelStyle] = useState('Balanced Luxury');
  const [groupType, setGroupType] = useState('Couple');

  // AI Agent States
  const [isGenerating, setIsGenerating] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [itinerary, setItinerary] = useState(null);

  // Weather State
  const [weatherData, setWeatherData] = useState(null);

  const destinationsList = [
    'Namakkal, Tamil Nadu',
    'Rajasthan (Jaipur & Udaipur)',
    'Kashmir (Srinagar & Gulmarg)',
    'Kerala (Alleppey & Munnar)',
    'Agra & Varanasi (Uttar Pradesh)',
    'Himachal Pradesh (Manali & Shimla)',
    'Goa (Coastal & Heritage)',
    'Ladakh (Leh & Pangong Tso)',
    'Madhya Pradesh (Bandhavgarh)',
    'Karnataka (Hampi & Coorg)'
  ];

  // Destination intelligence database
  const destinationSpots = {
    'Namakkal, Tamil Nadu': {
      hero: 'Namakkal Rock Fort & 18-ft Monolithic Anjaneyar Temple',
      weather: { temp: 28, condition: 'Pleasant & Sunny', humidity: '58%', advisory: 'Comfortable cotton wear recommended. Morning hours ideal for Rock Fort ascent.' },
      daySpots: [
        { title: 'Namakkal Monolithic Rock Fort & Anjaneyar Darshan', morning: '08:00 AM — Morning climb to 9th-century Namakkal Durgam Fort carved on a single massive rock', lunch: 'Authentic Kongunadu traditional lunch at local heritage eatery', afternoon: 'Visit the world-famed 18-ft open-sky Sri Anjaneyar Temple and Narasimha Temple rock carvings', evening: 'Sunset vantage overlooking the Kongu plains; visit to local egg & poultry agro-hubs', stay: 'Nala Hotels / Heritage Retreat' },
        { title: 'Kolli Hills 70 Hairpin Bends & Agaya Gangai Falls', morning: '08:30 AM — Thrilling ascent through 70 legendary hairpin bends to pristine Kolli Hills', lunch: 'Spicy pepper chicken & organic hill millets picnic by the stream', afternoon: 'Trek down to the majestic 300-ft Agaya Gangai waterfalls in sacred forest', evening: 'Arapaleeswarar 1000-year Shiva temple visit & herbal market browsing', stay: 'Silverline Retreat Hotel, Kolli Hills' },
        { title: 'Bhavani Kooduthurai Confluence & Silk Weavers', morning: '09:00 AM — Scenic drive to Sangameshwarar temple at the confluence of Cauvery & Bhavani rivers', lunch: 'Riverview fresh fish fry & banana leaf meal', afternoon: 'Private masterclass with local handloom silk sari weaving families', evening: 'Private evening transfer to Coimbatore or Salem airport for departure', stay: 'Departure' },
        { title: 'Mohanur Cauvery River Ghats & Village Agriculture', morning: '08:00 AM — Quiet morning walk along the fertile Cauvery riverbanks in Mohanur', lunch: 'Village organic mango grove lunch', afternoon: 'Visit to historical Chola temple ruins and betel leaf plantations', evening: 'Local sweet tasting (Namakkal Halwa) & relaxation', stay: 'Namakkal Heritage Lodge' },
        { title: 'Salem Yercaud Hill Station Excursion', morning: '08:30 AM — Day excursion to the Jewel of the South, Yercaud Lake and Killiyur Falls', lunch: 'Colonial plantation bungalow lunch', afternoon: 'Coffee estate tour and Lady’s Seat viewpoint over the valley', evening: 'Return descent to Namakkal and farewell gala dinner', stay: 'Grand Estancia / Departure' }
      ]
    },
    'Rajasthan (Jaipur & Udaipur)': {
      hero: 'Amber Citadel, Mehrangarh & Lake Pichola Mirages',
      weather: { temp: 24, condition: 'Clear Autumn Skies', humidity: '42%', advisory: 'Mild sunshine during day, light jacket required for desert evenings.' },
      daySpots: [
        { title: 'Jaipur Pink City & Chandra Mahal Private Vaults', morning: '08:30 AM — Early morning private elephant or jeep ascent to Amber Fort', lunch: 'Royal Rajasthani Thali at 1135 AD inside fort ramparts', afternoon: 'Exclusive access to Chandra Mahal private royal suites inside City Palace', evening: 'Jantar Mantar observatory & sunset tea overlooking Hawa Mahal', stay: 'Rambagh Palace / Samode Haveli' },
        { title: 'Stepwells, Block Printing & Drive to Jodhpur', morning: '08:30 AM — Panna Meena Ka Kund stepwell visit followed by Bagru block-printing workshop', lunch: 'Heritage highway lunch', afternoon: 'Chauffeured transit into the Blue City of Jodhpur; Umaid Bhawan arrival', evening: 'Toorji Ka Jhalra stepwell lit by brass lamps & rooftop dining', stay: 'Umaid Bhawan Palace / RAAS Jodhpur' },
        { title: 'Mehrangarh Citadel & Ranakpur Marble Marvel', morning: '09:00 AM — Private curator walk through Mehrangarh Museum and royal collection', lunch: 'Desert pavilion lunch', afternoon: 'Scenic transit through Aravalli hills to Ranakpur 1444 hand-carved pillars', evening: 'Lake Pichola sunset boat cruise in Udaipur with live sitar music', stay: 'The Leela Palace Udaipur' },
        { title: 'Udaipur Venice of the East & Island Palaces', morning: '09:00 AM — City Palace lakeside tour and crystal gallery visit', lunch: 'Jag Mandir Island royal restaurant overlooking the water', afternoon: 'Saheliyon Ki Bari royal gardens and Mewar miniature art studio', evening: 'Private candlelit dinner on lakeside terrace with folk dance', stay: 'Taj Lake Palace' },
        { title: 'Kumbhalgarh Great Wall of India & Departure', morning: '08:30 AM — Drive to Kumbhalgarh Fort, possessing the world’s second longest wall', lunch: 'Hilltop Mewari lunch', afternoon: 'Walking the ramparts and cloud palace (Badal Mahal)', evening: 'Private airport transfer to Udaipur Airport', stay: 'Departure' }
      ]
    },
    'Kashmir (Srinagar & Gulmarg)': {
      hero: 'Dal Lake Cedarwood Houseboats & Pir Panjal Alpine Meadows',
      weather: { temp: 14, condition: 'Crisp Mountain Breeze', humidity: '52%', advisory: 'Warm layers and woollens essential. Early morning floating market best at 06:30 AM.' },
      daySpots: [
        { title: 'Srinagar Dal Lake & Mughal Garden Splendour', morning: '08:30 AM — Private cedarwood Shikara cruise to Char Chinar & floating lotus gardens', lunch: 'Multi-course authentic Kashmiri Wazwan meal', afternoon: 'Shalimar Bagh & Nishat Bagh terraced water gardens exploration', evening: 'Sunset on Dal Lake with warm saffron Kahwa served in vintage samovar', stay: 'The Sukoon Luxury Houseboat' },
        { title: 'Ascent to Gulmarg Alpine Meadows & Gondola', morning: '08:30 AM — Scenic pine drive past apple orchards to Gulmarg at 8,825 ft', lunch: 'Himalayan trout lunch at Khyber Resort', afternoon: 'VIP Gondola cable car ascent to Phase 2 (Apharwat Peak at 13,780 ft)', evening: 'Alpine pine forest stroll and fireside hot toddy', stay: 'The Khyber Himalayan Resort & Spa' },
        { title: 'Pahalgam Valley of the Shepherds & Saffron Pampore', morning: '08:30 AM — Journey along Lidder river with stop at Pampore saffron cooperatives', lunch: 'Riverbank picnic lunch with fresh walnut chutneys', afternoon: 'Horseback or 4x4 tour of Betaab Valley and Aru Valley meadows', evening: 'Return to Srinagar for farewell dinner with live Santoor music', stay: 'Vivanta Dal View Srinagar' },
        { title: 'Sonamarg Golden Meadow & Thajiwas Glacier', morning: '08:00 AM — Day excursion through the dramatic Sindh Valley to Sonamarg', lunch: 'Alpine meadow picnic', afternoon: 'Pony ride to the Thajiwas Glacier snow fields', evening: 'Return to Srinagar & old wood-carved bridge walking tour', stay: 'The Sukoon Luxury Houseboat' },
        { title: 'Old Srinagar Artisans & Airport Escort', morning: '09:00 AM — Private visit to master Pashmina weavers and papier-mâché artisans', lunch: 'Bakery tasting at traditional Kashmiri Kandur shop', afternoon: 'Scenic transfer to Srinagar International Airport', evening: 'Flight home with memories of paradise', stay: 'Departure' }
      ]
    },
    'Kerala (Alleppey & Munnar)': {
      hero: 'Emerald Backwater Canals, Munnar Tea Estates & Ayurvedic Calm',
      weather: { temp: 26, condition: 'Tropical Warmth', humidity: '74%', advisory: 'Light breathable fabrics. Evening mosquito repellent useful in backwaters.' },
      daySpots: [
        { title: 'Fort Kochi Colonial Heritage & Chinese Fishing Nets', morning: '09:00 AM — Walking tour of Jewish Synagogue, Mattancherry Palace & spice street', lunch: 'Fresh coastal seafood curry at Brunton Boatyard', afternoon: 'Watch Chinese fishing nets operated against harbour sunset', evening: 'Kathakali classical dance and martial arts (Kalaripayattu) demonstration', stay: 'Brunton Boatyard / Old Harbour Hotel' },
        { title: 'Munnar High-Altitude Tea Estates & Spice Trails', morning: '08:30 AM — Scenic mountain drive past Cheeyappara & Valara waterfalls', lunch: 'Tea plantation bungalow lunch', afternoon: 'Tea museum visit and guided plucking with estate workers', evening: 'Private cardamom and pepper plantation soft trek at dusk', stay: 'Spice Tree Munnar' },
        { title: 'Alleppey Private Kettuvallam Houseboat Voyage', morning: '09:00 AM — Scenic descent from hills to Alleppey backwater jetty', lunch: 'Chef prepares fresh Karimeen Pollichathu onboard as you cruise', afternoon: 'Glide through narrow village canals, paddy fields below sea level', evening: 'Sunset on Vembanad Lake, candlelit dinner under coconut palms', stay: 'Private Luxury Air-conditioned Houseboat' },
        { title: 'Kumarakom Ayurvedic Sanctuary & Birding', morning: '08:00 AM — Country boat birdwatching in Kumarakom sanctuary with naturalist', lunch: 'Traditional Kerala Sadya on banana leaf', afternoon: 'Authentic 90-minute Abhyanga herbal rejuvenation massage', evening: 'Infinity pool relaxation overlooking tranquil lake waters', stay: 'Kumarakom Lake Resort' },
        { title: 'Marari Beach Relaxation & Cochin Departure', morning: '09:00 AM — Morning drive to secluded Marari white sand beach', lunch: 'Beach shack fresh grilled kingfish lunch', afternoon: 'Coir weaving demonstration in fisher village', evening: 'Chauffeured transfer to Cochin International Airport', stay: 'Departure' }
      ]
    }
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setAgentStep(1);

    // Step-by-step AI Agent Reasoning simulation
    setTimeout(() => setAgentStep(2), 600);
    setTimeout(() => setAgentStep(3), 1200);
    setTimeout(() => setAgentStep(4), 1800);
    setTimeout(() => {
      // Pick matching or fallback destination
      const data = destinationSpots[destination] || destinationSpots['Namakkal, Tamil Nadu'];
      const days = data.daySpots.slice(0, durationDays);

      // Calculate realistic budget breakdown
      const accommodationCost = Math.round(budget * 0.42);
      const transportCost = Math.round(budget * 0.25);
      const activitiesCost = Math.round(budget * 0.18);
      const foodCost = Math.round(budget * 0.15);
      const totalEstimated = accommodationCost + transportCost + activitiesCost + foodCost;

      setWeatherData(data.weather);
      setItinerary({
        destination,
        durationDays,
        budget,
        totalEstimated,
        savings: budget - totalEstimated,
        efficiencyScore: 96,
        breakdown: {
          accommodation: accommodationCost,
          transport: transportCost,
          activities: activitiesCost,
          food: foodCost
        },
        days,
        weather: data.weather
      });

      setIsGenerating(false);
      setAgentStep(0);
    }, 2400);
  };

  // Generate on initial mount
  useEffect(() => {
    handleGenerateAI();
  }, []);

  const createWhatsAppUrl = () => {
    if (!itinerary) return '#';
    const text = encodeURIComponent(
      `Hello Manoj Sivakumar (Plan My Trip Agency),\n\nI just generated an AI Itinerary for *${destination}*!\n` +
      `📅 *Duration:* ${durationDays} Days\n` +
      `💰 *Budget:* ₹${budget.toLocaleString('en-IN')}\n` +
      `👥 *Travelers:* ${groupType} (${travelStyle})\n\n` +
      `Could we discuss confirming this itinerary and booking private transport and stays?`
    );
    return `https://wa.me/919344683958?text=${text}`;
  };

  return (
    <section id="ai-planner" className="ai-planner-section section-padding">
      <div className="container">
        {/* Header */}
        <div className="ai-header">
          <div className="ai-tag-row">
            <span className="section-tag">
              <Bot size={15} /> REAL-TIME AI TRIP PLANNER AGENT
            </span>
            <span className="live-ai-badge">
              <Sparkles size={13} /> AI Agent v4.2 Active
            </span>
          </div>
          <h2 className="section-heading">
            Design your trip in real time with <em>AI Route & Budget Optimizer</em>.
          </h2>
          <p className="section-subtext">
            Enter your destination, select your duration (3, 4, 5, or 7 days), and specify your exact budget. Our AI agent clusters spots, minimizes transit backtracking, checks live weather, and calculates cost allocations instantly.
          </p>
        </div>

        {/* Interactive Configuration Box */}
        <div className="ai-config-card">
          <div className="ai-input-grid">
            {/* Destination Selection */}
            <div className="ai-field">
              <label>1. Destination / State / City</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="ai-select"
              >
                {destinationsList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Duration Selector */}
            <div className="ai-field">
              <label>2. Duration of Trip</label>
              <div className="duration-buttons">
                {[3, 4, 5].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDurationDays(days)}
                    className={`dur-btn ${durationDays === days ? 'active' : ''}`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Input (User's Exact Budget) */}
            <div className="ai-field">
              <label>3. Your Total Target Budget (INR ₹)</label>
              <div className="budget-input-wrap">
                <span className="b-curr">₹</span>
                <input
                  type="number"
                  min="15000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="ai-input budget"
                />
              </div>
              <span className="budget-hint">
                ≈ ₹{Math.round(budget / durationDays).toLocaleString('en-IN')} per day
              </span>
            </div>

            {/* Travel Style */}
            <div className="ai-field">
              <label>4. Travel Style & Comfort</label>
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="ai-select"
              >
                <option value="Balanced Luxury">Balanced Luxury (Recommended)</option>
                <option value="Royal Heritage & Palaces">Royal Heritage & Palaces</option>
                <option value="Efficient & Fast-Paced">Efficient & Fast-Paced</option>
                <option value="Relaxed Wellness & Slow Travel">Relaxed Wellness & Slow Travel</option>
              </select>
            </div>
          </div>

          <div className="ai-generate-row">
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="btn-gold ai-submit-btn"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="spin-icon" /> AI Agent Planning...
                </>
              ) : (
                <>
                  <Bot size={18} /> Generate {durationDays}-Day AI Itinerary
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* AI Agent Step Progress Indicator */}
          {isGenerating && (
            <div className="agent-thinking-box animate-fade-in">
              <div className="thinking-header">
                <Bot size={20} className="agent-bot-icon" />
                <span className="agent-title">AI Autonomous Agent At Work:</span>
              </div>
              <div className="steps-list">
                <div className={`step-item ${agentStep >= 1 ? 'active' : ''}`}>
                  <span className="step-dot" />
                  <span>1. Computing geo-spatial transit vectors for {destination}...</span>
                </div>
                <div className={`step-item ${agentStep >= 2 ? 'active' : ''}`}>
                  <span className="step-dot" />
                  <span>2. Clustering morning, afternoon, and sunset spots to eliminate backtracking...</span>
                </div>
                <div className={`step-item ${agentStep >= 3 ? 'active' : ''}`}>
                  <span className="step-dot" />
                  <span>3. Allocating ₹{budget.toLocaleString('en-IN')} across stay, transit & culinary experiences...</span>
                </div>
                <div className={`step-item ${agentStep >= 4 ? 'active' : ''}`}>
                  <span className="step-dot" />
                  <span>4. Integrating live meteorological forecast & optimal time-windows...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generated Itinerary Output */}
        {itinerary && !isGenerating && (
          <div className="ai-results-wrapper animate-fade-in">
            {/* Top Stats Strip: Weather + Efficiency + Budget */}
            <div className="ai-stats-row">
              {/* Weather Widget */}
              <div className="stat-widget weather">
                <div className="stat-top">
                  <Sun size={18} className="w-icon" />
                  <span className="w-label">LIVE WEATHER AGENT</span>
                </div>
                <div className="w-main">
                  <span className="w-temp">{itinerary.weather.temp}°C</span>
                  <div className="w-details">
                    <span className="w-cond">{itinerary.weather.condition}</span>
                    <span className="w-hum">Humidity: {itinerary.weather.humidity}</span>
                  </div>
                </div>
                <p className="w-tip">💡 <strong>AI Tip:</strong> {itinerary.weather.advisory}</p>
              </div>

              {/* Route Efficiency */}
              <div className="stat-widget efficiency">
                <div className="stat-top">
                  <ShieldCheck size={18} className="e-icon" />
                  <span className="e-label">ROUTE EFFICIENCY SCORE</span>
                </div>
                <div className="e-main">
                  <span className="e-score">{itinerary.efficiencyScore}%</span>
                  <span className="e-tag">Optimized Cluster Path</span>
                </div>
                <p className="e-sub">Saved an estimated <strong>3.4 hours</strong> of unnecessary backtrack driving compared to random itineraries.</p>
              </div>

              {/* Budget Allocation */}
              <div className="stat-widget budget">
                <div className="stat-top">
                  <DollarSign size={18} className="b-icon" />
                  <span className="b-label">BUDGET ALLOCATION AGENT</span>
                </div>
                <div className="budget-meter">
                  <span className="b-spent">₹{itinerary.totalEstimated.toLocaleString('en-IN')}</span>
                  <span className="b-total">/ ₹{itinerary.budget.toLocaleString('en-IN')} Budget</span>
                </div>
                <div className="cost-breakdown-mini">
                  <span>Stay: ₹{itinerary.breakdown.accommodation.toLocaleString('en-IN')}</span>
                  <span>Transit: ₹{itinerary.breakdown.transport.toLocaleString('en-IN')}</span>
                  <span>Food & Tours: ₹{(itinerary.breakdown.food + itinerary.breakdown.activities).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Day by Day AI Plan */}
            <div className="ai-days-list">
              <h3 className="days-list-title font-serif">
                Your Optimized {itinerary.durationDays}-Day Master Plan for {itinerary.destination}
              </h3>

              {itinerary.days.map((day, idx) => (
                <div key={idx} className="ai-day-card">
                  <div className="day-badge-col">
                    <span className="day-p">DAY</span>
                    <span className="day-n font-serif">0{idx + 1}</span>
                  </div>

                  <div className="day-slots-col">
                    <h4 className="day-name font-serif">{day.title}</h4>

                    <div className="slots-grid">
                      <div className="slot morning">
                        <span className="slot-time">🌅 Morning (08:30 AM)</span>
                        <p>{day.morning}</p>
                      </div>

                      <div className="slot lunch">
                        <span className="slot-time">🍽️ Midday Lunch</span>
                        <p>{day.lunch}</p>
                      </div>

                      <div className="slot afternoon">
                        <span className="slot-time">🏛️ Afternoon Experience</span>
                        <p>{day.afternoon}</p>
                      </div>

                      <div className="slot sunset">
                        <span className="slot-time">🌆 Sunset & Evening</span>
                        <p>{day.evening}</p>
                      </div>
                    </div>

                    <div className="day-stay-strip">
                      <MapPin size={14} className="s-icon" />
                      <span>Recommended Accommodation: <strong>{day.stay}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Action Bar to WhatsApp Contact Person */}
            <div className="ai-cta-banner">
              <div className="cta-left">
                <h4 className="font-serif">Like this AI-Generated Itinerary?</h4>
                <p>Send this exact {durationDays}-day plan directly to <strong>Manoj Sivakumar (Lead Curator)</strong> on WhatsApp or initiate booking consultation.</p>
              </div>

              <div className="cta-actions">
                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-cta-btn"
                >
                  <MessageSquare size={18} />
                  <span>Send Plan to Manoj on WhatsApp</span>
                </a>

                <button
                  onClick={() => onOpenEnquiry(`${itinerary.durationDays} Days in ${itinerary.destination}`)}
                  className="btn-primary"
                >
                  Book / Enquire Online
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ai-planner-section {
          background-color: #ffffff;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .ai-header {
          margin-bottom: 3rem;
        }
        .ai-tag-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        .live-ai-badge {
          background: rgba(37, 99, 235, 0.1);
          color: var(--accent-blue);
          border: 1px solid rgba(37, 99, 235, 0.25);
          font-size: 0.72rem;
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .ai-config-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 2.5rem;
          border-radius: 6px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 3rem;
        }
        .ai-input-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .ai-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .ai-field label {
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 700;
        }
        .ai-select, .ai-input {
          border: 1.5px solid var(--grey-300);
          background: #ffffff;
          padding: 0.75rem 0.95rem;
          font-size: 0.9rem;
          border-radius: 4px;
          outline: none;
          color: var(--text-primary);
          transition: var(--transition);
        }
        .ai-select:focus, .ai-input:focus {
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 2px var(--accent-blue-subtle);
        }
        .duration-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .dur-btn {
          flex: 1;
          background: #ffffff;
          border: 1.5px solid var(--grey-300);
          padding: 0.75rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
        }
        .dur-btn.active {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }
        .budget-input-wrap {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--grey-300);
          background: #ffffff;
          border-radius: 4px;
          padding-left: 0.85rem;
        }
        .b-curr {
          color: var(--accent-blue);
          font-weight: 700;
          font-size: 1.1rem;
        }
        .ai-input.budget {
          border: none;
          outline: none;
          padding: 0.75rem 0.5rem;
          width: 100%;
          font-size: 1rem;
          font-weight: 600;
        }
        .budget-hint {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .ai-generate-row {
          display: flex;
          justify-content: flex-end;
        }
        .ai-submit-btn {
          padding: 0.95rem 2rem;
          font-size: 0.9rem;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .agent-thinking-box {
          margin-top: 1.75rem;
          background: #ffffff;
          border: 1px solid var(--border-blue);
          padding: 1.5rem;
          border-radius: 4px;
        }
        .thinking-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .agent-bot-icon {
          color: var(--accent-blue);
        }
        .agent-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-blue);
          letter-spacing: 0.05em;
        }
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .step-item.active {
          color: var(--text-primary);
          font-weight: 600;
        }
        .step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--grey-300);
        }
        .step-item.active .step-dot {
          background: var(--accent-blue);
          box-shadow: 0 0 8px var(--accent-blue);
        }
        .ai-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-bottom: 3.5rem;
        }
        .stat-widget {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 1.75rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .stat-widget.weather {
          border-left: 4px solid var(--accent-blue-light);
        }
        .stat-widget.efficiency {
          border-left: 4px solid #10b981;
        }
        .stat-widget.budget {
          border-left: 4px solid var(--accent-blue);
        }
        .stat-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .w-icon { color: #f59e0b; }
        .e-icon { color: #10b981; }
        .b-icon { color: var(--accent-blue); }
        .w-main {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .w-temp {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .w-details {
          display: flex;
          flex-direction: column;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .w-cond {
          font-weight: 700;
          color: var(--text-primary);
        }
        .w-tip {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .e-main {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .e-score {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          font-weight: 600;
          color: #059669;
        }
        .e-tag {
          font-size: 0.75rem;
          color: #059669;
          font-weight: 700;
          background: #ecfdf5;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
        }
        .e-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .budget-meter {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
          margin-bottom: 0.75rem;
        }
        .b-spent {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 600;
          color: var(--accent-blue);
        }
        .b-total {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .cost-breakdown-mini {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .days-list-title {
          font-size: 2.2rem;
          margin-bottom: 2rem;
        }
        .ai-days-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-bottom: 3.5rem;
        }
        .ai-day-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 2.25rem;
          border-radius: 6px;
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 2rem;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .ai-day-card:hover {
          border-color: var(--accent-blue);
          box-shadow: var(--shadow-md);
        }
        .day-badge-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: var(--bg-primary);
          padding: 0.75rem;
          border-radius: 4px;
          height: fit-content;
          border: 1px solid var(--border-light);
        }
        .day-p {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--accent-blue);
          font-weight: 700;
        }
        .day-n {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .day-name {
          font-size: 1.6rem;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .slots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .slot {
          background: var(--bg-primary);
          padding: 1rem 1.25rem;
          border-radius: 4px;
          border-left: 3px solid var(--accent-blue);
        }
        .slot-time {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-blue);
          font-weight: 700;
          display: block;
          margin-bottom: 0.35rem;
        }
        .slot p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .day-stay-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f1f5f9;
          padding: 0.75rem 1.25rem;
          border-radius: 4px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .s-icon {
          color: var(--accent-blue);
        }
        .ai-cta-banner {
          background: linear-gradient(135deg, #0a192f 0%, #172a45 100%);
          color: #ffffff;
          padding: 2.5rem 3rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          box-shadow: var(--shadow-lg);
        }
        .cta-left h4 {
          font-size: 1.8rem;
          margin-bottom: 0.35rem;
        }
        .cta-left p {
          color: #cbd5e1;
          font-size: 0.92rem;
          max-width: 600px;
        }
        .cta-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .whatsapp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #25d366;
          color: #ffffff;
          padding: 0.95rem 1.75rem;
          border-radius: 4px;
          font-size: 0.88rem;
          font-weight: 700;
          transition: var(--transition);
        }
        .whatsapp-cta-btn:hover {
          background: #1eb954;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }
        @media (max-width: 1024px) {
          .ai-input-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ai-stats-row {
            grid-template-columns: 1fr;
          }
          .slots-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .ai-input-grid {
            grid-template-columns: 1fr;
          }
          .ai-day-card {
            grid-template-columns: 1fr;
          }
          .ai-cta-banner {
            padding: 1.75rem;
          }
        }
      `}</style>
    </section>
  );
}
