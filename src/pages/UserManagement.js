import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'MANAGER'
  });
  const { token, user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8080/api/auth/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('User created successfully');
      setShowForm(false);
      setFormData({ username: '', password: '', email: '', role: 'MANAGER' });
      fetchUsers();
    } else {
      const error = await response.text();
      alert(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const response = await fetch(`http://localhost:8080/api/auth/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('User deleted');
        fetchUsers();
      } else {
        const error = await response.text();
        alert(error);
      }
    }
  };

  const handleResetPassword = async (id) => {
    const newPassword = prompt('Enter new password for this user:');
    if (newPassword) {
      const response = await fetch(`http://localhost:8080/api/auth/users/${id}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });

      if (response.ok) {
        alert('Password reset successfully');
      } else {
        const error = await response.text();
        alert(error);
      }
    }
  };

  const getRoleColor = (role) => {
    const colors = {
//      SUPER_ADMIN: '#9b59b6',
//      ADMIN: '#e74c3c',
//      MANAGER: '#3498db',
//      ARTIST: '#2ecc71',
//      RECEPTIONIST: '#f39c12',
//      VIEWER: '#95a5a6'
    };
    return colors[role] || '#fff';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>User Management</h1>
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
          {showForm ? 'Cancel' : '+ Add User'}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Create New User</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                >
                  {user.role === 'SUPER_ADMIN' && (
                    <>
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      <option value="ADMIN">ADMIN</option>
                    </>
                  )}
                  <option value="MANAGER">MANAGER</option>
                  <option value="ARTIST">ARTIST</option>
                  <option value="RECEPTIONIST">RECEPTIONIST</option>
                  <option value="VIEWER">VIEWER</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              style={{
                marginTop: '15px',
                padding: '10px 30px',
                background: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Create User
            </button>
          </form>
        </div>
      )}

      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', color: '#2c3e50', fontWeight: 'bold' }}>Username</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#2c3e50', fontWeight: 'bold' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#2c3e50', fontWeight: 'bold' }}>Role</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#2c3e50', fontWeight: 'bold' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', color: '#2c3e50', fontWeight: 'bold' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                <td style={{ padding: '15px', color: '#2c3e50' }}>{u.username}</td>
                <td style={{ padding: '15px', color: '#2c3e50' }}>{u.email || '-'}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    background: getRoleColor(u.role),
                    color: '#2c3e50',
                    fontSize: '12px'
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '15px', color: u.active ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                  {u.active ? 'Active' : 'Inactive'}
                </td>
                <td style={{ padding: '15px' }}>
                  <button
                    onClick={() => handleResetPassword(u.id)}
                    style={{
                      padding: '5px 15px',
                      background: '#f39c12',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}
                  >
                    Reset Password
                  </button>
                  {u.id !== user.userId && (
                    <button
                      onClick={() => handleDelete(u.id)}
                      style={{
                        padding: '5px 15px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
