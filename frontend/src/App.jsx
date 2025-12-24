import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import NearbyPlaces from './pages/NearbyPlaces';
import TravelRoadmap from './pages/TravelRoadmap';
import LiveLocal from './pages/LiveLocal';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nearby" element={<NearbyPlaces />} />
          <Route path="/roadmap" element={<TravelRoadmap />} />
          <Route path="/live-local" element={<LiveLocal />} />
        </Routes>
      </main>
      <footer style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <p>© 2025 TravelAi - Your Personal Travel Planner</p>
      </footer>
    </div>
  );
}

export default App;
