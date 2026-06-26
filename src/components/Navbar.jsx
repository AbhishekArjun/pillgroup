import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Navigation Overlay */}
      <nav className={`nav-overlay ${menuOpen ? 'active' : ''}`}>
        <div className="nav-overlay-bg"></div>
        <div className="nav-overlay-content">
          <ul>
            <li><Link to="/" className="nav-link" onClick={toggleMenu}>Pilli Group Foundation</Link></li>
            <li><Link to="/churches" className="nav-link" onClick={toggleMenu}>Churches & Faith</Link></li>
            <li><Link to="/individuals" className="nav-link" onClick={toggleMenu}>Individual Givers</Link></li>
            <li><Link to="/admin" className="nav-link" onClick={toggleMenu}>Admin Dashboard</Link></li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <header
        className={`site-header ${scrolled ? 'scrolled' : ''}`}
        style={{
          color: menuOpen || scrolled ? 'var(--text-color)' : 'white',
          mixBlendMode: menuOpen || scrolled ? 'normal' : 'difference'
        }}
      >
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo">Pilli Group.</Link>
            <button className={`menu-toggle ${menuOpen ? 'active' : ''}`} aria-label="Toggle Menu" onClick={toggleMenu}>
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
