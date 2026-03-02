import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/billing', label: 'Billing', icon: '💳' },
    { path: '/artists', label: 'Artists', icon: '👨🎨' },
    { path: '/artist-profiles', label: 'Artist Profiles', icon: '⭐' },
    { path: '/clients', label: 'Clients', icon: '👥' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/expenses', label: 'Expenses', icon: '💸' },
    { path: '/financials', label: 'Financials', icon: '💰' },
    { path: '/reports', label: 'Reports', icon: '📄' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh'
    , background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.80) 50%, rgba(45, 45, 45, 0.50) 50%)'
    }}>
      <nav style={{ 
        width: '200px',
//        background: 'rgba(26, 26, 26, 0.30)',
//        color: 'white',
        padding: '20px 0',
//        boxShadow: '2px 0 10px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(30px)',
//        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#ecf0f1',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          letterSpacing: '2px',
          fontSize: '18px'
        }}>
          GOOD FELLAS POS
        </h2>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'block',
              padding: '15px 20px',
              color: location.pathname === item.path ? '#e74c3c' : '#ecf0f1',
              textDecoration: 'none',
              background: location.pathname === item.path ? 'rgba(231, 76, 60, 0.2)' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid #e74c3c' : 'none',
              transition: 'all 0.3s',
              fontWeight: location.pathname === item.path ? 'bold' : 'normal'
            }}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
      
      <main style={{ 
        flex: 1, 
        padding: '20px',
        overflow: 'auto',
        background: '#2d2d2d',
        backgroundImage: `url('https://wallpapercave.com/wp/wp4005472.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.50)',
          zIndex: 0
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;