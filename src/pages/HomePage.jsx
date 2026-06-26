import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to welcome
  useEffect(() => {
    if (currentUser) {
      navigate('/welcome');
    }
  }, [currentUser, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Welcome to Pilli Group</h1>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/donate" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#fff', color: '#333', borderRadius: '4px', textDecoration: 'none', fontWeight: '600' }}>Donate / Sponsor a Child</Link>
      </div>
    </div>
  );
}

export default HomePage;
