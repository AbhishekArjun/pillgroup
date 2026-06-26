import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialSlider from '../components/TestimonialSlider';
import { Link } from 'react-router-dom';

const ChurchesPage = () => {
  useEffect(() => {
    // Scroll Effects & Intersection Observer
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

  const testimonials = [
    {
      quote: "Our youth group sponsors 12 children in India. The letters we receive have transformed how our teenagers understand gratitude and global responsibility.",
      author: "Pastor David R., Community Baptist Church"
    },
    {
      quote: "We've seen members who never gave beyond the tithe become passionate monthly sponsors. It's deepened our entire congregation's faith.",
      author: "Reverend Sarah T., Grace Fellowship"
    }
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero section" style={{ minHeight: '80vh', paddingTop: '150px' }}>
          <div className="container">
            <div className="hero-content fade-up">
              <h1 className="hero-title" style={{ fontSize: '4rem' }}>Sow Seeds of Faith.<br />Reap Harvests of Hope.</h1>
              <p className="hero-subtitle">Answer the call to care for the least of these through child sponsorship that transforms lives from kindergarten through graduation.</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
                <Link to="/individuals" className="btn btn-primary">Sponsor a Child in Prayer</Link>
                <a href="#campaign" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '15px 30px', borderRadius: '4px' }}>Start a Church Campaign</a>
                <a href="#contact" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '15px 30px', borderRadius: '4px' }}>Request Free Ministry Kit</a>
              </div>
            </div>
          </div>
        </section>

        {/* Called to Serve */}
        <section className="about section bg-dark">
          <div className="container">
            <div className="about-inner">
              <div className="about-content fade-up">
                <h2 className="section-title">Called to Serve</h2>
                <blockquote style={{ fontStyle: 'italic', fontSize: '1.2rem', margin: '20px 0', borderLeft: '4px solid var(--accent-color)', paddingLeft: '20px' }}>
                  "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress." — James 1:27
                </blockquote>
                <p className="about-desc">Pilli Group Foundation partners with churches, ministries, and faith communities to fulfill the biblical mandate of caring for children in need. We handle the logistics—you provide the love and prayer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Church Partnership Program */}
        <section className="section">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">Church Partnership Program</h2>
            </div>
            
            <div className="content-table-wrapper fade-up">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Opportunity</th>
                    <th>How It Works</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Congregation Sponsorship</strong></td><td>Your church sponsors 5–50 children as a community</td></tr>
                  <tr><td><strong>Mission Trip Integration</strong></td><td>Visit your sponsored children in the field</td></tr>
                  <tr><td><strong>Youth Group Engagement</strong></td><td>Teens write letters, pray, and learn global stewardship</td></tr>
                  <tr><td><strong>Prayer Warrior Network</strong></td><td>Commit to praying for specific children and schools</td></tr>
                  <tr><td><strong>Tithe-Directed Giving</strong></td><td>Designate a portion of offerings to education missions</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What Your Church Receives */}
        <section className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up text-center">
              <h2 className="section-title">What Your Church Receives</h2>
            </div>
            <div className="services-grid mb-4" style={{marginTop: '40px'}}>
              <div className="service-item fade-up">
                <h3>Prayer Cards</h3>
                <p>Photos and bios of sponsored children for your prayer wall.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.1s' }}>
                <h3>Mission Updates</h3>
                <p>Quarterly video messages directly from the field.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.2s' }}>
                <h3>Sermon Resources</h3>
                <p>Free graphics, stories, and talking points for stewardship Sundays.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.3s' }}>
                <h3>Tax Documentation</h3>
                <p>Full, transparent receipts for charitable giving records.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Faith in Action (Testimonials) */}
        <section className="testimonials section">
          <div className="container">
            <div className="section-header fade-up text-center mb-4">
              <h2 className="section-title">Faith in Action</h2>
            </div>
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>

        {/* Start a Campaign */}
        <section id="campaign" className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">Start a Campaign</h2>
            </div>
            <div className="fade-up" style={{color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem'}}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{marginBottom: '20px'}}><strong>40 Days of Compassion:</strong> Lenten sponsorship challenge</li>
                <li style={{marginBottom: '20px'}}><strong>Christmas Child Drive:</strong> Sponsor a child as an alternative gift</li>
                <li style={{marginBottom: '20px'}}><strong>Vacation Bible School Mission:</strong> Kids helping kids globally</li>
              </ul>
            </div>
            <div className="fade-up" style={{ marginTop: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn btn-primary">Order Free Ministry Kit</a>
                <a href="#contact" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '15px 30px', borderRadius: '4px' }}>Schedule a Call with Faith Relations</a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default ChurchesPage;
