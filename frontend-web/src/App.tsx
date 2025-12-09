import React from 'react';
import EventsPage from './pages/events';
import ArtistsPage from './pages/artists';
import MarketPage from './pages/market';
import AdminPage from './pages/admin';

const App: React.FC = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h1>Nevora Ecosystem — Norah 12.0</h1>
      <p>Interface para produtores, artistas e prefeituras.</p>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <EventsPage />
        <ArtistsPage />
        <MarketPage />
        <AdminPage />
      </section>
    </div>
  );
};

export default App;
