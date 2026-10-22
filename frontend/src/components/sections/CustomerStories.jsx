import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export default function CustomerStories() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api.getTestimonials()
      .then(data => setTestimonials(data))
      .catch(console.error);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="stories" className="customer-stories-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="stories-header">
          <span className="section-tag">10 / GUEST VOICES</span>
          <h2 className="section-heading">
            Journeys worth <em>remembering</em>.
          </h2>
          <p className="section-subtext">
            Reflections from travellers whose private itineraries were brought to life by Plan My Trip Agency.
          </p>
        </div>

        {/* Demo Content Badge */}
        <div className="stories-demo-badge">
          <Sparkles size={14} />
          <span>Curated Demonstration Guest Experiences • Sourced from travel journals</span>
        </div>

        {current && (
          <div className="testimonial-feature-card animate-fade-in" key={current.id}>
            <div className="quote-icon-wrap">
              <Quote size={42} className="quote-mark" />
            </div>

            <p className="quote-text font-serif">
              "{current.comment}"
            </p>

            <div className="rating-stars">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} size={16} className="star-icon" fill="currentColor" />
              ))}
            </div>

            <div className="author-details-row">
              <img
                src={current.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={current.authorName}
                className="author-avatar"
              />
              <div className="author-meta">
                <span className="author-name font-serif">{current.authorName}</span>
                <span className="author-loc">{current.authorLocation}</span>
                <span className="author-trip">Itinerary: <strong>{current.tripType}</strong></span>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="carousel-nav-controls">
              <button onClick={handlePrev} className="nav-arrow" aria-label="Previous story">
                <ChevronLeft size={20} />
              </button>
              <span className="carousel-counter">
                0{currentIndex + 1} / 0{testimonials.length}
              </span>
              <button onClick={handleNext} className="nav-arrow" aria-label="Next story">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .customer-stories-section {
          background-color: var(--bg-card);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .stories-header {
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .stories-header .section-subtext {
          margin: 0 auto;
        }
        .stories-demo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--accent-gold-hover);
          font-size: 0.78rem;
          margin-bottom: 3.5rem;
        }
        .testimonial-feature-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 4.5rem;
          border-radius: 2px;
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          box-shadow: var(--shadow-sm);
        }
        .quote-icon-wrap {
          color: var(--accent-gold);
          opacity: 0.45;
          margin-bottom: 1.5rem;
        }
        .quote-text {
          font-size: clamp(1.4rem, 2.8vw, 2.1rem);
          color: var(--text-primary);
          line-height: 1.5;
          font-style: italic;
          margin-bottom: 2rem;
          font-weight: 300;
        }
        .rating-stars {
          display: flex;
          justify-content: center;
          gap: 0.35rem;
          color: var(--accent-gold);
          margin-bottom: 2.25rem;
        }
        .author-details-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-bottom: 3rem;
        }
        .author-avatar {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent-gold);
        }
        .author-meta {
          text-align: left;
          display: flex;
          flex-direction: column;
        }
        .author-name {
          font-size: 1.25rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .author-loc {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .author-trip {
          font-size: 0.78rem;
          color: var(--accent-gold);
          margin-top: 2px;
        }
        .author-trip strong {
          color: var(--text-primary);
        }
        .carousel-nav-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }
        .nav-arrow {
          background: #ffffff;
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .nav-arrow:hover {
          background: var(--text-primary);
          color: #ffffff;
          border-color: var(--text-primary);
        }
        .carousel-counter {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .testimonial-feature-card {
            padding: 2.5rem 1.5rem;
          }
          .author-details-row {
            flex-direction: column;
            text-align: center;
          }
          .author-meta {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
