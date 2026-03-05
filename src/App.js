import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import Artists from './pages/Artists';
import Inventory from './pages/Inventory';
import Financials from './pages/Financials';
import Clients from './pages/Clients';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import ArtistProfiles from './pages/ArtistProfiles';
import UserManagement from './pages/UserManagement';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/billing" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'RECEPTIONIST']}>
                      <Billing />
                    </ProtectedRoute>
                  } />
                  <Route path="/artists" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER']}>
                      <Artists />
                    </ProtectedRoute>
                  } />
                  <Route path="/inventory" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER']}>
                      <Inventory />
                    </ProtectedRoute>
                  } />
                  <Route path="/financials" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                      <Financials />
                    </ProtectedRoute>
                  } />
                  <Route path="/clients" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'RECEPTIONIST']}>
                      <Clients />
                    </ProtectedRoute>
                  } />
                  <Route path="/expenses" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER']}>
                      <Expenses />
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'VIEWER']}>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  <Route path="/users" element={
                    <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                      <UserManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/artist-profiles" element={<ArtistProfiles />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;