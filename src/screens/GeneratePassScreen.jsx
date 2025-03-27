import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';

export default function GeneratePassScreen() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    in_time: '',
    out_time: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePass = async () => {
    if (!form.name || !form.phone || !form.in_time || !form.out_time) {
      return alert('Please fill all fields.');
    }

    try {
      const res = await axios.post(`${SERVER_URL}/generate-pass`, form);
      alert('✅ Visitor pass generated!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to generate pass');
    }
  };

  const styles = {
    container: {
      backgroundColor: '#121212',
      color: '#eee',
      padding: 20,
      maxWidth: 500,
      margin: '40px auto',
      borderRadius: 8,
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#4CAF50',
      marginBottom: 20,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      marginTop: 10,
    },
    input: {
      width: '100%',
      padding: 10,
      marginTop: 5,
      marginBottom: 15,
      borderRadius: 5,
      border: '1px solid #4CAF50',
    },
    button: {
      marginTop: 20,
      width: '100%',
      backgroundColor: '#4CAF50',
      color: '#fff',
      padding: 12,
      border: 'none',
      borderRadius: 6,
      fontSize: 16,
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Generate Visitor Pass</h2>

      <label style={styles.label}>Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter visitor name"
        style={styles.input}
      />

      <label style={styles.label}>Phone</label>
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Enter phone number"
        style={styles.input}
      />

      <label style={styles.label}>In-Time (YYYY-MM-DD HH:MM)</label>
      <input
        name="in_time"
        value={form.in_time}
        onChange={handleChange}
        placeholder="2025-03-26 14:30"
        style={styles.input}
      />

      <label style={styles.label}>Out-Time (YYYY-MM-DD HH:MM)</label>
      <input
        name="out_time"
        value={form.out_time}
        onChange={handleChange}
        placeholder="2025-03-26 16:00"
        style={styles.input}
      />

      <button onClick={generatePass} style={styles.button}>
        Generate Pass
      </button>
    </div>
  );
}
