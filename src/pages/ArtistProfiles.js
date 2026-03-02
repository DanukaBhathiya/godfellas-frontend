import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const ArtistProfiles = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const response = await api.getResidents();
      setArtists(response.data);
    } catch (error) {
      console.error('Error loading artists:', error);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Meet Our Artists</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        {artists.map(artist => (
          <div
            key={artist.id}
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              border: '2px solid #ecf0f1'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => setSelectedArtist(artist)}
          >
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: '#3498db',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {artist.name.charAt(0)}
            </div>
            
            <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#2c3e50' }}>
              {artist.name}
            </h2>
            
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <span style={{ 
                background: '#27ae60', 
                color: 'white', 
                padding: '5px 15px', 
                borderRadius: '20px',
                fontSize: '12px'
              }}>
                {artist.category}
              </span>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <p><strong>Style:</strong> {artist.style || 'Various'}</p>
              <p><strong>Experience:</strong> {artist.yearsOfExperience || 0} years</p>
              <p><strong>Specialization:</strong> {artist.specialization || 'General'}</p>
              <p><strong>Rate:</strong> Rs {artist.hourlyRate || 'Contact for pricing'}/hr</p>
            </div>
            
            <button style={{
              width: '100%',
              marginTop: '20px',
              padding: '10px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              View Full Profile
            </button>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
        onClick={() => setSelectedArtist(null)}
        >
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '20px' }}>{selectedArtist.name}</h2>
            <p><strong>Category:</strong> {selectedArtist.category}</p>
            <p><strong>Style:</strong> {selectedArtist.style || 'Various'}</p>
            <p><strong>Years of Experience:</strong> {selectedArtist.yearsOfExperience || 0}</p>
            <p><strong>Specialization:</strong> {selectedArtist.specialization || 'General'}</p>
            <p><strong>Hourly Rate:</strong> Rs {selectedArtist.hourlyRate || 'Contact for pricing'}</p>
            <p><strong>Email:</strong> {selectedArtist.email || 'N/A'}</p>
            <p><strong>Contact:</strong> {selectedArtist.contactNumber || 'N/A'}</p>
            
            <button
              onClick={() => setSelectedArtist(null)}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistProfiles;
