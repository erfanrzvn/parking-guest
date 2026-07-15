import './Home.css';

interface HomeProps {
  onGetStarted: () => void;
}

export default function Home({ onGetStarted }: HomeProps) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-icon">🅿️</div>
        <h1>Guest Parking Reservation</h1>
        <p className="hero-subtitle">
          Book your guest parking spot quickly and easily - No login required!
        </p>
        <button className="btn-primary" onClick={onGetStarted}>
          🚀 Get Started
        </button>
      </div>

      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>1. Browse Parkings</h3>
            <p>
              View available guest parking spaces across different buildings
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔑</div>
            <h3>2. Enter Access Code</h3>
            <p>
              Use the access code provided by your host to make a reservation
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>3. Select Date & Time</h3>
            <p>
              Choose when you'll arrive and how long you'll stay
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>4. Confirm Booking</h3>
            <p>
              Submit your reservation and receive confirmation
            </p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Important Information</h2>
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-icon">📝</div>
            <div className="info-card-content">
              <h3>Access Code Required</h3>
              <p>
                You need an access code from a resident to make a reservation. 
                Contact your host to get this code.
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-icon">⏰</div>
            <div className="info-card-content">
              <h3>Reservation Duration</h3>
              <p>
                Specify how long you need the parking spot. Make sure to leave 
                before your reservation expires.
              </p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-icon">🚫</div>
            <div className="info-card-content">
              <h3>No Account Needed</h3>
              <p>
                This is a guest service - no registration or login required. 
                Just browse, reserve, and park!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Reserve?</h2>
        <p>Browse available guest parking spaces now</p>
        <button className="btn-large" onClick={onGetStarted}>
          🅿️ Browse Parkings
        </button>
      </div>
    </div>
  );
}
