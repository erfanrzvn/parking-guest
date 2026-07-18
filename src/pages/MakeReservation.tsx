import { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import './MakeReservation.css';

const client = generateClient<Schema>({
  authMode: 'apiKey', // Use API Key for guest access (no login required)
});

interface MakeReservationProps {
  parking: any;
  onBack: () => void;
  onHome: () => void;
}

export default function MakeReservation({ parking, onBack, onHome }: MakeReservationProps) {
  const [formData, setFormData] = useState({
    accessNo: '',
    dateTime: '',
    duration: 120,
    vehicleCode: '',
    phone: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reservationId, setReservationId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Verify access code exists
      const unitsData = await client.models.UnitInfo.list({
        filter: {
          accessNo: { eq: formData.accessNo },
          buildingCode: { eq: parking.buildingCode }
        }
      });

      if (unitsData.data.length === 0) {
        alert('❌ Invalid access code for this building. Please check with your host.');
        setSubmitting(false);
        return;
      }

      // Create reservation
      const result = await client.models.Reserving.create({
        parkingNo: parking.parkingNo,
        accessNo: formData.accessNo,
        dateTime: new Date(formData.dateTime).toISOString(),
        duration: formData.duration,
        vehicleCode: formData.vehicleCode || null,
        phone: formData.phone || null,
        email: formData.email || null,
      });

      setReservationId(result.data?.id || 'N/A');
      setSuccess(true);
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('❌ Error creating reservation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="reservation-page">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Reservation Confirmed!</h1>
          <p className="success-message">
            Your parking reservation has been successfully created.
          </p>

          <div className="reservation-details">
            <h3>Reservation Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Confirmation ID:</span>
                <span className="value">{reservationId}</span>
              </div>
              <div className="detail-item">
                <span className="label">Parking Spot:</span>
                <span className="value">{parking.parkingNo}</span>
              </div>
              <div className="detail-item">
                <span className="label">Building:</span>
                <span className="value">{parking.building?.buildingName || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Address:</span>
                <span className="value">{parking.building?.address || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date & Time:</span>
                <span className="value">
                  {new Date(formData.dateTime).toLocaleString('en-CA')}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">{formData.duration} minutes</span>
              </div>
              {formData.vehicleCode && (
                <div className="detail-item">
                  <span className="label">Vehicle:</span>
                  <span className="value">{formData.vehicleCode}</span>
                </div>
              )}
            </div>
          </div>

          <div className="success-actions">
            <button className="btn-primary" onClick={onHome}>
              🏠 Back to Home
            </button>
            <button className="btn-secondary" onClick={onBack}>
              🅿️ Browse More Parkings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="reservation-page">
      <div className="page-header">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>
        <h1>📅 Make a Reservation</h1>
      </div>

      <div className="reservation-container">
        <div className="parking-summary">
          <h3>Selected Parking</h3>
          <div className="summary-card">
            <h2>{parking.parkingNo}</h2>
            <div className="summary-details">
              <div className="detail">
                <span className="icon">🏢</span>
                <span>{parking.building?.buildingName || 'N/A'}</span>
              </div>
              <div className="detail">
                <span className="icon">📍</span>
                <span>{parking.building?.address || 'N/A'}</span>
              </div>
              <div className="detail">
                <span className="icon">🅿️</span>
                <span>{parking.parkingLots || 1} spots available</span>
              </div>
            </div>
          </div>
        </div>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <h3>Reservation Information</h3>

          <div className="form-group highlight">
            <label htmlFor="accessNo">Access Code *</label>
            <input
              id="accessNo"
              type="text"
              required
              value={formData.accessNo}
              onChange={(e) => setFormData({ ...formData, accessNo: e.target.value })}
              placeholder="ACC-BLD001-101-1234"
            />
            <small>Enter the access code provided by your host</small>
          </div>

          <div className="form-group">
            <label htmlFor="dateTime">Arrival Date & Time *</label>
            <input
              id="dateTime"
              type="datetime-local"
              required
              min={minDateTime}
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            />
            <small>When will you arrive?</small>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes) *</label>
            <select
              id="duration"
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            >
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
              <option value="240">4 hours</option>
              <option value="480">8 hours</option>
              <option value="720">12 hours</option>
              <option value="1440">24 hours</option>
            </select>
            <small>How long will you need the parking spot?</small>
          </div>

          <div className="form-group">
            <label htmlFor="vehicleCode">Vehicle License Plate</label>
            <input
              id="vehicleCode"
              type="text"
              value={formData.vehicleCode}
              onChange={(e) => setFormData({ ...formData, vehicleCode: e.target.value })}
              placeholder="ABC-1234"
            />
            <small>Optional - helps identify your vehicle</small>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1-416-555-1234"
            />
            <small>Optional - for contact purposes</small>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="guest@example.com"
            />
            <small>Optional - for confirmation</small>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? '⏳ Creating...' : '✅ Confirm Reservation'}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={onBack}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="info-box">
        <div className="info-icon">💡</div>
        <div className="info-content">
          <strong>Important Notes:</strong>
          <ul>
            <li>Access code is required and must match a valid unit in this building</li>
            <li>Make sure to arrive on time and leave before your reservation expires</li>
            <li>Save your confirmation ID for reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
