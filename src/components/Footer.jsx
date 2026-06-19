import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-inner" style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="footer-left fade-up">
            <h2>Partner <br /> With Us.</h2>
            
            {isSent ? (
              <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4CAF50', borderRadius: '8px' }}>
                <h3 style={{ color: '#4CAF50', marginBottom: '10px' }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Thank you for reaching out. Our partnerships team will get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" style={{ marginTop: '30px' }} onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name">Your Name / Organization</label>
                </div>
                <div className="form-group">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Your Email</label>
                </div>
                <div className="form-group">
                  <textarea id="message" rows="3" placeholder=" " required></textarea>
                  <label htmlFor="message">How can we partner?</label>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            )}

            <div className="contact-info" style={{ marginTop: '40px', fontSize: '1.1rem' }}>
              <p style={{ marginBottom: '10px' }}><strong>Email:</strong> foundation@pilligroup.com</p>
              <p style={{ marginBottom: '10px' }}><strong>Phone:</strong> +1 (800) 555-PILLI ext. 3</p>
              <p><strong>Address:</strong> Pilli Group Foundation, 100 Impact Plaza, New York, NY 10001</p>
            </div>
            
            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/individuals" className="btn btn-primary">Sponsor a Child</Link>
                <Link to="/individuals" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '4px' }}>Donate Now</Link>
                <Link to="/churches" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '4px' }}>Get Involved</Link>
            </div>
          </div>
          <div className="footer-right fade-up">
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">YouTube</a>
            </div>
            <p className="copyright" style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              *Pilli Group Foundation is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible.*<br/><br/>
              *Every child deserves a future. Start building one today.*
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
