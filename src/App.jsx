import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import ChurchesPage from './pages/ChurchesPage';
import IndividualGiversPage from './pages/IndividualGiversPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/churches" element={<ChurchesPage />} />
      <Route path="/individuals" element={<IndividualGiversPage />} />
    </Routes>
  );
}

export default App;
