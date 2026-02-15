import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'RESIDENT',
    style: '',
    yearsOfExperience: '',
    specialization: '',
    hourlyRate: '',
    email: '',
    contactNumber: ''
  });

  useEffect(() => {
    loadArtists();
  }, [filter]);

  const loadArtists = async () => {
    try {
      let response;
      switch (filter) {
        case 'RESIDENT':
          response = await api.getResidents();
          break;
        case 'GUEST':
          response = await api.getGuests();
          break;
        default:
          response = await api.getArtists();
      }
      setArtists(response.data);
    } catch (error) {
      console.error('Error loading artists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addArtist(form);
      setForm({
        name: '',
        category: 'RESIDENT',
        style: '',
        yearsOfExperience: '',
        specialization: '',
        hourlyRate: '',
        email: '',
        contactNumber: ''
      });
      setShowForm(false);
      loadArtists();
    } catch (error) {
      console.error('Error adding artist:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Artists Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add Artist'}
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter:</label>
        {['ALL', 'RESIDENT', 'GUEST'].map(option => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            style={{
              padding: '8px 15px',
              margin: '0 5px',
              background: filter === option ? '#3498db' : '#ecf0f1',
              color: filter === option ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {showForm && (
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '20px' }}>Add New Artist</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              placeholder="Artist Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <select
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="RESIDENT">Resident</option>
              <option value="GUEST">Guest</option>
            </select>
            <input
              type="text"
              placeholder="Style"
              value={form.style}
              onChange={(e) => setForm({...form, style: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Years of Experience"
              value={form.yearsOfExperience}
              onChange={(e) => setForm({...form, yearsOfExperience: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) => setForm({...form, specialization: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Hourly Rate"
              value={form.hourlyRate}
              onChange={(e) => setForm({...form, hourlyRate: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="tel"
              placeholder="Contact Number"
              value={form.contactNumber}
              onChange={(e) => setForm({...form, contactNumber: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button
              type="submit"
              style={{
                padding: '10px',
                background: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                gridColumn: '1 / -1'
              }}
            >
              Add Artist
            </button>
          </form>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {artists.map(artist => (
          <div
            key={artist.id}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${artist.category === 'RESIDENT' ? '#27ae60' : '#e67e22'}`
            }}
          >
            <h3 style={{ marginBottom: '10px', color: '#2c3e50' }}>{artist.name}</h3>
            <p><strong>Category:</strong> {artist.category}</p>
            <p><strong>Style:</strong> {artist.style || 'N/A'}</p>
            <p><strong>Experience:</strong> {artist.yearsOfExperience || 'N/A'} years</p>
            <p><strong>Specialization:</strong> {artist.specialization || 'N/A'}</p>
            <p><strong>Rate:</strong> ${artist.hourlyRate || 'N/A'}/hr</p>
            <p><strong>Email:</strong> {artist.email || 'N/A'}</p>
            <p><strong>Contact:</strong> {artist.contactNumber || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;