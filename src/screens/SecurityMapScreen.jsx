import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../config';

export default function SecurityMapScreen() {
  const [sosAlerts, setSosAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SERVER_URL}/sos-alerts`)
      .then(res => res.json())
      .then(data => {
        setSosAlerts(data.alerts || []);
        setLoading(false);
      })
      .catch(() => {
        alert('❌ Failed to fetch SOS alerts.');
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚨 SOS Alert Map</h2>

      {loading ? (
        <p style={styles.loading}>Loading map...</p>
      ) : (
        <div style={styles.mapBox}>
          <p style={styles.placeholder}>🗺️ Map Placeholder - Integrate Mapbox or Google Maps here</p>
          {sosAlerts.map((alert, idx) => (
            <div key={idx} style={styles.alertCard}>
              <strong>{alert.username}</strong><br />
              {`Lat: ${alert.location?.latitude}, Lng: ${alert.location?.longitude}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem',
    backgroundColor: '#121212',
    color: '#fff',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '1.8rem',
    color: '#4CAF50',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    color: '#ccc',
  },
  mapBox: {
    backgroundColor: '#1e1e1e',
    padding: '1rem',
    borderRadius: '8px',
  },
  placeholder: {
    backgroundColor: '#2a2a2a',
    padding: '1rem',
    textAlign: 'center',
    borderRadius: '6px',
    marginBottom: '1rem',
    color: '#bbb',
  },
  alertCard: {
    padding: '0.5rem',
    borderBottom: '1px solid #444',
  },
};
