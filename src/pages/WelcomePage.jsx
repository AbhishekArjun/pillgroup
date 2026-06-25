import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function WelcomePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome, {currentUser?.email}</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>You have successfully logged in.</p>
      <button onClick={handleLogout} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#fff', color: '#333', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>Log Out</button>
    </div>
  );
}

export default WelcomePage;
