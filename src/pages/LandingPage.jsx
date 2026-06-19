import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialSlider from '../components/TestimonialSlider';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let simProgress = 0;
    const interval = setInterval(() => {
      simProgress += Math.random() * 20;
      if (simProgress >= 100) {
        simProgress = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
      setProgress(simProgress);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      if (follower) {
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
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
  }); // Run on every render to catch new elements

  const testimonials = [
    {
      quote: "Before Pilli Foundation, I walked 3 hours to school. Now I have a bicycle, books, and a sponsor who believes in me. I want to become a doctor.",
      author: "Amina, 14, Kenya - Sponsored since Grade 3"
    },
    {
      quote: "My daughter is the first in our family to finish high school. Pilli Foundation didn't just educate her—they changed our entire family's future.",
      author: "Mrs. Santos, Philippines - Parent of sponsored child"
    },
    {
      quote: "I sponsored Daniel in Grade 2. Eight years later, he graduated top of his class and earned a university scholarship. The return on this investment is immeasurable.",
      author: "Rebecca M., Sponsor since 2018"
    }
  ];

  return (
    <>
      <div className={`preloader ${!loading ? 'hidden' : ''}`}>
        <div className="preloader-content">
          <span className="preloader-text">Pilli Group.</span>
          <div className="preloader-progress">
            <span className="preloader-bar" style={{ width: `${progress}%` }}></span>
          </div>
        </div>
      </div>

      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="hero section">
          <div className="container">
            <div className="hero-content fade-up">
              <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>Changing Lives, <br /> One Child at a Time.</h1>
              <p className="hero-subtitle">Through education sponsorships and community-driven programs, we build pathways out of poverty and into possibility.</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                <Link to="/individuals" className="btn btn-primary">Sponsor a Child Today</Link>
                <a href="#impact" className="btn btn-secondary" style={{ border: '1px solid var(--border-color)', padding: '15px 30px', borderRadius: '4px' }}>Learn Our Impact</a>
              </div>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section id="about" className="about section">
          <div className="container">
            <div className="about-inner">
              <div className="about-content fade-up">
                <h2 className="section-title">About Us</h2>
                <p className="about-desc">Pilli Group Foundation is the philanthropic arm of Pilli Group, dedicated to creating lasting social impact through education, community development, and sustainable empowerment programs. We believe every child deserves access to quality education regardless of their circumstances.</p>
                
                <h3 style={{fontFamily: 'var(--font-heading)', marginTop: '30px', marginBottom: '15px'}}>Our Focus Areas:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{marginBottom: '10px'}}><strong>Education Sponsorship (K–12)</strong> — Full academic support for children from underserved communities</li>
                  <li style={{marginBottom: '10px'}}><strong>Community Development</strong> — Infrastructure, resources, and training for sustainable local growth</li>
                  <li style={{marginBottom: '10px'}}><strong>Youth Empowerment</strong> — Skills building, mentorship, and leadership programs</li>
                  <li style={{marginBottom: '10px'}}><strong>Sustainable Change</strong> — Long-term solutions that outlast short-term aid</li>
                </ul>
              </div>
              <div className="about-image fade-up" style={{ transitionDelay: '0.2s' }}>
                <img src="/images/about_studio_1781867379350.png" alt="Children Learning" />
              </div>
            </div>
          </div>
        </section>

        {/* Flagship Program */}
        <section id="program" className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">Our Flagship Program: <br/>Sponsor a Child (K–12)</h2>
              <p className="section-desc" style={{color: 'rgba(255,255,255,0.7)'}}>Every sponsored child receives comprehensive support throughout their educational journey.</p>
            </div>

            <div className="content-table-wrapper fade-up">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Benefit</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>School Tuition & Fees</strong></td>
                    <td>Full coverage of academic costs</td>
                  </tr>
                  <tr>
                    <td><strong>Books & Supplies</strong></td>
                    <td>Annual provision of textbooks, notebooks, and learning materials</td>
                  </tr>
                  <tr>
                    <td><strong>Uniforms & Clothing</strong></td>
                    <td>School uniforms and seasonal clothing</td>
                  </tr>
                  <tr>
                    <td><strong>Nutrition Program</strong></td>
                    <td>Daily meals or meal stipends to support learning</td>
                  </tr>
                  <tr>
                    <td><strong>Healthcare Access</strong></td>
                    <td>Basic medical check-ups and emergency care</td>
                  </tr>
                  <tr>
                    <td><strong>Transportation</strong></td>
                    <td>Safe travel to and from school where needed</td>
                  </tr>
                  <tr>
                    <td><strong>Digital Access</strong></td>
                    <td>Tablets/laptops and internet connectivity for modern learning</td>
                  </tr>
                  <tr>
                    <td><strong>Mentorship</strong></td>
                    <td>One-on-one guidance from trained mentors</td>
                  </tr>
                  <tr>
                    <td><strong>Parental Support</strong></td>
                    <td>Workshops and resources for families</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How it Works & Impact */}
        <section id="impact" className="work section">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">How Sponsorship Works</h2>
            </div>
            
            <div className="services-grid mb-4">
              <div className="service-item fade-up">
                <span className="service-number">Step 1</span>
                <h3>Choose a Child</h3>
                <p>Browse profiles of children awaiting sponsorship by region, age, or need.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.1s' }}>
                <span className="service-number">Step 2</span>
                <h3>Commit to Their Future</h3>
                <p>Sponsor for $50/month or $600/year. 100% goes directly to their education.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.2s' }}>
                <span className="service-number">Step 3</span>
                <h3>Watch Them Grow</h3>
                <p>Receive quarterly updates, photos, report cards, and letters.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.3s' }}>
                <span className="service-number">Step 4</span>
                <h3>Celebrate Milestones</h3>
                <p>Mark graduations, achievements, and breakthroughs together.</p>
              </div>
            </div>

            <div className="section-header fade-up mt-4">
              <h2 className="section-title">Impact Statistics</h2>
            </div>
            
            <div className="content-table-wrapper fade-up">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Figure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Children Sponsored</strong></td><td>12,500+</td></tr>
                  <tr><td><strong>Countries Active</strong></td><td>18</td></tr>
                  <tr><td><strong>K–12 Graduates</strong></td><td>4,200+</td></tr>
                  <tr><td><strong>Scholarship Recipients</strong></td><td>850+ (higher education)</td></tr>
                  <tr><td><strong>Schools Partnered</strong></td><td>340+</td></tr>
                  <tr><td><strong>Community Projects Completed</strong></td><td>156</td></tr>
                  <tr><td><strong>Volunteer Hours Contributed</strong></td><td>250,000+</td></tr>
                  <tr><td><strong>Funds Raised (Lifetime)</strong></td><td>$45 Million+</td></tr>
                  <tr><td><strong>Sponsor Retention Rate</strong></td><td>89%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where We Work */}
        <section className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up text-center">
              <h2 className="section-title">Where We Work</h2>
            </div>
            <div className="fade-up text-center" style={{color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', lineHeight: '2'}}>
              <p><strong>Asia:</strong> India</p>
              <p><em>Soon to sponsor: Philippines, Nepal, Bangladesh, Cambodia</em></p>
              <p className="mt-2"><strong>Africa:</strong> Kenya, Nigeria, Ghana, Uganda, Tanzania</p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="testimonials section">
          <div className="container">
            <div className="section-header fade-up text-center mb-4">
              <h2 className="section-title">Success Stories</h2>
            </div>
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>

        {/* Programs Beyond Sponsorship */}
        <section className="section">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">Programs Beyond Sponsorship</h2>
            </div>
            <div className="services-grid mb-4">
              <div className="service-item fade-up">
                <h3>Community Learning Centers</h3>
                <p>Building and staffing libraries and digital labs in rural areas.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.1s' }}>
                <h3>Teacher Training Initiative</h3>
                <p>Upskilling 2,000+ educators annually in modern teaching methods.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.2s' }}>
                <h3>Girls' Education Fund</h3>
                <p>Targeted scholarships and safe-learning environments to keep girls in school.</p>
              </div>
              <div className="service-item fade-up" style={{ transitionDelay: '0.3s' }}>
                <h3>Emergency Education Response</h3>
                <p>Rapid deployment of learning resources during crises and displacement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="section bg-dark">
          <div className="container">
            <div className="section-header fade-up text-center">
              <h2 className="section-title">Transparency & Accountability</h2>
            </div>
            <div className="fade-up" style={{color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem'}}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{marginBottom: '20px'}}><strong>100% Model:</strong> All sponsorship funds go directly to children's education. Operational costs are covered by Pilli Group corporate allocation.</li>
                <li style={{marginBottom: '20px'}}><strong>Annual Audits:</strong> Independent financial reviews published publicly.</li>
                <li style={{marginBottom: '20px'}}><strong>Real-Time Tracking:</strong> Donors can see exactly how funds are used through our online portal.</li>
                <li style={{marginBottom: '20px'}}><strong>UN SDG Alignment:</strong> Our work directly supports Sustainable Development Goal 4 (Quality Education).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How You Can Help */}
        <section className="section">
          <div className="container">
            <div className="section-header fade-up">
              <h2 className="section-title">How You Can Help</h2>
            </div>
            <div className="content-table-wrapper fade-up">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td><strong>Sponsor a Child</strong></td><td>$50/month transforms one child's entire K–12 journey</td></tr>
                  <tr><td><strong>One-Time Donation</strong></td><td>Any amount supports books, meals, or supplies</td></tr>
                  <tr><td><strong>Corporate Partnership</strong></td><td>Engage your company in CSR-aligned giving</td></tr>
                  <tr><td><strong>Volunteer</strong></td><td>Mentor, teach, or serve on the ground</td></tr>
                  <tr><td><strong>Legacy Giving</strong></td><td>Include education equity in your estate planning</td></tr>
                  <tr><td><strong>Fundraise</strong></td><td>Start a campaign for birthdays, marathons, or events</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default LandingPage;
