import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProfileScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Unknown User';

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👤 User Profile</h2>
      <p style={styles.username}>Username: {username}</p>
      <button style={styles.button} onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#fff',
    minHeight: '100vh',
    padding: 20,
    textAlign: 'center',
  },
  heading: {
    color: '#4CAF50',
    fontSize: 24,
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    padding: 10,
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
};
