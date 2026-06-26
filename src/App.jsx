import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import ChurchesPage from './pages/ChurchesPage';
import IndividualGiversPage from './pages/IndividualGiversPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import DonatePage from './pages/DonatePage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/churches" element={<ChurchesPage />} />
        <Route path="/individuals" element={<IndividualGiversPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
