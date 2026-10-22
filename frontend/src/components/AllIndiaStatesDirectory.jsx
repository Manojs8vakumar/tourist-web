import React, { useState } from 'react';
import { MapPin, Search, Compass, ArrowRight, Sparkles, Filter, Check } from 'lucide-react';

export default function AllIndiaStatesDirectory({ onSelectStateForAI }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const statesData = [
    {
      state: 'Tamil Nadu',
      region: 'South India',
      tagline: 'Ancient Dravidian Stone Temples, Monolithic Forts & Hill Stations',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Namakkal Rock Fort & 18-ft Anjaneyar Temple',
        'Madurai Meenakshi Amman Temple',
        'Thanjavur Brihadisvara (UNESCO)',
        'Ooty & Nilgiri Mountain Toy Train',
        'Rameswaram Ramanathaswamy Temple',
        'Mahabalipuram Shore Temples',
        'Kodaikanal Lake & Coaker’s Walk',
        'Chettinad Heritage Mansions & Cuisine'
      ]
    },
    {
      state: 'Kerala',
      region: 'South India',
      tagline: 'Emerald Backwaters, Misty Tea Estates & Ayurvedic Sanctuaries',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Alleppey Private Kettuvallam Houseboats',
        'Munnar High-Altitude Tea Plantations',
        'Wayanad Chembra Peak & Edakkal Caves',
        'Fort Kochi Chinese Fishing Nets',
        'Varkala Cliff & Papanasam Beach',
        'Thekkady Periyar Wildlife Sanctuary',
        'Athirappilly Waterfalls (Niagara of India)'
      ]
    },
    {
      state: 'Rajasthan',
      region: 'North India',
      tagline: 'Sandstone Citadels, Desert Dune Camps & Royal Living Palaces',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Amber Fort & City Palace (Jaipur)',
        'Lake Pichola & Taj Lake Palace (Udaipur)',
        'Mehrangarh Fort & Blue City (Jodhpur)',
        'Jaisalmer Golden Fort & Sam Sand Dunes',
        'Ranthambore Tiger National Park',
        'Kumbhalgarh Great Wall of India',
        'Pushkar Holy Lake & Brahma Temple'
      ]
    },
    {
      state: 'Uttar Pradesh',
      region: 'North India',
      tagline: 'Taj Mahal Marble Icon, Eternal Ganga Ghats & Awadhi Royalty',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Taj Mahal Sunrise (Agra UNESCO)',
        'Varanasi Morning Ganga Aarti & Ghats',
        'Fatehpur Sikri Imperial Mughal City',
        'Lucknow Rumi Darwaza & Bara Imambara',
        'Ayodhya Ram Mandir & Saryu River',
        'Sarnath Buddhist Monasteries',
        'Mathura & Vrindavan Krishna Temples'
      ]
    },
    {
      state: 'Himachal Pradesh',
      region: 'North India',
      tagline: 'Pine Valleys, High Snow Passes & Monastic Sanctuaries',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Manali, Solang Valley & Atal Tunnel',
        'Shimla Mall Road & Wildflower Hall',
        'Spiti Valley, Key Gompa & Chandratal Lake',
        'Dharamshala & McLeod Ganj (Dalai Lama)',
        'Kasol & Parvati Valley Pine Trails',
        'Kinnaur Kalpa & Sangla Apple Valleys',
        'Bir Billing (World’s Paragliding Hub)'
      ]
    },
    {
      state: 'Jammu & Kashmir',
      region: 'North India',
      tagline: 'Paradise on Earth: Cedar Houseboats & Alpine Meadows',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Dal Lake Private Shikaras & Houseboats',
        'Gulmarg Gondola & Apharwat Peak',
        'Pahalgam Betaab Valley & Aru Valley',
        'Sonamarg Golden Meadow & Thajiwas Glacier',
        'Pampore Saffron Cooperatives',
        'Yusmarg Untouched Pine Forest',
        'Vaishno Devi Sacred Shrine (Katra)'
      ]
    },
    {
      state: 'Ladakh',
      region: 'North India',
      tagline: 'High-Altitude Moonscapes, Cliff Monasteries & Cobalt Glacial Lakes',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Pangong Tso Cobalt High-Altitude Lake',
        'Nubra Valley Hunder Sand Dunes & Camels',
        'Khardung La Pass (17,982 ft)',
        'Thiksey & Hemis Monasteries',
        'Tso Moriri Glacial Sanctuary',
        'Turtuk Balti Border Village',
        'Magnetic Hill & Zanskar River Confluence'
      ]
    },
    {
      state: 'Karnataka',
      region: 'South India',
      tagline: 'Monumental Hampi UNESCO Ruins, Mysore Palace & Coorg Coffee',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Hampi Vijayanagara UNESCO Empire Ruins',
        'Mysore Amba Vilas Palace & Chamundi Hill',
        'Coorg Misty Coffee & Cardamom Plantations',
        'Gokarna Secluded Om & Kudle Beaches',
        'Badami Rock-cut Cave Temples & Pattadakal',
        'Chikmagalur Mullayanagiri Peak',
        'Nagarhole & Bandipur Tiger Reserves'
      ]
    },
    {
      state: 'Goa',
      region: 'West & Central',
      tagline: 'Portuguese Heritage Villas, Pristine Bays & Dudhsagar Cascades',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Old Goa Basilica of Bom Jesus (UNESCO)',
        'Palolem & Agonda Secluded South Beaches',
        'Dudhsagar Four-tiered Waterfalls',
        'Panaji Fontainhas Latin Quarter',
        'Fort Aguada & Chapora Forts',
        'Mandovi River Sunset Catamaran Charters',
        'Spice Plantation Dining Experience'
      ]
    },
    {
      state: 'Madhya Pradesh',
      region: 'West & Central',
      tagline: 'Heart of India: Tiger Wilderness, Khajuraho Art & Marble Gorges',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Bandhavgarh Tiger Tracking Safaris',
        'Khajuraho UNESCO Erotic Temple Sculptures',
        'Kanha Sal Forests & Barasingha Meadows',
        'Bhedaghat Narmada River Marble Rocks',
        'Sanchi Buddhist Great Stupa (UNESCO)',
        'Gwalior Fort & Jai Vilas Palace',
        'Orchha Medieval River Palaces & Cenotaphs'
      ]
    },
    {
      state: 'Uttarakhand',
      region: 'North India',
      tagline: 'Sacred Ganga Yoga, Valley of Flowers & Jim Corbett Tiger Corridors',
      image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Rishikesh Private Yoga & Ganga Aarti',
        'Haridwar Har Ki Pauri Sacred Ghats',
        'Jim Corbett National Park Jeep Safari',
        'Valley of Flowers National Park (UNESCO)',
        'Nainital Naini Lake & Snow View',
        'Mussoorie Queen of the Hills & Kempty Falls',
        'Auli Skiing Slopes with Nanda Devi Views'
      ]
    },
    {
      state: 'Gujarat',
      region: 'West & Central',
      tagline: 'Statue of Unity, White Rann of Kutch & Asiatic Lion Haven',
      image: 'https://images.unsplash.com/photo-1609137144822-26a9e1cf4b6e?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Statue of Unity (World’s Tallest Monument)',
        'Rann of Kutch White Salt Desert (Rann Utsav)',
        'Gir National Park (Only Asiatic Lion Habitat)',
        'Somnath & Dwarkadhish Sacred Temples',
        'Modhera 11th-century Sun Temple',
        'Rani Ki Vav Stepwell (Patan UNESCO)',
        'Ahmedabad Sabarmati Ashram & Heritage Walk'
      ]
    },
    {
      state: 'Maharashtra',
      region: 'West & Central',
      tagline: 'Ajanta-Ellora Caves, Western Ghats & Konkan Coastline',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Ajanta & Ellora UNESCO Rock-cut Caves',
        'Gateway of India & Marine Drive (Mumbai)',
        'Lonavala, Khandala & Karla Caves',
        'Mahabaleshwar Strawberry Valleys',
        'Tadoba-Andhari Tiger Reserve',
        'Shirdi Sai Baba Temple',
        'Kashid & Alibaug Coastal Forts'
      ]
    },
    {
      state: 'West Bengal',
      region: 'East & North-East',
      tagline: 'Darjeeling Himalayan Railway, Sunderbans Mangroves & Kolkata Heritage',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Darjeeling Tiger Hill Kanchenjunga Sunrise',
        'Darjeeling Himalayan Toy Train (UNESCO)',
        'Sundarbans Tiger Mangrove Delta (UNESCO)',
        'Victoria Memorial & Howrah Bridge (Kolkata)',
        'Kalimpong Buddhist Monasteries',
        'Shantiniketan (Rabindranath Tagore Heritage)',
        'Digha & Mandarmani Coastal Beaches'
      ]
    },
    {
      state: 'Odisha',
      region: 'East & North-East',
      tagline: 'Monumental Konark Sun Temple, Chilika Flamingos & Puri Coast',
      image: 'https://images.unsplash.com/photo-1629813366051-b58137b2792c?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Konark Sun Temple Chariot Wheels (UNESCO)',
        'Chilika Lake Irrawaddy Dolphins & Flamingos',
        'Jagannath Temple (Puri Holy Char Dham)',
        'Raghurajpur Pattachitra Artisan Village',
        'Udayagiri & Khandagiri Ancient Jain Caves',
        'Bhubaneswar Temple City & Lingaraj Temple',
        'Simlipal Tiger & Biosphere Reserve'
      ]
    },
    {
      state: 'Sikkim',
      region: 'East & North-East',
      tagline: 'Five Sacred Peaks of Kanchenjunga, Alpine Lakes & Tea Sanctuaries',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Gurudongmar High-Altitude Sacred Lake (17,800 ft)',
        'Tsomgo Lake & Baba Mandir (Nathu La Pass)',
        'Rumtek & Pemayangtse Monasteries',
        'Pelling Skywalk & Kanchenjunga Views',
        'Yumthang Valley of Rhododendron Flowers',
        'Ravangla Buddha Park Colossal Statue',
        'Temi Tea Estate (Sikkim’s Only Tea Garden)'
      ]
    },
    {
      state: 'Meghalaya & Assam',
      region: 'East & North-East',
      tagline: 'Living Root Bridges, Dawki Glass River & Kaziranga Rhinos',
      image: 'https://images.unsplash.com/photo-1616489953149-8049ecadab93?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Kaziranga One-Horned Rhino Safari (UNESCO)',
        'Cherrapunji Double Decker Living Root Bridges',
        'Dawki Umngot Transparent Crystal River',
        'Mawlynnong (Cleanest Village in Asia)',
        'Kamakhya Shakti Peeth Temple (Guwahati)',
        'Majuli Island (World’s Largest River Island)',
        'Nohkalikai Falls (India’s Tallest Plunge Fall)'
      ]
    },
    {
      state: 'Andaman & Nicobar Islands',
      region: 'Islands',
      tagline: 'Turquoise Corals, Radhanagar White Sands & Marine Seclusion',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
      spots: [
        'Radhanagar Beach No. 7 (Asia’s Best Beach)',
        'Elephant Beach Private Coral Snorkeling',
        'Neil Island Bharatpur & Natural Bridge',
        'Cellular Jail Historical Memorial (Port Blair)',
        'Baratang Island Limestone Caves & Mangroves',
        'Ross Island (British Colonial Ruins & Deers)',
        'Jolly Buoy & Red Skin Island Marine Reserves'
      ]
    }
  ];

  const regions = ['All', 'South India', 'North India', 'West & Central', 'East & North-East', 'Islands'];

  const filteredStates = statesData.filter((s) => {
    const matchesRegion = selectedRegion === 'All' || s.region === selectedRegion;
    const matchesSearch = s.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.spots.some(sp => sp.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="all-india-directory" className="all-india-section section-padding">
      <div className="container">
        {/* Header */}
        <div className="dir-header">
          <div className="dir-title-area">
            <span className="section-tag">
              <Compass size={15} /> ALL-INDIA PROVINCIAL ATLAS
            </span>
            <h2 className="section-heading">
              Every State & Iconic <em>Tourist Spot</em> in India.
            </h2>
          </div>
          <p className="section-subtext">
            Explore comprehensive destination profiles spanning all sovereign states of India. Discover temples, living forts, hill valleys, and beaches — with instant 1-click AI itinerary routing!
          </p>
        </div>

        {/* Search & Region Filters */}
        <div className="dir-controls-bar">
          <div className="dir-search-wrap">
            <Search size={18} className="d-icon" />
            <input
              type="text"
              placeholder="Search any State, Monument, or Spot (e.g. Namakkal, Taj Mahal, Ooty, Hampi, Kolli Hills)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dir-search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="d-clear">Clear</button>
            )}
          </div>

          <div className="region-filter-pills">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`r-pill ${selectedRegion === reg ? 'active' : ''}`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Status Count */}
        <div className="dir-status-line">
          <span>Displaying <strong>{filteredStates.length}</strong> States & Territories with <strong>{filteredStates.reduce((acc, s) => acc + s.spots.length, 0)}+</strong> Verified Tourist Spots</span>
        </div>

        {/* States Cards Grid */}
        <div className="states-atlas-grid">
          {filteredStates.map((item) => (
            <div key={item.state} className="state-atlas-card animate-fade-in">
              <div className="state-media">
                <img src={item.image} alt={item.state} className="state-img" loading="lazy" />
                <span className="state-region-badge">{item.region}</span>
                <span className="state-spots-count">{item.spots.length} Iconic Spots</span>
              </div>

              <div className="state-body">
                <h3 className="state-name font-serif">{item.state}</h3>
                <p className="state-tagline font-serif">"{item.tagline}"</p>

                <div className="spots-list-box">
                  <span className="spots-title">Notable Tourist Spots:</span>
                  <div className="spots-tags-wrap">
                    {item.spots.map((spot, i) => (
                      <span key={i} className="spot-tag">
                        <Check size={11} className="s-chk" /> {spot}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="state-card-footer">
                  <button
                    onClick={() => {
                      if (onSelectStateForAI) {
                        onSelectStateForAI(item.state);
                      }
                      const el = document.getElementById('ai-planner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-gold plan-ai-btn"
                  >
                    <Sparkles size={14} /> Plan {item.state} with AI Agent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .all-india-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-light);
        }
        .dir-header {
          margin-bottom: 3rem;
        }
        .dir-controls-bar {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 1.75rem 2rem;
          border-radius: 6px;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .dir-search-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-primary);
          border: 1.5px solid var(--grey-300);
          padding: 0.75rem 1.25rem;
          border-radius: 4px;
        }
        .dir-search-wrap:focus-within {
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 2px var(--accent-blue-subtle);
        }
        .d-icon {
          color: var(--accent-blue);
        }
        .dir-search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 1rem;
          color: var(--text-primary);
        }
        .d-clear {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.8rem;
        }
        .region-filter-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .r-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.5rem 1.1rem;
          font-size: 0.82rem;
          border-radius: 20px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: var(--transition);
          font-weight: 500;
        }
        .r-pill:hover {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }
        .r-pill.active {
          background: var(--accent-blue);
          color: #ffffff;
          border-color: var(--accent-blue);
        }
        .dir-status-line {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }
        .states-atlas-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.25rem;
        }
        .state-atlas-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 6px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
        }
        .state-atlas-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-blue);
        }
        .state-media {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .state-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .state-atlas-card:hover .state-img {
          transform: scale(1.06);
        }
        .state-region-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(10, 25, 47, 0.85);
          color: #ffffff;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: 2px;
          font-weight: 700;
        }
        .state-spots-count {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--accent-blue);
          font-size: 0.74rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 2px;
        }
        .state-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .state-name {
          font-size: 1.85rem;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }
        .state-tagline {
          font-size: 0.95rem;
          color: var(--accent-blue);
          font-style: italic;
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }
        .spots-list-box {
          background: var(--bg-primary);
          border-left: 3px solid var(--accent-blue);
          padding: 1rem 1.25rem;
          border-radius: 2px;
          margin-bottom: 1.75rem;
          flex: 1;
        }
        .spots-title {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
          display: block;
          margin-bottom: 0.6rem;
        }
        .spots-tags-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .spot-tag {
          font-size: 0.8rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          line-height: 1.4;
        }
        .s-chk {
          color: var(--accent-blue);
          flex-shrink: 0;
        }
        .state-card-footer {
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .plan-ai-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.82rem;
          padding: 0.75rem;
        }
        @media (max-width: 1080px) {
          .states-atlas-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .states-atlas-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
