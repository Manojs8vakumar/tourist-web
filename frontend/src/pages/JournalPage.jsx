import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function JournalPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getJournalPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="journal-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="journal-header">
          <span className="section-tag">EDITORIAL LITERATURE</span>
          <h1 className="section-heading font-serif">
            The Travel <em>Journal</em>.
          </h1>
          <p className="section-subtext">
            Reflections on subcontinental heritage, slow craftsmanship, wildlife tracking, and the lost art of the unhurried passage.
          </p>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="loading-state">Opening journal pages...</div>
        ) : (
          <div className="journal-posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="journal-card animate-fade-in">
                <div className="j-media">
                  <img src={post.heroImage} alt={post.title} className="j-img" />
                  <span className="j-cat">{post.category}</span>
                </div>

                <div className="j-body">
                  <div className="j-meta">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="j-title font-serif">{post.title}</h3>
                  <p className="j-summary">{post.summary}</p>
                  <p className="j-content-preview">{post.content}</p>

                  <div className="j-footer">
                    <span className="j-date">{post.publishDate}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .journal-page {
          padding-top: 8.5rem;
        }
        .journal-header {
          margin-bottom: 3.5rem;
        }
        .journal-posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        .journal-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .journal-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: rgba(195, 154, 52, 0.4);
        }
        .j-media {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .j-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .journal-card:hover .j-img {
          transform: scale(1.05);
        }
        .j-cat {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(20, 19, 17, 0.85);
          color: #ffffff;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
        }
        .j-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .j-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.76rem;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        .j-title {
          font-size: 1.6rem;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 1rem;
        }
        .j-summary {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }
        .j-content-preview {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .j-footer {
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        @media (max-width: 1080px) {
          .journal-posts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .journal-posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
