import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../config';

function UserHomeScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const username = 'SampleUser'; // Replace with actual user context/state if needed

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        alert('Location access denied.');
        setLoading(false);
      }
    );
  }, []);

  const handleSOS = async () => {
    if (!location) {
      alert('Location not available.');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, location }),
      });

      const data = await response.json();
      if (data.success) {
        alert('🚨 SOS Sent. Security has been notified.');
      } else {
        alert('❌ Failed to send SOS');
      }
    } catch {
      alert('❌ Network Error');
    }
  };

  const goToProfile = () => navigate('/user-profile');

  return (
    <div style={styles.container}>
      <button onClick={goToProfile} style={styles.profileButton}>
        👤 Profile
      </button>
      <h2 style={styles.title}>User Home</h2>
      {loading ? (
        <p>Fetching location...</p>
      ) : (
        <>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <button style={styles.button} onClick={handleSOS}>Send SOS</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
    padding: 20,
    textAlign: 'center',
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 20,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FF5252',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
};

export default UserHomeScreen;
