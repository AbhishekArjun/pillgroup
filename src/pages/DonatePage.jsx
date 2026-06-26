import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './PageAnimations.css';

function DonatePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (currentUser) {
      // Placeholder for payment flow – redirect to a thank you or payment page
      navigate('/welcome');
    } else {
      // Prompt user to create an account – redirect to signup page
      navigate('/signup');
    }
  };

  return (
    <div className="animated-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Support a Child</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your generous donation helps provide education, healthcare, and a brighter future for children in need.
        </p>
        <button
          onClick={handleContinue}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#fff',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {currentUser ? 'Proceed to Payment' : 'Create Account to Donate'}
        </button>
      </div>
    </div>
  );
}

export default DonatePage;
