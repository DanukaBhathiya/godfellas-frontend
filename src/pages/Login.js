import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(https://wallpapercave.com/wp/wp4005472.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div style={{
        background: 'rgba(26, 26, 26, 0.95)',
        padding: '40px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#e74c3c',
          marginBottom: '30px',
          fontSize: '28px',
          letterSpacing: '2px'
        }}>
          GOOD FELLAS POS
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#ecf0f1', marginBottom: '8px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #555',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '16px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#ecf0f1', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #555',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '16px'
              }}
              required
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(231, 76, 60, 0.2)',
              color: '#e74c3c',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              border: '1px solid #e74c3c'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#c0392b'}
            onMouseOut={(e) => e.target.style.background = '#e74c3c'}
          >
            LOGIN
          </button>
        </form>

        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          color: '#95a5a6',
          fontSize: '12px'
        }}>

        </div>
      </div>
    </div>
  );
};

export default Login;
