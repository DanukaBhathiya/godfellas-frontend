import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.getDashboard();
      setSummary(response.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Dashboard</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <Card title="Today's Income" value={`$${summary?.todayIncome || 0}`} color="#27ae60" />
        <Card title="Today's Expenses" value={`$${summary?.todayExpenses || 0}`} color="#e74c3c" />
        <Card title="Today's Profit" value={`$${summary?.todayProfit || 0}`} color="#3498db" />
        <Card title="Studio Cut (13%)" value={`$${summary?.studioCut || 0}`} color="#9b59b6" />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        <Card title="Active Artists" value={summary?.activeArtistsCount || 0} color="#f39c12" />
        <Card title="Residents" value={summary?.residentArtistsCount || 0} color="#2ecc71" />
        <Card title="Guests" value={summary?.guestArtistsCount || 0} color="#e67e22" />
        <Card title="Low Stock Items" value={summary?.lowStockItemsCount || 0} color="#e74c3c" />
      </div>

      {summary?.lowStockItems?.length > 0 && (
        <div style={{ 
          marginTop: '30px',
          padding: '20px',
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '5px'
        }}>
          <h3 style={{ color: '#856404', marginBottom: '10px' }}>⚠️ Low Stock Alert</h3>
          <ul style={{ color: '#856404' }}>
            {summary.lowStockItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div style={{
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderLeft: `4px solid ${color}`
  }}>
    <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>{title}</h3>
    <p style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</p>
  </div>
);

export default Dashboard;