import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: '#fff',
      fontSize: '20px'
    }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      color: '#e74c3c',
      fontSize: '24px'
    }}>
      Access Denied - Insufficient Permissions
    </div>;
  }

  return children;
};

export default ProtectedRoute;
