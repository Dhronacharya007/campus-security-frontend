import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Backend API base URL
const SERVER_URL = 'https://b7cb-182-156-223-147.ngrok-free.app/sos-alerts';

// Fix Leaflet icon issue with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function SecurityMapScreen() {
  const [sosAlerts, setSosAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SERVER_URL}/sos-alerts`, { mode: 'cors' })
      .then(async (res) => {
        // If the response is not OK, read text for error details
        if (!res.ok) {
          const textErr = await res.text();
          throw new Error(`Server error: ${res.status} - ${textErr}`);
        }
        return res.json();
      })
      .then(data => {
        setSosAlerts(data.alerts || []);
        setLoading(false);
      })
      .catch(err => {
        alert('❌ Failed to fetch SOS alerts. Check console for more info.');
        console.error("❌ Could not fetch or parse /sos-alerts:", err);
        setLoading(false);
      });
  }, []);

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
      height: '70vh',
      width: '100%',
      borderRadius: '10px',
      overflow: 'hidden',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚨 SOS Alert Map</h2>

      {loading ? (
        <p style={styles.loading}>Loading map...</p>
      ) : (
        <div style={styles.mapBox}>
          <MapContainer
            center={[11.0692, 77.0042]} // Default center
            zoom={14}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {sosAlerts.map((alert, idx) => (
              <Marker
                key={idx}
                position={[
                  alert.location.latitude,
                  alert.location.longitude,
                ]}
              >
                <Popup>
                  🚨 <strong>{alert.username}</strong>
                  <br />
                  🕓 {new Date(alert.timestamp * 1000).toLocaleString()}
                  <br />
                  📍 {alert.location.latitude.toFixed(4)},{' '}
                  {alert.location.longitude.toFixed(4)}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
