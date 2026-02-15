import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/billing', label: 'Billing', icon: '💳' },
    { path: '/artists', label: 'Artists', icon: '👨🎨' },
    { path: '/clients', label: 'Clients', icon: '👥' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/expenses', label: 'Expenses', icon: '💸' },
    { path: '/financials', label: 'Financials', icon: '💰' },
    { path: '/reports', label: 'Reports', icon: '📄' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav style={{ 
        width: '200px', 
        background: '#2c3e50', 
        color: 'white',
        padding: '20px 0'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#ecf0f1'
        }}>
          Godfellas POS
        </h2>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'block',
              padding: '15px 20px',
              color: location.pathname === item.path ? '#3498db' : '#ecf0f1',
              textDecoration: 'none',
              background: location.pathname === item.path ? '#34495e' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid #3498db' : 'none'
            }}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
      
      <main style={{ 
        flex: 1, 
        padding: '20px',
        overflow: 'auto'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;