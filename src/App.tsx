import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import BrowseParkings from './pages/BrowseParkings';
import MakeReservation from './pages/MakeReservation';

type Page = 'home' | 'browse' | 'reserve';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedParking, setSelectedParking] = useState<any>(null);

  const handleSelectParking = (parking: any) => {
    setSelectedParking(parking);
    setCurrentPage('reserve');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onGetStarted={() => setCurrentPage('browse')} />;
      case 'browse':
        return <BrowseParkings onSelectParking={handleSelectParking} onBack={() => setCurrentPage('home')} />;
      case 'reserve':
        return <MakeReservation parking={selectedParking} onBack={() => setCurrentPage('browse')} onHome={() => setCurrentPage('home')} />;
      default:
        return <Home onGetStarted={() => setCurrentPage('browse')} />;
    }
  };

  return (
    <div className="guest-app">
      <header className="guest-header">
        <div className="header-content">
          <h1 className="logo" onClick={() => setCurrentPage('home')}>
            🅿️ Guest Parking Reservation
          </h1>
          <nav className="nav-links">
            <button
              className={currentPage === 'home' ? 'active' : ''}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
            <button
              className={currentPage === 'browse' ? 'active' : ''}
              onClick={() => setCurrentPage('browse')}
            >
              Browse Parkings
            </button>
          </nav>
        </div>
      </header>

      <main className="guest-main">
        {renderPage()}
      </main>

      <footer className="guest-footer">
        <p>© 2026 Parking Reservation System | No login required for guests</p>
      </footer>
    </div>
  );
}

export default App;
