import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Search, Menu, X, User, Shield, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenEnquiry, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('pmt_user') || 'null');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pmt_user');
    navigate('/login');
  };

  const navLinks = [
    { name: 'About Us', path: '/about', is3D: true },
    { name: 'India Holidays', path: '/destinations/india' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Where to Stay', path: '/accommodations' },
    { name: 'Travel Journal', path: '/journal' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-mark">
            <Compass className="compass-icon" size={26} />
          </div>
          <div className="brand-text">
            <span className="brand-name">PLAN MY TRIP</span>
            <span className="brand-sub">AGENCY</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span>{link.name}</span>
              {link.is3D && <span className="nav-3d-badge">3D</span>}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <button
            onClick={onOpenSearch}
            className="action-btn icon-btn"
            title="Search Destinations"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {user ? (
            <div className="user-dropdown">
              <Link to={user.role === 'ROLE_ADMIN' ? '/admin' : '/dashboard'} className="user-pill">
                {user.role === 'ROLE_ADMIN' ? <Shield size={14} /> : <User size={14} />}
                <span>{user.username}</span>
              </Link>
              <button onClick={handleLogout} className="logout-link">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Sign In
            </Link>
          )}

          <button onClick={onOpenEnquiry} className="nav-cta-btn">
            Begin a Journey
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <span>{link.name}</span>
                {link.is3D && <span className="nav-3d-badge">3D Experience</span>}
              </Link>
            ))}
            <div className="mobile-divider" />
            {user ? (
              <>
                <Link
                  to={user.role === 'ROLE_ADMIN' ? '/admin' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-link user-link"
                >
                  Dashboard ({user.username})
                </Link>
                <button onClick={handleLogout} className="mobile-logout">
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link"
              >
                Sign In / Register
              </Link>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="nav-cta-btn mobile-cta"
            >
              Begin a Journey
            </button>
          </div>
        </div>
      )}

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(24, 27, 34, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.25s ease;
          padding: 1.1rem 0;
        }
        .navbar-wrapper.scrolled {
          padding: 0.8rem 0;
          background: rgba(18, 21, 27, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          border-bottom-color: rgba(255, 255, 255, 0.15);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          color: #ffffff;
          text-decoration: none;
        }
        .brand-mark {
          color: #ffffff;
          display: flex;
          align-items: center;
          filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.25));
        }
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          line-height: 1;
          color: #ffffff;
        }
        .brand-sub {
          font-size: 0.65rem;
          letter-spacing: 0.32em;
          color: #cbd5e1;
          font-weight: 700;
          margin-top: 3px;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2.2rem;
        }
        .nav-link {
          font-size: 0.9rem;
          color: #cbd5e1;
          letter-spacing: 0.02em;
          font-weight: 500;
          position: relative;
          padding: 0.25rem 0;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: color 0.2s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: #ffffff;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffffff;
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        .nav-3d-badge {
          background: #ffffff;
          color: #000000;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 6px rgba(255, 255, 255, 0.25);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .icon-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #cbd5e1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        .icon-btn:hover {
          color: #000000;
          background-color: #ffffff;
          border-color: #ffffff;
        }
        .login-link {
          font-size: 0.88rem;
          font-weight: 600;
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .login-link:hover {
          color: #ffffff;
        }
        .user-dropdown {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .user-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          padding: 0.35rem 0.85rem;
          background-color: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-radius: 20px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.25);
          text-decoration: none;
        }
        .logout-link {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 0.8rem;
          cursor: pointer;
        }
        .logout-link:hover {
          color: #f87171;
        }
        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #000000;
          padding: 0.65rem 1.45rem;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border: 1px solid #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(255, 255, 255, 0.2);
        }
        .nav-cta-btn:hover {
          background: #e2e8f0;
          color: #000000;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(255, 255, 255, 0.3);
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
        }
        .mobile-drawer {
          display: none;
        }
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
          .nav-cta-btn {
            display: none;
          }
          .mobile-drawer {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #181b22;
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            padding: 1.5rem;
          }
          .mobile-links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .mobile-link {
            font-size: 1rem;
            color: #e2e8f0;
            font-weight: 600;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 0;
          }
          .mobile-link.active {
            color: #ffffff;
          }
          .mobile-divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            margin: 0.5rem 0;
          }
          .mobile-cta {
            display: flex;
            width: 100%;
            margin-top: 0.5rem;
            padding: 0.85rem;
            background: #ffffff;
            color: #000000;
            font-weight: 700;
          }
          .mobile-logout {
            background: none;
            border: 1px solid #f87171;
            color: #f87171;
            padding: 0.5rem;
            border-radius: 6px;
            font-size: 0.85rem;
            cursor: pointer;
          }
        }
      `}</style>
    </header>
  );
}
