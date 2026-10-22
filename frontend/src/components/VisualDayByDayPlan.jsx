import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  DollarSign, 
  Car, 
  Bed, 
  Utensils, 
  Compass, 
  MessageSquare, 
  Printer, 
  CheckCircle2,
  RefreshCw,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';
import { generateStructuredItineraryPlan } from '../services/geminiService';

export default function VisualDayByDayPlan({ 
  initialDestination = 'Rajasthan',
  onOpenEnquiry 
}) {
  const [destination, setDestination] = useState(initialDestination);
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState(55000);
  const [style, setStyle] = useState('Royal Heritage & Palaces');
  const [plan, setPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeDayTab, setActiveDayTab] = useState(1);

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    const result = await generateStructuredItineraryPlan({
      destination,
      days,
      budget,
      travelStyle: style
    });
    setPlan(result);
    setActiveDayTab(1);
    setIsGenerating(false);
  };

  useEffect(() => {
    handleGeneratePlan();
  }, [destination, days, budget, style]);

  const handleWhatsAppExport = () => {
    if (!plan) return;
    const summaryText = `Hello Manoj Sivakumar, I generated a ${plan.durationDays}-Day itinerary for ${plan.destination} with a budget of ₹${plan.totalBudget.toLocaleString('en-IN')}. Please confirm availability and private chauffeur logistics.`;
    window.open(`https://wa.me/919344683958?text=${encodeURIComponent(summaryText)}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="visual-planner" className="visual-planner-section">
      <div className="container">
        {/* Header */}
        <div className="planner-header">
          <span className="section-tag">
            <Sparkles size={14} /> AI ITINERARY ARCHITECT
          </span>
          <h2 className="section-heading font-serif">
            Day-by-Day Journey Plan for <em>{destination}</em>
          </h2>
          <p className="section-subtext">
            Rendered as a structured, readable daily plan with calculated budget allocations, morning-to-night milestones, and route efficiency tips — <strong>not an unreadable block of chat text</strong>.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="planner-controls-card">
          <div className="control-group">
            <label className="ctrl-label font-mono">DESTINATION</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Rajasthan, Kashmir, Tamil Nadu"
              className="ctrl-input"
            />
          </div>

          <div className="control-group">
            <label className="ctrl-label font-mono">DURATION (DAYS)</label>
            <div className="days-button-group">
              {[3, 4, 5, 7].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`day-btn ${days === d ? 'active' : ''}`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label className="ctrl-label font-mono">TOTAL BUDGET (INR)</label>
            <div className="budget-input-wrap">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                step="5000"
                min="20000"
                max="500000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="ctrl-input budget-input"
              />
            </div>
          </div>

          <div className="control-group">
            <label className="ctrl-label font-mono">TRAVEL STYLE</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="ctrl-input ctrl-select"
            >
              <option value="Royal Heritage & Palaces">Royal Heritage & Palaces</option>
              <option value="Backwaters & Wellness">Backwaters & Wellness</option>
              <option value="High Alpine & Nature">High Alpine & Nature</option>
              <option value="Temple Corridor & Spiritual">Temple Corridor & Spiritual</option>
            </select>
          </div>
        </div>

        {/* Structured Output Display */}
        {plan && (
          <div className="structured-itinerary-card animate-fade-in">
            {/* Top Summary Bar */}
            <div className="itinerary-summary-bar">
              <div className="is-info-col">
                <span className="is-badge font-mono">CALIBRATED ITINERARY</span>
                <h3 className="is-title font-serif">
                  {plan.durationDays} Days / {plan.durationNights} Nights Expedition
                </h3>
                <p className="is-desc">{plan.summary}</p>
              </div>

              <div className="is-actions-col">
                <div className="is-cost-box font-mono">
                  <span className="cost-label">ESTIMATED TOTAL</span>
                  <span className="cost-val">₹{plan.totalBudget.toLocaleString('en-IN')}</span>
                </div>
                <div className="is-btn-row">
                  <button onClick={handleWhatsAppExport} className="export-btn wa-export">
                    <MessageSquare size={15} />
                    <span>Book on WhatsApp</span>
                  </button>
                  <button onClick={handlePrint} className="export-btn print-export" title="Print Plan">
                    <Printer size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Budget Breakdown Tiles */}
            <div className="budget-breakdown-row font-mono">
              <div className="bb-tile">
                <span className="bb-label">ACCOMMODATION (42%)</span>
                <span className="bb-val">₹{plan.budgetBreakdown.stays.toLocaleString('en-IN')}</span>
              </div>
              <div className="bb-tile">
                <span className="bb-label">CHAUFFEURED TRANSIT (22%)</span>
                <span className="bb-val">₹{plan.budgetBreakdown.transport.toLocaleString('en-IN')}</span>
              </div>
              <div className="bb-tile">
                <span className="bb-label">GUIDES & EXPERIENCES (18%)</span>
                <span className="bb-val">₹{plan.budgetBreakdown.experiences.toLocaleString('en-IN')}</span>
              </div>
              <div className="bb-tile">
                <span className="bb-label">ROYAL DINING (12%)</span>
                <span className="bb-val">₹{plan.budgetBreakdown.dining.toLocaleString('en-IN')}</span>
              </div>
              <div className="bb-tile">
                <span className="bb-label">RESERVE CONTINGENCY (6%)</span>
                <span className="bb-val">₹{plan.budgetBreakdown.reserve.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Day Selector Tabs */}
            <div className="day-tabs-strip">
              {plan.days.map((d) => (
                <button
                  key={d.dayNumber}
                  onClick={() => setActiveDayTab(d.dayNumber)}
                  className={`day-tab-btn ${activeDayTab === d.dayNumber ? 'active' : ''}`}
                >
                  <span className="d-tab-num font-mono">DAY 0{d.dayNumber}</span>
                  <span className="d-tab-name">{d.title.split('—')[1] || d.title}</span>
                </button>
              ))}
            </div>

            {/* Active Day Card (Readable Structured Timetable) */}
            {plan.days
              .filter((d) => d.dayNumber === activeDayTab)
              .map((d) => (
                <div key={d.dayNumber} className="day-details-panel">
                  <div className="dd-header">
                    <span className="dd-pill font-mono">SCHEDULED EXPEDITION</span>
                    <h4 className="dd-title font-serif">{d.title}</h4>
                  </div>

                  <div className="daily-schedule-grid">
                    {/* Morning */}
                    <div className="schedule-card morning">
                      <div className="time-badge">
                        <Sun size={15} />
                        <span>MORNING · DAWN TO MIDDAY</span>
                      </div>
                      <p className="schedule-text">{d.morning}</p>
                    </div>

                    {/* Afternoon */}
                    <div className="schedule-card afternoon">
                      <div className="time-badge">
                        <Compass size={15} />
                        <span>AFTERNOON · CULTURAL IMMERSION</span>
                      </div>
                      <p className="schedule-text">{d.afternoon}</p>
                    </div>

                    {/* Evening */}
                    <div className="schedule-card evening">
                      <div className="time-badge">
                        <Sunset size={15} />
                        <span>EVENING · SUNDOWNERS & DINNER</span>
                      </div>
                      <p className="schedule-text">{d.evening}</p>
                    </div>
                  </div>

                  {/* Stay, Cuisine & Transit Bar */}
                  <div className="day-specs-bar">
                    <div className="spec-item">
                      <Bed size={16} className="spec-icon" />
                      <div>
                        <span className="spec-label font-mono">CURATED STAY</span>
                        <span className="spec-val">{d.stay}</span>
                      </div>
                    </div>

                    <div className="spec-item">
                      <Utensils size={16} className="spec-icon" />
                      <div>
                        <span className="spec-label font-mono">GASTRONOMY HIGHLIGHT</span>
                        <span className="spec-val">{d.dining}</span>
                      </div>
                    </div>

                    <div className="spec-item">
                      <Car size={16} className="spec-icon" />
                      <div>
                        <span className="spec-label font-mono">ROUTE & TRANSIT</span>
                        <span className="spec-val">{d.transitTip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <style>{`
        .visual-planner-section {
          padding: 5.5rem 0;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        .planner-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .planner-controls-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 1.75rem 2rem;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
          gap: 1.5rem;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.05);
          margin-bottom: 2.5rem;
        }
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .ctrl-label {
          font-size: 0.68rem;
          color: #64748b;
          letter-spacing: 0.12em;
        }
        .ctrl-input {
          padding: 0.65rem 0.85rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #0f172a;
          outline: none;
          background: #f8fafc;
          transition: border-color 0.2s ease;
        }
        .ctrl-input:focus {
          border-color: #2563eb;
          background: #ffffff;
        }
        .days-button-group {
          display: flex;
          gap: 0.35rem;
        }
        .day-btn {
          flex: 1;
          padding: 0.65rem 0.45rem;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .day-btn.active {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }
        .budget-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .currency-prefix {
          position: absolute;
          left: 0.75rem;
          color: #64748b;
          font-weight: 700;
        }
        .budget-input {
          padding-left: 1.85rem;
          width: 100%;
        }
        .ctrl-select {
          cursor: pointer;
        }
        .structured-itinerary-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 45px rgba(15, 23, 42, 0.08);
        }
        .itinerary-summary-bar {
          padding: 2rem;
          background: #0f172a;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }
        .is-badge {
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 0.5rem;
        }
        .is-title {
          font-size: 1.7rem;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }
        .is-desc {
          font-size: 0.88rem;
          color: #94a3b8;
          max-width: 600px;
          line-height: 1.6;
        }
        .is-actions-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.85rem;
        }
        .is-cost-box {
          text-align: right;
        }
        .cost-label {
          font-size: 0.65rem;
          color: #94a3b8;
          letter-spacing: 0.1em;
          display: block;
        }
        .cost-val {
          font-size: 1.8rem;
          color: #38bdf8;
          font-weight: 700;
        }
        .is-btn-row {
          display: flex;
          gap: 0.5rem;
        }
        .export-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .wa-export {
          background: #25d366;
          color: #ffffff;
          border: none;
        }
        .wa-export:hover {
          background: #1eb857;
        }
        .print-export {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .print-export:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .budget-breakdown-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          background: #1e293b;
          border-top: 1px solid #334155;
          border-bottom: 1px solid #334155;
        }
        .bb-tile {
          padding: 0.85rem 1rem;
          border-right: 1px solid #334155;
          text-align: center;
        }
        .bb-tile:last-child {
          border-right: none;
        }
        .bb-label {
          font-size: 0.6rem;
          color: #94a3b8;
          display: block;
          margin-bottom: 0.25rem;
        }
        .bb-val {
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 700;
        }
        .day-tabs-strip {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          overflow-x: auto;
        }
        .day-tab-btn {
          padding: 1rem 1.75rem;
          background: transparent;
          border: none;
          border-right: 1px solid #e2e8f0;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .day-tab-btn:hover {
          background: #ffffff;
        }
        .day-tab-btn.active {
          background: #ffffff;
          border-bottom-color: #2563eb;
        }
        .d-tab-num {
          font-size: 0.65rem;
          color: #2563eb;
          font-weight: 700;
          display: block;
        }
        .d-tab-name {
          font-size: 0.85rem;
          color: #0f172a;
          font-weight: 600;
        }
        .day-details-panel {
          padding: 2.5rem;
        }
        .dd-header {
          margin-bottom: 1.75rem;
        }
        .dd-pill {
          font-size: 0.68rem;
          color: #2563eb;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 0.25rem;
        }
        .dd-title {
          font-size: 1.55rem;
          color: #0a192f;
        }
        .daily-schedule-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .schedule-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.5rem;
        }
        .time-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: #1d4ed8;
          margin-bottom: 0.75rem;
        }
        .schedule-text {
          font-size: 0.88rem;
          color: #334155;
          line-height: 1.6;
        }
        .day-specs-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          padding: 1.25rem 1.75rem;
        }
        .spec-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .spec-icon {
          color: #2563eb;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .spec-label {
          font-size: 0.65rem;
          color: #1d4ed8;
          letter-spacing: 0.1em;
          display: block;
        }
        .spec-val {
          font-size: 0.85rem;
          color: #0f172a;
          font-weight: 600;
        }
        @media (max-width: 1024px) {
          .planner-controls-card {
            grid-template-columns: 1fr 1fr;
          }
          .itinerary-summary-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .is-actions-col {
            align-items: flex-start;
          }
          .daily-schedule-grid, .day-specs-bar {
            grid-template-columns: 1fr;
          }
          .budget-breakdown-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
