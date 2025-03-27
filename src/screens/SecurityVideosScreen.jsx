import React, { useEffect, useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { SERVER_URL } from '../config';

const SecurityVideosScreen = () => {
  const [clips, setClips] = useState([]);
  const [selectedClipUri, setSelectedClipUri] = useState(null);

  useEffect(() => {
    fetch(`${SERVER_URL}/clips`)
      .then(res => res.json())
      .then(data => setClips(data))
      .catch(err => console.error('Error fetching clips:', err));
  }, []);

  if (selectedClipUri) {
    return (
      <div style={styles.videoContainer}>
        <VideoPlayer clipUri={selectedClipUri} onBack={() => setSelectedClipUri(null)} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎥 Detected Clips</h2>
      {clips.length === 0 ? (
        <p style={styles.empty}>No clips found.</p>
      ) : (
        clips.map((item, idx) => (
          <div
            key={idx}
            style={styles.card}
            onClick={() => setSelectedClipUri(`${SERVER_URL}/clips/${item.filename}`)}
          >
            <p style={styles.clipName}>{item.filename}</p>
            <p style={styles.classification}>Type: {item.classification}</p>
            <p style={styles.time}>Timestamp: {new Date(item.timestamp * 1000).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  videoContainer: {
    backgroundColor: '#000',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#121212',
    minHeight: '100vh',
    padding: '40px 20px',
    color: '#fff'
  },
  title: {
    fontSize: '24px',
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#1F1F1F',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer'
  },
  clipName: {
    fontWeight: 'bold'
  },
  classification: {
    color: '#4CAF50'
  },
  time: {
    color: '#999',
    marginTop: '4px'
  },
  empty: {
    color: '#888',
    marginTop: '20px',
    textAlign: 'center'
  }
};

export default SecurityVideosScreen;
