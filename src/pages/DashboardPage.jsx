import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function DashboardPage() {
  // Placeholder stats – replace with real Firebase Analytics when available
  const stats = {
    dau: 0,
    retention: 0,
    revenue: 0.0,
  };

  const actions = [
    { title: 'Add Analytics & Monitoring', description: 'Learn about Google Analytics and Firebase monitoring products', link: '#' },
    { title: 'Build a Backend', description: 'Explore SQL & NoSQL options for your app', link: '#' },
    { title: 'Add AI to your App', description: 'Integrate generative AI services', link: '#' },
    { title: 'Host a Web App', description: 'Deploy modern full‑stack web apps', link: '#' },
    { title: 'Learn Firebase Dev Tools', description: 'Emulator, CLI, and Studio', link: '#' },
    { title: 'Link to AdMob', description: 'Monetize your app with ads', link: '#' },
    { title: 'Link to Google Play', description: 'Publish Android app and track performance', link: '#' },
  ];

  const categories = [
    'Databases & Storage',
    'Security',
    'AI services',
    'Hosting & Serverless',
    'DevOps & Engagement',
    'Analytics',
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png" alt="Firebase" className="firebase-logo" />
        <h1>Project Overview</h1>
        <nav className="dashboard-nav">
          <Link to="/dashboard" className="nav-link active">Dashboard</Link>
          <Link to="/analytics" className="nav-link">Analytics</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="dashboard-main">
        <section className="stats-grid">
          <div className="stat-card">
            <h2>Daily Active Users</h2>
            <p className="stat-value">{stats.dau}</p>
          </div>
          <div className="stat-card">
            <h2>Day 1 Retention</h2>
            <p className="stat-value">{stats.retention}%</p>
          </div>
          <div className="stat-card">
            <h2>Revenue</h2>
            <p className="stat-value">${stats.revenue.toFixed(2)}</p>
          </div>
        </section>

        <section className="actions-grid">
          {actions.map((a, i) => (
            <div key={i} className="action-card">
              <h3>{a.title}</h3>
              <p>{a.description}</p>
              <Link to={a.link} className="action-link">Learn more →</Link>
            </div>
          ))}
        </section>

        <section className="categories-grid">
          {categories.map((c, i) => (
            <div key={i} className="category-card">{c}</div>
          ))}
        </section>

        <section className="billing-card">
          <h3>Billing plan: Spark (No‑cost $0/month)</h3>
          <p>Current project: pill</p>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
