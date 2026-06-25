import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import ChurchesPage from './pages/ChurchesPage';
import IndividualGiversPage from './pages/IndividualGiversPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/churches" element={<ChurchesPage />} />
        <Route path="/individuals" element={<IndividualGiversPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
