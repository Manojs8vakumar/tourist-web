import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Compass, Calendar, Users, DollarSign, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function EnquiryModal({ isOpen, onClose, initialDestination = '' }) {
  const [formData, setFormData] = useState({
    fullName: 'Manoj Sivakumar',
    email: 'manojsivakumar2004@gmail.com',
    phone: '+91 93446 83958',
    destinationPreference: initialDestination || 'Namakkal, Tamil Nadu',
    travelMonth: 'November',
    departureDate: '2026-11-15',
    returnDate: '2026-11-22',
    travellersCount: 2,
    budget: 'INR 1,50,000 - 3,00,000',
    travelStyle: 'Bespoke Heritage & Temple Trail',
    additionalRequirements: 'Private chauffeur luxury itinerary, authentic temple darshan, and heritage resort stays.'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.submitEnquiry(formData);
      setResult(res);
    } catch (err) {
      setError(err.message || 'Unable to submit enquiry. Please check the fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {!result ? (
          <div className="enquiry-flow">
            <div className="modal-header">
              <span className="section-tag">BESPOKE TRAVEL CURATION</span>
              <h2 className="modal-title font-serif">Begin Your Journey</h2>
              <p className="modal-subtitle">
                Share your travel vision with our private curators. We will design a personalized, unhurried itinerary tailored to your rhythm.
              </p>
            </div>

            {error && (
              <div className="enquiry-alert error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="enquiry-form-grid">
              {/* Row 1: Contact Details */}
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. eleanor@vance.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Row 2: Destination & Timing */}
              <div className="form-group">
                <label>Destination Preference</label>
                <input
                  type="text"
                  name="destinationPreference"
                  placeholder="e.g. Rajasthan, Kashmir, South India"
                  value={formData.destinationPreference}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Preferred Travel Month</label>
                <select name="travelMonth" value={formData.travelMonth} onChange={handleChange}>
                  <option value="Flexible">Flexible</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of Travellers</label>
                <select
                  name="travellersCount"
                  value={formData.travellersCount}
                  onChange={handleChange}
                >
                  <option value="1">1 Solo Connoisseur</option>
                  <option value="2">2 Travellers (Couple / Friends)</option>
                  <option value="3">3 Travellers</option>
                  <option value="4">4 Travellers (Family / Group)</option>
                  <option value="5">5+ Multi-generational Party</option>
                </select>
              </div>

              {/* Row 3: Dates & Budget */}
              <div className="form-group">
                <label>Approx. Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Approx. Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Estimated Total Budget</label>
                <select name="budget" value={formData.budget} onChange={handleChange}>
                  <option value="INR 1,00,000 - 1,50,000">₹1,00,000 – ₹1,50,000</option>
                  <option value="INR 1,50,000 - 3,00,000">₹1,50,000 – ₹3,00,000 (Recommended)</option>
                  <option value="INR 3,00,000 - 5,00,000">₹3,00,000 – ₹5,00,000 (Ultra Luxury)</option>
                  <option value="INR 5,00,000+">₹5,00,000+ (Imperial Palace Suite)</option>
                </select>
              </div>

              {/* Row 4: Travel Style */}
              <div className="form-group full-width">
                <label>Preferred Travel Style</label>
                <div className="style-chips">
                  {[
                    'Royal Palace & Living Forts',
                    'Romantic Seclusion & Spa',
                    'Wilderness & Tiger Safari',
                    'Backwater & Slow Wellness',
                    'High Altitude Alpine Trekking',
                    'Temple Art & Living Architecture'
                  ].map((style) => (
                    <button
                      type="button"
                      key={style}
                      className={`style-chip ${formData.travelStyle === style ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, travelStyle: style })}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Notes */}
              <div className="form-group full-width">
                <label>Special Aspirations or Bespoke Requests</label>
                <textarea
                  name="additionalRequirements"
                  rows="3"
                  placeholder="e.g. Private sunset boat on Lake Pichola, private archaeologist guide, anniversary celebration..."
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-actions full-width">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold submit-btn"
                >
                  {loading ? 'Curating Proposal...' : 'Submit Bespoke Enquiry'}
                </button>
                <p className="privacy-note">
                  🔒 Your confidential details are secured by Plan My Trip Agency. We do not share guest data.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="enquiry-success animate-fade-in">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="success-icon" />
            </div>
            <span className="section-tag">ENQUIRY CONFIRMED</span>
            <h2 className="success-title font-serif">Every Journey Has a Story.</h2>
            <p className="success-desc">{result.message}</p>

            <div className="reference-card">
              <span className="ref-label">YOUR PRIVATE REFERENCE NUMBER</span>
              <span className="ref-number">{result.referenceNumber}</span>
              <p className="ref-tip">
                Please quote this reference in all correspondence with your dedicated luxury travel concierge.
              </p>
            </div>

            <div className="summary-pills">
              <div className="pill">Destination: <strong>{formData.destinationPreference}</strong></div>
              <div className="pill">Month: <strong>{formData.travelMonth}</strong></div>
              <div className="pill">Guest: <strong>{formData.fullName}</strong></div>
            </div>

            <button
              onClick={() => {
                setResult(null);
                onClose();
              }}
              className="btn-primary success-close-btn"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(20, 19, 17, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1.5rem;
          overflow-y: auto;
        }
        .modal-card {
          background: #ffffff;
          width: 100%;
          max-width: 820px;
          border-radius: 4px;
          padding: 3rem;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
          max-height: 92vh;
          overflow-y: auto;
        }
        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.5rem;
          transition: var(--transition);
        }
        .modal-close:hover {
          color: var(--text-primary);
        }
        .modal-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .modal-title {
          font-size: 2.4rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .modal-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          max-width: 580px;
          margin: 0 auto;
        }
        .enquiry-alert {
          padding: 0.85rem 1.25rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .enquiry-alert.error {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        .enquiry-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        .form-group label {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          border: 1px solid var(--border-light);
          padding: 0.75rem 0.95rem;
          font-size: 0.9rem;
          background: var(--bg-primary);
          color: var(--text-primary);
          border-radius: 2px;
          outline: none;
          transition: var(--transition);
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--accent-gold);
          background: #ffffff;
        }
        .style-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }
        .style-chip {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.45rem 0.9rem;
          font-size: 0.78rem;
          border-radius: 20px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .style-chip.active {
          background: var(--accent-gold);
          border-color: var(--accent-gold);
          color: #ffffff;
          font-weight: 500;
        }
        .modal-actions {
          margin-top: 1rem;
          text-align: center;
        }
        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-size: 0.92rem;
        }
        .privacy-note {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 0.75rem;
        }
        .enquiry-success {
          text-align: center;
          padding: 2rem 1rem;
        }
        .success-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-gold);
          margin-bottom: 1.25rem;
        }
        .success-title {
          font-size: 2.6rem;
          margin: 0.5rem 0;
        }
        .success-desc {
          color: var(--text-secondary);
          max-width: 520px;
          margin: 0 auto 2rem;
          font-size: 1.05rem;
        }
        .reference-card {
          background: var(--bg-primary);
          border: 1px dashed var(--accent-gold);
          padding: 1.75rem;
          border-radius: 4px;
          max-width: 440px;
          margin: 0 auto 2rem;
        }
        .ref-label {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .ref-number {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
          display: block;
        }
        .ref-tip {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }
        .summary-pills {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .summary-pills .pill {
          background: var(--bg-secondary);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .summary-pills strong {
          color: var(--text-primary);
        }
        .success-close-btn {
          min-width: 240px;
        }
        @media (max-width: 768px) {
          .modal-card {
            padding: 2rem 1.25rem;
          }
          .enquiry-form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
