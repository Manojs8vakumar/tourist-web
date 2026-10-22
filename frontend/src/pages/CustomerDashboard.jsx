import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Compass, ShieldCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function CustomerDashboard({ onOpenEnquiry }) {
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pmt_user') || 'null');
    if (!stored) {
      navigate('/login');
      return;
    }
    setUser(stored);

    // Fetch user's enquiries
    api.getUserEnquiries(stored.email)
      .then(setEnquiries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="dashboard-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="dash-header">
          <div>
            <span className="section-tag">PRIVATE GUEST PORTAL</span>
            <h1 className="section-heading font-serif">Welcome, {user.fullName || user.username}</h1>
            <p className="section-subtext">Review your submitted travel dossiers and active bespoke proposals.</p>
          </div>
          <button onClick={() => onOpenEnquiry('New Trip')} className="btn-gold">
            Begin New Journey <ArrowRight size={15} />
          </button>
        </div>

        {/* User Card */}
        <div className="user-profile-strip">
          <div className="profile-cell">
            <span className="p-lbl">Registered Email</span>
            <strong>{user.email}</strong>
          </div>
          <div className="profile-cell">
            <span className="p-lbl">Account Status</span>
            <span className="status-badge verified">
              <ShieldCheck size={13} /> Active Private Guest
            </span>
          </div>
          <div className="profile-cell">
            <span className="p-lbl">Submitted Requests</span>
            <strong>{enquiries.length} Enquiries</strong>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="enquiries-section">
          <h2 className="font-serif sec-title">Your Bespoke Journey Dossiers</h2>

          {loading ? (
            <div className="loading-state">Loading your travel requests...</div>
          ) : enquiries.length > 0 ? (
            <div className="enquiries-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Reference No.</th>
                    <th>Destination</th>
                    <th>Travel Dates</th>
                    <th>Travellers</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Date Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td className="ref-cell font-serif">{enq.referenceNumber}</td>
                      <td><strong>{enq.destinationPreference}</strong></td>
                      <td>
                        {enq.departureDate ? `${enq.departureDate} → ${enq.returnDate || ''}` : enq.travelMonth}
                      </td>
                      <td>{enq.travellersCount || 2} Guests</td>
                      <td>{enq.budget || 'Bespoke'}</td>
                      <td>
                        <span className={`status-pill ${enq.status ? enq.status.toLowerCase() : 'new'}`}>
                          {enq.status || 'NEW'}
                        </span>
                      </td>
                      <td className="date-cell">
                        {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Recent'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-dash-box">
              <Compass size={36} className="empty-icon" />
              <h3 className="font-serif">No enquiries on record yet</h3>
              <p>When you submit a trip request or bespoke inquiry, your reference code and progress will appear here.</p>
              <button onClick={() => onOpenEnquiry('First Trip')} className="btn-primary">
                Compose Your First Itinerary
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .dashboard-page {
          padding-top: 8.5rem;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .user-profile-strip {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 1.5rem 2rem;
          display: flex;
          gap: 3rem;
          margin-bottom: 3rem;
          border-radius: 2px;
          box-shadow: var(--shadow-sm);
          flex-wrap: wrap;
        }
        .profile-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .p-lbl {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .status-badge.verified {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #059669;
          font-weight: 600;
          font-size: 0.82rem;
        }
        .sec-title {
          font-size: 1.85rem;
          margin-bottom: 1.5rem;
        }
        .enquiries-table-wrapper {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
        }
        .dash-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
          min-width: 700px;
        }
        .dash-table th,
        .dash-table td {
          padding: 1.25rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid var(--border-light);
        }
        .dash-table th {
          background: var(--bg-primary);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }
        .ref-cell {
          font-size: 1.1rem;
          color: var(--accent-gold);
          font-weight: 600;
        }
        .status-pill {
          display: inline-block;
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .status-pill.new {
          background: #eff6ff;
          color: #1d4ed8;
        }
        .status-pill.contacted {
          background: #fef3c7;
          color: #b45309;
        }
        .status-pill.confirmed {
          background: #ecfdf5;
          color: #047857;
        }
        .date-cell {
          color: var(--text-muted);
        }
        .empty-dash-box {
          background: #ffffff;
          border: 1px dashed var(--border-light);
          padding: 4rem 2rem;
          text-align: center;
        }
        .empty-icon {
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .empty-dash-box h3 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .empty-dash-box p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}
