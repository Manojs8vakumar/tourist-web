import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, CheckCircle } from 'lucide-react';

export default function TravellerTypes() {
  const panels = [
    {
      type: 'First-time travellers',
      num: '01',
      headline: 'The Grand Classical Introduction',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      description: 'Navigating India’s sensory richness requires thoughtful pacing, seamless private logistics, and trusted local custodians. We remove the chaos, leaving only wonder, private palace sanctuaries, and authentic historical depth.',
      recommended: [
        { name: 'Rajasthan Heritage Trail', nights: '8 Nights', slug: 'rajasthan-heritage-trail' },
        { name: 'South India Temple Journey', nights: '7 Nights', slug: 'south-india-temple-journey' }
      ],
      filterQuery: 'First-time travellers'
    },
    {
      type: 'Couples and honeymooners',
      num: '02',
      headline: 'Candlelight on Mirrored Waters',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80',
      description: 'From private solar boats gliding past Udaipur’s City Palace at twilight to waking up to mist over Dal Lake on a hand-carved cedar houseboat. Intimate sanctuaries created for cherished shared memories.',
      recommended: [
        { name: 'Best of Kashmir', nights: '6 Nights', slug: 'best-of-kashmir' },
        { name: 'Himalayan Escape', nights: '7 Nights', slug: 'himalayan-escape' }
      ],
      filterQuery: 'Couples and honeymooners'
    },
    {
      type: 'Families with children',
      num: '03',
      headline: 'Stories That Ignite Young Imaginations',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
      description: 'Living history lessons where medieval ramparts become classrooms, village artisans demonstrate ancient block-printing, and open-top safaris reveal wild elephants and Bengal tigers in their natural habitat.',
      recommended: [
        { name: 'Kerala Backwater Retreat', nights: '6 Nights', slug: 'kerala-backwater-retreat' },
        { name: 'Golden Triangle & Royal Ranthambore', nights: '7 Nights', slug: 'golden-triangle-ranthambore' }
      ],
      filterQuery: 'Families with children'
    },
    {
      type: 'Wildlife and adventure enthusiasts',
      num: '04',
      headline: 'The Untamed Edge of the Wild',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80',
      description: 'Deep into the heart of Kipling’s jungle country and high across the scree ridges of the trans-Himalayas. Uncompromising expeditions led by naturalist scholars with private 4x4 tracks and heated luxury camps.',
      recommended: [
        { name: 'Madhya Pradesh Wildlife Expedition', nights: '5 Nights', slug: 'madhya-pradesh-wildlife-expedition' },
        { name: 'Ladakh Monastic & Pangong Odyssey', nights: '7 Nights', slug: 'ladakh-monastic-odyssey' }
      ],
      filterQuery: 'Wildlife and adventure enthusiasts'
    }
  ];

  return (
    <section id="traveller-types" className="traveller-types-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="types-header">
          <span className="section-tag">08 / BESPOKE PERSPECTIVES</span>
          <h2 className="section-heading">
            The same destination, <em>a different journey</em>.
          </h2>
          <p className="section-subtext">
            A romantic retreat looks fundamentally different from an intergenerational family voyage. We shape each itinerary to reflect your travel rhythm, private interests, and personal milestones.
          </p>
        </div>

        {/* 4 Editorial Panels */}
        <div className="panels-list">
          {panels.map((p, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={p.type}
                className={`traveller-panel ${isReversed ? 'reversed' : ''}`}
              >
                <div className="panel-media">
                  <img src={p.image} alt={p.headline} className="panel-img" loading="lazy" />
                  <span className="panel-number">{p.num}</span>
                  <span className="panel-type-badge">{p.type}</span>
                </div>

                <div className="panel-content">
                  <span className="panel-tag">CURATED ETHOS</span>
                  <h3 className="panel-headline font-serif">{p.headline}</h3>
                  <p className="panel-desc">{p.description}</p>

                  <div className="recommended-box">
                    <span className="rec-title">Curated Itineraries for {p.type}:</span>
                    <div className="rec-links">
                      {p.recommended.map((rec) => (
                        <Link key={rec.slug} to={`/packages/${rec.slug}`} className="rec-link-card">
                          <Compass size={14} className="rec-icon" />
                          <span className="rec-name">{rec.name}</span>
                          <span className="rec-nights">{rec.nights}</span>
                          <ArrowRight size={13} className="rec-arrow" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/packages?search=${encodeURIComponent(p.filterQuery.split(' ')[0])}`}
                    className="btn-secondary panel-cta"
                  >
                    Explore {p.type} Journeys
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .traveller-types-section {
          background-color: var(--bg-card);
        }
        .types-header {
          margin-bottom: 4.5rem;
        }
        .panels-list {
          display: flex;
          flex-direction: column;
          gap: 4.5rem;
        }
        .traveller-panel {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 4rem;
          align-items: center;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
        }
        .traveller-panel:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(195, 154, 52, 0.4);
        }
        .traveller-panel.reversed {
          grid-template-columns: 1fr 1.15fr;
        }
        .traveller-panel.reversed .panel-media {
          order: 2;
        }
        .traveller-panel.reversed .panel-content {
          order: 1;
        }
        .panel-media {
          position: relative;
          height: 480px;
          overflow: hidden;
        }
        .panel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .traveller-panel:hover .panel-img {
          transform: scale(1.05);
        }
        .panel-number {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: #141311;
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border: 1px solid rgba(195, 154, 52, 0.3);
        }
        .panel-type-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(20, 19, 17, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.76rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.45rem 1rem;
          font-weight: 600;
        }
        .panel-content {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
        }
        .panel-tag {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .panel-headline {
          font-size: 2.25rem;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }
        .panel-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .recommended-box {
          background: var(--bg-primary);
          border-left: 2px solid var(--accent-gold);
          padding: 1.25rem 1.5rem;
          margin-bottom: 2.5rem;
        }
        .rec-title {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .rec-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .rec-link-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 0.65rem 0.95rem;
          border-radius: 2px;
          transition: var(--transition);
        }
        .rec-link-card:hover {
          border-color: var(--accent-gold);
          transform: translateX(4px);
        }
        .rec-icon {
          color: var(--accent-gold);
        }
        .rec-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }
        .rec-nights {
          font-size: 0.76rem;
          color: var(--text-muted);
        }
        .rec-arrow {
          color: var(--accent-gold);
        }
        .panel-cta {
          align-self: flex-start;
        }
        @media (max-width: 1024px) {
          .traveller-panel,
          .traveller-panel.reversed {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .traveller-panel.reversed .panel-media {
            order: 1;
          }
          .traveller-panel.reversed .panel-content {
            order: 2;
          }
          .panel-media {
            height: 320px;
          }
          .panel-content {
            padding: 2.25rem;
          }
        }
      `}</style>
    </section>
  );
}
