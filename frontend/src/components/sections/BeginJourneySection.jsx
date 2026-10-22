import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Compass, Calendar, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

export default function BeginJourneySection({ defaultDestination = '' }) {
  const [formData, setFormData] = useState({
    fullName: 'Manoj Sivakumar',
    email: 'manojsivakumar2004@gmail.com',
    phone: '+91 93446 83958',
    destinationPreference: defaultDestination || 'Namakkal, Tamil Nadu',
    travelMonth: 'November',
    departureDate: '2026-11-15',
    returnDate: '2026-11-22',
    travellersCount: 2,
    budget: 'INR 1,50,000 - 3,00,000',
    travelStyle: 'Bespoke Heritage & Temple Trail',
    additionalRequirements: 'Curated private chauffeur tour, authentic Dravidian temple darshan, and heritage mansion stays.'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
      setError(err.message || 'Submission error. Please ensure all mandatory fields are valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" className="begin-journey-section section-padding">
      <div className="container">
        <div className="enquiry-card-wrapper">
          <div className="enquiry-intro-col">
            <span className="section-tag">11 / BESPOKE ITINERARY REQUEST</span>
            <h2 className="enquiry-main-title font-serif">
              Begin a <em>journey</em>.
            </h2>
            <p className="enquiry-lead">
              Our private curators do not work from pre-assembled catalog templates. Every journey begins with a conversation about what moves you.
            </p>

            <div className="concierge-features">
              <div className="c-feature">
                <span className="c-num">01</span>
                <div>
                  <h4 className="font-serif">Dedicated Subcontinental Curator</h4>
                  <p>A single, senior luxury specialist handles your passage from initial vision to final homecoming.</p>
                </div>
              </div>
              <div className="c-feature">
                <span className="c-num">02</span>
                <div>
                  <h4 className="font-serif">Private Aircraft & Chauffeur Logistics</h4>
                  <p>Seamless point-to-point transitions via verified luxury vehicles and chartered flights.</p>
                </div>
              </div>
              <div className="c-feature">
                <span className="c-num">03</span>
                <div>
                  <h4 className="font-serif">Private Access & Living Royalty</h4>
                  <p>Closed-doors access to temple sanctuaries, museum vaults, and private palace dining courtyards.</p>
                </div>
              </div>
            </div>

            <div className="direct-assistance-box">
              <span className="assist-title">Prefer Direct Discussion?</span>
              <p className="assist-phone">+91 93446 83958 / concierge@planmytrip.agency</p>
              <span className="assist-hours">Mon – Sun • 09:00 to 20:00 IST</span>
            </div>
          </div>

          <div className="enquiry-form-col">
            {!result ? (
              <form onSubmit={handleSubmit} className="enquiry-box">
                <h3 className="form-heading font-serif">Request Your Tailored Proposal</h3>
                <p className="form-sub">Directly connected to our database. Receive your unique reference immediately.</p>

                {error && (
                  <div className="form-alert error">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-fields-grid">
                  <div className="field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Destination Preference</label>
                    <input
                      type="text"
                      name="destinationPreference"
                      value={formData.destinationPreference}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Travel Month</label>
                    <select name="travelMonth" value={formData.travelMonth} onChange={handleChange}>
                      <option value="November">November (Ideal Season)</option>
                      <option value="December">December</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="October">October</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Travellers</label>
                    <select name="travellersCount" value={formData.travellersCount} onChange={handleChange}>
                      <option value="1">1 Solo Connoisseur</option>
                      <option value="2">2 Travellers</option>
                      <option value="3">3 Travellers</option>
                      <option value="4">4 Travellers</option>
                      <option value="5">5+ Party</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Departure Date</label>
                    <input
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Return Date</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field">
                    <label>Budget Tier</label>
                    <select name="budget" value={formData.budget} onChange={handleChange}>
                      <option value="INR 1,50,000 - 3,00,000">₹1,50,000 – ₹3,00,000 (Recommended)</option>
                      <option value="INR 3,00,000 - 5,00,000">₹3,00,000 – ₹5,00,000 (Ultra Luxury)</option>
                      <option value="INR 5,00,000+">₹5,00,000+ (Imperial Palace Suite)</option>
                      <option value="INR 1,00,000 - 1,50,000">₹1,00,000 – ₹1,50,000</option>
                    </select>
                  </div>

                  <div className="field full">
                    <label>Travel Style</label>
                    <input
                      type="text"
                      name="travelStyle"
                      value={formData.travelStyle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field full">
                    <label>Aspirations & Additional Requirements</label>
                    <textarea
                      name="additionalRequirements"
                      rows="3"
                      value={formData.additionalRequirements}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold form-submit-btn"
                >
                  {loading ? 'Submitting to Concierge...' : 'Submit Bespoke Journey Enquiry'}
                  <ArrowRight size={16} />
                </button>

                <div className="security-tag">
                  <ShieldCheck size={14} className="shield-icon" />
                  <span>Verified Submission to Spring Boot REST API & MySQL Storage</span>
                </div>
              </form>
            ) : (
              <div className="inline-success-box animate-fade-in">
                <CheckCircle2 size={54} className="inline-success-icon" />
                <span className="section-tag">ENQUIRY RECORDED</span>
                <h3 className="inline-success-title font-serif">Your Journey Begins Here.</h3>
                <p className="inline-success-desc">{result.message}</p>

                <div className="inline-ref-card">
                  <span className="ref-sub-label">CONFIRMED REFERENCE CODE</span>
                  <span className="ref-bold font-serif">{result.referenceNumber}</span>
                  <p className="ref-help">
                    A copy has been recorded in our MySQL database under reference {result.referenceNumber}.
                  </p>
                </div>

                <div className="guest-recap">
                  <div>Guest: <strong>{formData.fullName}</strong></div>
                  <div>Email: <strong>{formData.email}</strong></div>
                  <div>Destination: <strong>{formData.destinationPreference}</strong></div>
                </div>

                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary"
                >
                  Submit Another Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .begin-journey-section {
          background-color: var(--bg-primary);
        }
        .enquiry-card-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 4.5rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 4.5rem;
          border-radius: 2px;
          box-shadow: var(--shadow-md);
        }
        .enquiry-main-title {
          font-size: clamp(2.6rem, 4.5vw, 4rem);
          color: var(--text-primary);
          margin-bottom: 1.25rem;
        }
        .enquiry-lead {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 3rem;
        }
        .concierge-features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .c-feature {
          display: flex;
          gap: 1.25rem;
        }
        .c-num {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--accent-gold);
          font-weight: 600;
        }
        .c-feature h4 {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }
        .c-feature p {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .direct-assistance-box {
          background: var(--bg-primary);
          border-left: 2px solid var(--accent-gold);
          padding: 1.25rem 1.5rem;
        }
        .assist-title {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }
        .assist-phone {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--text-primary);
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .assist-hours {
          font-size: 0.76rem;
          color: var(--accent-gold);
        }
        .enquiry-box {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 3rem;
          border-radius: 2px;
        }
        .form-heading {
          font-size: 1.85rem;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }
        .form-sub {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        .form-alert {
          padding: 0.75rem 1rem;
          border-radius: 2px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .form-alert.error {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }
        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .field.full {
          grid-column: 1 / -1;
        }
        .field label {
          font-size: 0.74rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .field input,
        .field select,
        .field textarea {
          border: 1px solid var(--border-light);
          padding: 0.75rem 0.95rem;
          font-size: 0.9rem;
          background: #ffffff;
          color: var(--text-primary);
          border-radius: 2px;
          outline: none;
          transition: var(--transition);
        }
        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 1px var(--accent-gold);
        }
        .form-submit-btn {
          width: 100%;
          padding: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          font-size: 0.9rem;
        }
        .security-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 1rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .shield-icon {
          color: var(--accent-gold);
        }
        .inline-success-box {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 4rem 3rem;
          text-align: center;
        }
        .inline-success-icon {
          color: var(--accent-gold);
          margin-bottom: 1.25rem;
        }
        .inline-success-title {
          font-size: 2.2rem;
          margin: 0.5rem 0;
        }
        .inline-success-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .inline-ref-card {
          background: #ffffff;
          border: 1px dashed var(--accent-gold);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        .ref-sub-label {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.35rem;
        }
        .ref-bold {
          font-size: 2.2rem;
          color: var(--accent-gold);
          font-weight: 600;
          display: block;
        }
        .ref-help {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }
        .guest-recap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        @media (max-width: 1024px) {
          .enquiry-card-wrapper {
            grid-template-columns: 1fr;
            padding: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .enquiry-card-wrapper {
            padding: 1.5rem;
          }
          .enquiry-box {
            padding: 1.5rem;
          }
          .form-fields-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
