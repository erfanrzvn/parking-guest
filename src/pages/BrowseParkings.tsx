import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import './BrowseParkings.css';

const client = generateClient<Schema>();

interface BrowseParkingsProps {
  onSelectParking: (parking: any) => void;
  onBack: () => void;
}

export default function BrowseParkings({ onSelectParking, onBack }: BrowseParkingsProps) {
  const [parkings, setParkings] = useState<any[]>([]);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load all parkings
      const parkingsData = await client.models.Parking.list();
      
      // Filter only guest parkings (name contains "guest")
      const guestParkings = parkingsData.data.filter((p: any) =>
        p.parkingName?.toLowerCase().includes('guest')
      );

      setParkings(guestParkings);

      // Get unique building codes
      const buildingCodes = [...new Set(guestParkings.map((p: any) => p.buildingCode))];
      
      // Load building details
      const buildingsData = await Promise.all(
        buildingCodes.map(async (code) => {
          const result = await client.models.Building.list({
            filter: { buildingCode: { eq: code } }
          });
          return result.data[0];
        })
      );

      setBuildings(buildingsData.filter(Boolean));
    } catch (error) {
      console.error('Error loading parkings:', error);
      alert('Error loading parkings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredParkings = selectedBuilding
    ? parkings.filter((p) => p.buildingCode === selectedBuilding)
    : parkings;

  if (loading) {
    return (
      <div className="browse-page">
        <div className="page-loading">
          <div className="spinner"></div>
          <p>Loading available parkings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="browse-page">
      <div className="page-header">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <div>
          <h1>🅿️ Available Guest Parkings</h1>
          <p className="subtitle">
            {filteredParkings.length} guest parking{filteredParkings.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {buildings.length > 1 && (
        <div className="filter-section">
          <label htmlFor="buildingFilter">Filter by Building:</label>
          <select
            id="buildingFilter"
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
          >
            <option value="">All Buildings</option>
            {buildings.map((building: any) => (
              <option key={building.id} value={building.buildingCode}>
                {building.buildingName} ({building.buildingCode})
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredParkings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🅿️</div>
          <h3>No guest parkings available</h3>
          <p>
            {selectedBuilding
              ? 'Try selecting a different building'
              : 'Guest parking spaces will appear here once they are added'}
          </p>
        </div>
      ) : (
        <div className="parkings-grid">
          {filteredParkings.map((parking: any) => {
            const building = buildings.find((b: any) => b.buildingCode === parking.buildingCode);
            
            return (
              <div key={parking.id} className="parking-card">
                <div className="parking-header">
                  <h3>{parking.parkingNo}</h3>
                  <span className="guest-badge">Guest</span>
                </div>

                {parking.parkingName && (
                  <div className="parking-name">{parking.parkingName}</div>
                )}

                <div className="parking-info">
                  <div className="info-row">
                    <span className="icon">🏢</span>
                    <div>
                      <strong>{building?.buildingName || 'N/A'}</strong>
                      <br />
                      <small>{building?.address || 'N/A'}</small>
                    </div>
                  </div>

                  <div className="info-row">
                    <span className="icon">🅿️</span>
                    <span>
                      <strong>{parking.parkingLots || 1}</strong> spot
                      {parking.parkingLots !== 1 ? 's' : ''} available
                    </span>
                  </div>

                  {parking.description && (
                    <div className="info-row">
                      <span className="icon">📝</span>
                      <span>{parking.description}</span>
                    </div>
                  )}
                </div>

                <button
                  className="btn-reserve"
                  onClick={() => onSelectParking({ ...parking, building })}
                >
                  📅 Reserve This Spot
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="info-banner">
        <div className="info-icon">💡</div>
        <div className="info-content">
          <strong>Need an Access Code?</strong>
          <p>
            Contact the resident you're visiting to get their access code. 
            You'll need this code to complete your reservation.
          </p>
        </div>
      </div>
    </div>
  );
}
