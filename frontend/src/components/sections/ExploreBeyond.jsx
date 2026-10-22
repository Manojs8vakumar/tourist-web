import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';

export default function ExploreBeyond() {
  const international = [
    {
      region: 'Europe',
      tagline: 'Aristocratic Châteaux, Italian Lakes & Private Alpine Chalets',
      desc: 'From private gondolas through the mist of the Grand Canal in Venice to tasting rare Grand Cru vintages in Bordeaux cellars closed to the public.',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      linkText: 'Explore European Horizons'
    },
    {
      region: 'Africa & The Indian Ocean',
      tagline: 'Serengeti Migration, Okavango Delta & Seychelles Coral Atolls',
      desc: 'Witness the eternal circle of life on private luxury concession reserves in Tanzania and Botswana, paired with barefoot ocean villas in Zanzibar.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      linkText: 'Explore African Safaris'
    },
    {
      region: 'Southeast Asia & Japan',
      tagline: 'Angkor Wat Dawn, Kyoto Machiya Ryokans & Bali Terraces',
      desc: 'Ancient spiritual sanctuaries and exquisite Zen hospitality. Private tea ceremonies in Uji, mist-draped temples of Cambodia, and quiet island hideaways.',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      linkText: 'Explore Asian Odysseys'
    }
  ];

  return (
    <section id="beyond-india" className="explore-beyond-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="beyond-header">
          <span className="section-tag">09 / THE GLOBAL HORIZONS</span>
          <h2 className="section-heading">
            Explore <em>beyond India</em>.
          </h2>
          <p className="section-subtext">
            While our heart beats in the subcontinental soil, Plan My Trip Agency curates bespoke global passages for our distinguished patrons through exclusive international partners.
          </p>
        </div>

        {/* 3-Card Editorial Layout */}
        <div className="beyond-cards-grid">
          {international.map((item) => (
            <div key={item.region} className="beyond-card">
              <div className="beyond-media">
                <img src={item.image} alt={item.region} className="beyond-img" loading="lazy" />
                <div className="beyond-overlay" />
                <span className="beyond-badge">
                  <Globe size={13} /> Worldwide Portfolio
                </span>
                <h3 className="beyond-title font-serif">{item.region}</h3>
              </div>

              <div className="beyond-body">
                <p className="beyond-tagline font-serif">"{item.tagline}"</p>
                <p className="beyond-desc">{item.desc}</p>

                <div className="beyond-footer">
                  <Link to="/contact" className="btn-secondary beyond-btn">
                    {item.linkText}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .explore-beyond-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-light);
        }
        .beyond-header {
          margin-bottom: 3.5rem;
        }
        .beyond-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        .beyond-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .beyond-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-md);
          border-color: rgba(195, 154, 52, 0.4);
        }
        .beyond-media {
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        .beyond-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .beyond-card:hover .beyond-img {
          transform: scale(1.06);
        }
        .beyond-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20, 19, 17, 0.85) 0%, rgba(20, 19, 17, 0.1) 60%);
        }
        .beyond-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: rgba(20, 19, 17, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .beyond-title {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          font-size: 2.2rem;
          color: #ffffff;
          font-weight: 400;
        }
        .beyond-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: space-between;
        }
        .beyond-tagline {
          font-size: 1.05rem;
          font-style: italic;
          color: var(--accent-gold);
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .beyond-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .beyond-footer {
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .beyond-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.82rem;
        }
        @media (max-width: 1024px) {
          .beyond-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
