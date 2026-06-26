import React from 'react';
import { Link } from 'react-router-dom';

function DonatePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Donate / Sponsor a Child</h1>
      <p style={{ maxWidth: '600px', textAlign: 'center', marginBottom: '2rem' }}>
        Your generous contribution helps provide education, meals, healthcare, and a brighter future for children in need.
      </p>
      {/* Placeholder donation form */}
      <form style={{ backgroundColor: 'white', color: '#333', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem' }}>Donation Amount (USD)</label>
          <input type="number" id="amount" placeholder="50" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Your Name</label>
          <input type="text" id="name" placeholder="John Doe" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
          <input type="email" id="email" placeholder="you@example.com" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Donate Now</button>
      </form>
      <Link to="/" style={{ marginTop: '2rem', color: '#fff', textDecoration: 'underline' }}>Back to Home</Link>
    </div>
  );
}

export default DonatePage;
