import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Compass, Mail, DollarSign, CheckCircle, Clock, Trash2, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState('enquiries');
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('pmt_user') || 'null');
    if (!user || user.role !== 'ROLE_ADMIN') {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, enqs, subs] = await Promise.all([
        api.getAdminStats(),
        api.getAllEnquiriesAdmin(),
        api.getSubscribersAdmin()
      ]);
      setStats(s);
      setEnquiries(enqs);
      setSubscribers(subs);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateEnquiryStatus(id, newStatus);
      setActionMsg(`Enquiry status updated to ${newStatus}`);
      setTimeout(() => setActionMsg(null), 3000);
      loadData();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="admin-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <span className="section-tag">CURATOR HEADQUARTERS</span>
            <h1 className="section-heading font-serif">Executive Travel Desk</h1>
            <p className="section-subtext">Manage live guest enquiries, subcontinental departures, and private dispatch subscribers.</p>
          </div>
          <button onClick={loadData} className="btn-secondary refresh-btn">
            <RefreshCw size={14} /> Refresh Data
          </button>
        </div>

        {actionMsg && (
          <div className="admin-toast animate-fade-in">
            <CheckCircle size={16} /> {actionMsg}
          </div>
        )}

        {/* Stats Cards Row */}
        {stats && (
          <div className="stats-cards-grid">
            <div className="admin-stat-card">
              <span className="s-icon-wrap"><Compass size={20} /></span>
              <div className="s-text">
                <span className="s-num font-serif">{stats.totalPackages}</span>
                <span className="s-lbl">Active Curated Packages</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <span className="s-icon-wrap"><Shield size={20} /></span>
              <div className="s-text">
                <span className="s-num font-serif">{stats.totalDestinations}</span>
                <span className="s-lbl">Indian Provinces / Regions</span>
              </div>
            </div>

            <div className="admin-stat-card gold">
              <span className="s-icon-wrap"><Users size={20} /></span>
              <div className="s-text">
                <span className="s-num font-serif">{stats.totalEnquiries}</span>
                <span className="s-lbl">Guest Enquiries Received</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <span className="s-icon-wrap"><Mail size={20} /></span>
              <div className="s-text">
                <span className="s-num font-serif">{stats.totalSubscribers}</span>
                <span className="s-lbl">Dispatch Subscribers</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`admin-tab ${activeTab === 'enquiries' ? 'active' : ''}`}
          >
            Guest Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`admin-tab ${activeTab === 'subscribers' ? 'active' : ''}`}
          >
            Newsletter Subscribers ({subscribers.length})
          </button>
        </div>

        {/* Tab 1: Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ref No.</th>
                  <th>Guest Name</th>
                  <th>Contact Info</th>
                  <th>Destination</th>
                  <th>Dates / Month</th>
                  <th>Budget</th>
                  <th>Current Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td className="ref-col font-serif">{enq.referenceNumber}</td>
                    <td>
                      <strong>{enq.fullName}</strong>
                      <span className="sub-travellers">{enq.travellersCount || 2} Pax</span>
                    </td>
                    <td>
                      <div className="contact-col">
                        <span>{enq.email}</span>
                        <span className="phone">{enq.phone}</span>
                      </div>
                    </td>
                    <td><strong>{enq.destinationPreference}</strong></td>
                    <td>
                      {enq.departureDate ? `${enq.departureDate} → ${enq.returnDate || ''}` : enq.travelMonth}
                    </td>
                    <td>{enq.budget || 'Bespoke'}</td>
                    <td>
                      <span className={`status-pill ${enq.status ? enq.status.toLowerCase() : 'new'}`}>
                        {enq.status || 'NEW'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleStatusChange(enq.id, 'CONTACTED')}
                          className="act-btn"
                          title="Mark Contacted"
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleStatusChange(enq.id, 'CONFIRMED')}
                          className="act-btn confirm"
                          title="Mark Confirmed"
                        >
                          Confirm
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Guest Name</th>
                  <th>Email Address</th>
                  <th>Date Subscribed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td>#{sub.id}</td>
                    <td><strong>{sub.name || 'Valued Guest'}</strong></td>
                    <td>{sub.email}</td>
                    <td>{sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : 'Recent'}</td>
                    <td><span className="status-pill confirmed">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .admin-page {
          padding-top: 8.5rem;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
        }
        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .admin-toast {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
          padding: 0.85rem 1.25rem;
          border-radius: 2px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.88rem;
        }
        .stats-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }
        .admin-stat-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 1.75rem;
          border-radius: 2px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }
        .admin-stat-card.gold {
          border-color: var(--accent-gold);
          background: #fdfcf9;
        }
        .s-icon-wrap {
          color: var(--accent-gold);
          background: var(--bg-primary);
          padding: 0.75rem;
          border-radius: 50%;
          display: flex;
        }
        .s-num {
          font-size: 2.2rem;
          color: var(--text-primary);
          line-height: 1;
          display: block;
        }
        .s-lbl {
          font-size: 0.74rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .admin-tabs {
          display: flex;
          gap: 1rem;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 2rem;
        }
        .admin-tab {
          background: none;
          border: none;
          padding: 0.85rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-secondary);
          position: relative;
          transition: var(--transition);
        }
        .admin-tab.active {
          color: var(--accent-gold);
        }
        .admin-tab.active::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-gold);
        }
        .admin-table-container {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
          min-width: 900px;
        }
        .admin-table th,
        .admin-table td {
          padding: 1.2rem 1.4rem;
          text-align: left;
          border-bottom: 1px solid var(--border-light);
        }
        .admin-table th {
          background: var(--bg-primary);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }
        .ref-col {
          color: var(--accent-gold);
          font-size: 1.05rem;
          font-weight: 600;
        }
        .sub-travellers {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .contact-col {
          display: flex;
          flex-direction: column;
        }
        .contact-col .phone {
          font-size: 0.78rem;
          color: var(--text-muted);
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
        .action-buttons {
          display: flex;
          gap: 0.4rem;
        }
        .act-btn {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.35rem 0.65rem;
          font-size: 0.72rem;
          cursor: pointer;
          border-radius: 2px;
          transition: var(--transition);
        }
        .act-btn:hover {
          border-color: var(--accent-gold);
        }
        .act-btn.confirm {
          background: #ecfdf5;
          color: #047857;
          border-color: #a7f3d0;
        }
        @media (max-width: 1024px) {
          .stats-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
