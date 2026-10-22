import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Sun, Sparkles, Compass } from 'lucide-react';

export default function SeasonalCalendar() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(10); // Default to Nov (index 10)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Seasons: 'peak' (Gold), 'recommended' (Emerald), 'shoulder' (Terracotta), 'quiet' (Slate/Grey)
  const calendarRows = [
    {
      region: 'Northern India',
      sub: 'Rajasthan, UP, Delhi',
      seasons: ['peak', 'peak', 'recommended', 'shoulder', 'quiet', 'quiet', 'quiet', 'shoulder', 'recommended', 'peak', 'peak', 'peak'],
      bestDestinations: ['Rajasthan (Jaipur, Udaipur)', 'Agra (Taj Mahal)', 'Varanasi (Ganga Ghats)']
    },
    {
      region: 'Himalayan Destinations',
      sub: 'Kashmir, Ladakh, Himachal',
      seasons: ['shoulder', 'shoulder', 'recommended', 'peak', 'peak', 'peak', 'peak', 'peak', 'peak', 'recommended', 'shoulder', 'shoulder'],
      bestDestinations: ['Kashmir (Gulmarg, Dal Lake)', 'Ladakh (Pangong Tso)', 'Himachal (Mashobra, Spiti)']
    },
    {
      region: 'Southern Coasts & Backwaters',
      sub: 'Kerala, South India, Coorg',
      seasons: ['peak', 'peak', 'recommended', 'shoulder', 'quiet', 'quiet', 'shoulder', 'shoulder', 'recommended', 'peak', 'peak', 'peak'],
      bestDestinations: ['Alleppey (Private Houseboats)', 'Kumarakom', 'Chettinad Heritage Mansions']
    },
    {
      region: 'Wildlife Parks & Reserves',
      sub: 'Bandhavgarh, Kanha, Ranthambore',
      seasons: ['peak', 'peak', 'peak', 'peak', 'peak', 'quiet', 'quiet', 'quiet', 'quiet', 'recommended', 'peak', 'peak'],
      bestDestinations: ['Bandhavgarh Tiger Reserve', 'Kanha Sal Forests', 'Kaziranga Rhino Safaris']
    },
    {
      region: 'Island & Beach Sanctuaries',
      sub: 'Andamans, Lakshadweep',
      seasons: ['peak', 'peak', 'peak', 'recommended', 'shoulder', 'quiet', 'quiet', 'quiet', 'shoulder', 'recommended', 'peak', 'peak'],
      bestDestinations: ['Havelock Island (Radhanagar)', 'Neil Island Coral Lagoons', 'Port Blair Marine Reserves']
    }
  ];

  const seasonLabels = {
    peak: { label: 'Peak Season', color: '#c29b38', bg: 'rgba(194, 155, 56, 0.18)', desc: 'Optimal weather, crystal skies & cultural vibrancy' },
    recommended: { label: 'Recommended', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', desc: 'Pleasant temperatures & uncrowded monuments' },
    shoulder: { label: 'Shoulder Season', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', desc: 'Warmer or transition weather with serene pace' },
    quiet: { label: 'Quieter Season', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)', desc: 'Monsoon lushness or intense summer; specialized travel' }
  };

  const currentMonthName = fullMonthNames[selectedMonthIndex];
  const currentMonthAbbr = months[selectedMonthIndex];

  return (
    <section id="calendar" className="seasonal-calendar-section section-padding">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="calendar-header">
          <div className="calendar-title-col">
            <span className="section-tag">07 / THE EPHEMERIS</span>
            <h2 className="section-heading">
              India, <em>through the seasons</em>.
            </h2>
          </div>
          <p className="section-subtext">
            Because India spans 3,200 kilometres from snow peaks to tropical equator, every single month offers its own pinnacle region. Select any month below to discover the sublime provincial destinations in bloom.
          </p>
        </div>

        {/* Legend */}
        <div className="calendar-legend-bar">
          <span className="legend-label">SEASONAL KEY:</span>
          {Object.entries(seasonLabels).map(([key, item]) => (
            <div key={key} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: item.color }} />
              <span className="legend-text">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Interactive Matrix Table */}
        <div className="calendar-matrix-wrapper">
          <table className="calendar-table">
            <thead>
              <tr>
                <th className="region-col-header">REGION / ETHOS</th>
                {months.map((m, idx) => (
                  <th
                    key={m}
                    className={`month-col-header ${selectedMonthIndex === idx ? 'selected' : ''}`}
                    onClick={() => setSelectedMonthIndex(idx)}
                  >
                    <span>{m}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarRows.map((row, rIdx) => (
                <tr key={row.region} className="matrix-row">
                  <td className="region-cell">
                    <span className="cell-region-name font-serif">{row.region}</span>
                    <span className="cell-region-sub">{row.sub}</span>
                  </td>
                  {row.seasons.map((seasonKey, mIdx) => {
                    const season = seasonLabels[seasonKey];
                    const isColSelected = selectedMonthIndex === mIdx;
                    return (
                      <td
                        key={mIdx}
                        className={`season-cell ${isColSelected ? 'col-selected' : ''}`}
                        onClick={() => setSelectedMonthIndex(mIdx)}
                        title={`${row.region} in ${months[mIdx]}: ${season.label}`}
                      >
                        <div
                          className="season-dot"
                          style={{
                            backgroundColor: season.color,
                            boxShadow: isColSelected ? `0 0 10px ${season.color}` : 'none'
                          }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic Month Recommendation Banner */}
        <div className="month-focus-banner animate-fade-in" key={selectedMonthIndex}>
          <div className="focus-left">
            <span className="focus-badge">HIGHLIGHTED TRAVEL WINDOW</span>
            <h3 className="focus-month font-serif">{currentMonthName}</h3>
            <p className="focus-desc">
              During {currentMonthName}, subcontinental conditions provide exceptional clarity across high-heritage destinations, national parks, and coastal sanctuaries.
            </p>
          </div>

          <div className="focus-right">
            <span className="recommend-title">Prime Destinations to Visit in {currentMonthName}:</span>
            <div className="prime-dest-tags">
              {calendarRows
                .filter(row => ['peak', 'recommended'].includes(row.seasons[selectedMonthIndex]))
                .flatMap(row => row.bestDestinations)
                .slice(0, 5)
                .map((dest, i) => (
                  <span key={i} className="prime-pill">
                    <Compass size={13} className="prime-icon" /> {dest}
                  </span>
                ))}
            </div>

            <Link
              to={`/packages?month=${currentMonthAbbr}`}
              className="btn-gold focus-btn"
            >
              See Journeys for {currentMonthName}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .seasonal-calendar-section {
          background-color: var(--bg-primary);
        }
        .calendar-header {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }
        .calendar-legend-bar {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 1rem 1.75rem;
          border-radius: 2px;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .legend-label {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          font-weight: 700;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .legend-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .calendar-matrix-wrapper {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
          margin-bottom: 3rem;
        }
        .calendar-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }
        .calendar-table th,
        .calendar-table td {
          padding: 1.25rem 0.85rem;
          text-align: center;
        }
        .region-col-header {
          text-align: left;
          padding-left: 2rem;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          font-weight: 700;
          width: 28%;
          border-bottom: 1px solid var(--border-light);
        }
        .month-col-header {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-light);
          cursor: pointer;
          transition: var(--transition);
        }
        .month-col-header:hover {
          color: var(--accent-gold);
        }
        .month-col-header.selected {
          background: var(--text-primary);
          color: #ffffff;
        }
        .matrix-row {
          border-bottom: 1px solid var(--border-light);
          transition: var(--transition);
        }
        .matrix-row:hover {
          background: rgba(251, 249, 245, 0.7);
        }
        .region-cell {
          text-align: left;
          padding-left: 2rem;
          display: flex;
          flex-direction: column;
        }
        .cell-region-name {
          font-size: 1.25rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .cell-region-sub {
          font-size: 0.76rem;
          color: var(--text-muted);
        }
        .season-cell {
          cursor: pointer;
          transition: var(--transition);
        }
        .season-cell.col-selected {
          background: rgba(195, 154, 52, 0.08);
        }
        .season-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin: 0 auto;
          transition: var(--transition);
        }
        .season-cell:hover .season-dot {
          transform: scale(1.4);
        }
        .month-focus-banner {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-left: 4px solid var(--accent-gold);
          padding: 2.5rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 3rem;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }
        .focus-badge {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
          display: block;
          margin-bottom: 0.35rem;
        }
        .focus-month {
          font-size: 2.8rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          line-height: 1;
        }
        .focus-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .recommend-title {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 0.85rem;
        }
        .prime-dest-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .prime-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.4rem 0.85rem;
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .prime-icon {
          color: var(--accent-gold);
        }
        .focus-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        @media (max-width: 1024px) {
          .calendar-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .month-focus-banner {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
