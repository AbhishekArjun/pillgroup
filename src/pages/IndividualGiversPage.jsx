import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialSlider from '../components/TestimonialSlider';
import { getChildrenData, updateChildStatus } from '../utils/storage';

const IndividualGiversPage = () => {
  const [childrenAwaiting, setChildrenAwaiting] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [sponsorForm, setSponsorForm] = useState({ name: '', email: '', card: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Load children needing sponsorship
    const loadChildren = async () => {
      const data = await getChildrenData();
      setChildrenAwaiting(data.filter(c => c.status === 'Awaiting Sponsor'));
    };
    loadChildren();
  }, []);

  useEffect(() => {
    // Scroll Effects
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((el) => observer.observe(el));
    return () => fadeUpElements.forEach((el) => observer.unobserve(el));
  });

  const handleSponsorClick = (child) => {
    setSelectedChild(child);
    setIsSponsorModalOpen(true);
    setSuccessMsg('');
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (selectedChild) {
      // Update global database
      await updateChildStatus(selectedChild.id, 'Sponsored');
      
      // Update local state
      setChildrenAwaiting(prev => prev.filter(c => c.id !== selectedChild.id));
      
      setSuccessMsg(`Thank you, ${sponsorForm.name}! You have successfully sponsored ${selectedChild.name}.`);
      setTimeout(() => {
        setIsSponsorModalOpen(false);
        setSelectedChild(null);
        setSponsorForm({ name: '', email: '', card: '' });
      }, 3000);
    }
  };

  const testimonials = [
    { quote: "I thought I was helping a child. Turns out, she was teaching me about resilience.", author: "Marcus, 34, Austin, TX" },
    { quote: "My kids and I sponsor a girl in India together. It's become our family's most meaningful tradition.", author: "Jennifer, 41, Toronto" },
    { quote: "Best investment I ever made.", author: "Elena, 35, London" }
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero section" style={{ minHeight: '80vh', paddingTop: '150px' }}>
          <div className="container">
            <div className="hero-content fade-up">
              <h1 className="hero-title" style={{ fontSize: '4rem' }}>One Child.<br />One Sponsor.<br />One Extraordinary Story.</h1>
              <p className="hero-subtitle">For less than the cost of a weekly coffee, you can fund a child's entire K–12 education—and change their family's future forever.</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
                <a href="#sponsor" className="btn btn-primary">Meet Children Waiting</a>
                <a href="#sponsor" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '15px 30px', borderRadius: '4px' }}>Start My Sponsorship</a>
                <a href="#transparency" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '15px 30px', borderRadius: '4px' }}>See Where My Money Goes</a>
              </div>
            </div>
          </div>
        </section>

        {/* Children Gallery (Interactive) */}
        <section id="sponsor" className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">Children Awaiting Sponsorship</h2>
              <p className="section-desc" style={{color: 'rgba(255,255,255,0.7)'}}>These children have been verified and are ready to start their journey with your help.</p>
            </div>
            
            {childrenAwaiting.length === 0 ? (
              <div className="fade-up" style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h3 style={{color: 'var(--white)'}}>Incredible! All current children have been sponsored.</h3>
                <p style={{color: 'rgba(255,255,255,0.7)'}}>Please check back later or make a general donation.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {childrenAwaiting.map((child, idx) => (
                  <div key={child.id} className="fade-up" style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '8px', transitionDelay: `${idx * 0.1}s` }}>
                    {child.imageUrl ? (
                      <div style={{ width: '100%', height: '200px', borderRadius: '8px', marginBottom: '20px', overflow: 'hidden' }}>
                        <img src={`/api${child.imageUrl}`} alt={child.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>
                        {child.name.charAt(0)}
                      </div>
                    )}
                    <h3 style={{ color: 'var(--white)', marginBottom: '10px' }}>{child.name}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}><strong>Age:</strong> {child.age}</p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '5px' }}><strong>Location:</strong> {child.location}</p>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}><strong>Needs:</strong> {child.need}</p>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleSponsorClick(child)}>
                      Sponsor {child.name} ($50/mo)
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cost Table */}
        <section className="section">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">What $50/Month Covers</h2>
            </div>
            <div className="content-table-wrapper fade-up">
              <table className="content-table">
                <thead>
                  <tr><th>Your Gift</th><th>Their Gain</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>$1.67/day</strong></td><td>Full school tuition & fees</td></tr>
                  <tr><td><strong>$50/month</strong></td><td>Books, supplies, uniform</td></tr>
                  <tr><td><strong>$600/year</strong></td><td>Meals, healthcare, mentorship</td></tr>
                  <tr><td><strong>$7,200 total (K–12)</strong></td><td>A complete education & future</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Your Sponsorship Journey & The Child You'll Meet */}
        <section className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">Your Sponsorship Journey</h2>
            </div>
            <div className="services-grid mb-4">
              <div className="service-item fade-up">
                <h3>The Child You'll Meet</h3>
                <p>Every child on our platform has been verified by local staff and is genuinely in need of educational support. Browse by:</p>
                <ul style={{ marginTop: '10px', color: 'var(--text-muted)', listStyle: 'none', padding: 0 }}>
                  <li style={{marginBottom: '5px'}}>• <strong>Country</strong> — 18 nations across 4 continents</li>
                  <li style={{marginBottom: '5px'}}>• <strong>Age</strong> — Kindergarten through Grade 12</li>
                  <li style={{marginBottom: '5px'}}>• <strong>Need Level</strong> — Orphaned, single-parent household, extreme poverty, refugee status</li>
                </ul>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.1s' }}>
                <h3>Your Personal Connection</h3>
                <ul style={{ marginTop: '10px', color: 'var(--text-muted)', listStyle: 'none', padding: 0 }}>
                  <li style={{marginBottom: '10px'}}><strong>Month 1:</strong> Welcome packet with photo, story, and first letter</li>
                  <li style={{marginBottom: '10px'}}><strong>Quarterly:</strong> Updated photo, report card, and handwritten letter</li>
                  <li style={{marginBottom: '10px'}}><strong>Annually:</strong> Video message from your child</li>
                  <li style={{marginBottom: '10px'}}><strong>Milestones:</strong> Graduation certificate, next-step plans, opportunity to continue supporting university</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials section">
          <div className="container">
            <div className="section-header fade-up text-center mb-4">
              <h2 className="section-title">Real Sponsors, Real Stories</h2>
            </div>
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>

        {/* Full Transparency */}
        <section id="transparency" className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up text-center">
              <h2 className="section-title">Full Transparency</h2>
            </div>
            <div className="fade-up" style={{color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem'}}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{marginBottom: '20px'}}>✅ 100% of your $50 goes to your child's education</li>
                <li style={{marginBottom: '20px'}}>✅ Zero administrative fees charged to sponsorships</li>
                <li style={{marginBottom: '20px'}}>✅ Cancel anytime—no guilt, no penalties</li>
                <li style={{marginBottom: '20px'}}>✅ Independent audits published annually</li>
                <li style={{marginBottom: '20px'}}>✅ Tax-deductible in the India, US, UK, Canada, and Australia</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="section">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">Other Ways to Give</h2>
            </div>
            <div className="content-table-wrapper fade-up">
              <table className="content-table">
                <thead>
                  <tr><th>Option</th><th>Perfect For</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>One-Time Gift</strong></td><td>$25 buys a year's school supplies</td></tr>
                  <tr><td><strong>Birthday Campaign</strong></td><td>Ask friends to sponsor instead of gifts</td></tr>
                  <tr><td><strong>Legacy Giving</strong></td><td>Include education in your will</td></tr>
                  <tr><td><strong>Group Sponsorship</strong></td><td>Split costs with friends or coworkers</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Sponsorship Checkout Modal */}
      <div className={`modal-overlay ${isSponsorModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          {successMsg ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '4rem', color: 'var(--accent-color)', marginBottom: '20px' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginBottom: '10px' }}>Sponsorship Confirmed!</h2>
              <p style={{ color: 'var(--text-muted)' }}>{successMsg}</p>
            </div>
          ) : (
            <>
              <div className="modal-header">
                <h2 style={{color: 'var(--text-main)'}}>Sponsor {selectedChild?.name}</h2>
                <button className="close-btn" onClick={() => setIsSponsorModalOpen(false)}>&times;</button>
              </div>
              <p style={{marginBottom: '20px', color: 'var(--text-muted)'}}>You are committing to $50/month to cover {selectedChild?.need}.</p>
              
              <form className="admin-form" onSubmit={handleCheckoutSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required value={sponsorForm.name} onChange={e => setSponsorForm({...sponsorForm, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" required value={sponsorForm.email} onChange={e => setSponsorForm({...sponsorForm, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Card Number (Mock)</label>
                  <input type="text" placeholder="**** **** **** ****" required value={sponsorForm.card} onChange={e => setSponsorForm({...sponsorForm, card: e.target.value})} />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsSponsorModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Complete Sponsorship</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

    </>
  );
};

export default IndividualGiversPage;
