import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    supplier: '',
    quantity: '',
    minStockLevel: '10',
    unitCost: ''
  });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const response = await api.getInventory();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addItem(form);
      setForm({
        itemName: '',
        category: '',
        supplier: '',
        quantity: '',
        minStockLevel: '10',
        unitCost: ''
      });
      setShowForm(false);
      loadInventory();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateStock = async (id, newQuantity) => {
    try {
      await api.updateStock(id, newQuantity);
      loadInventory();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Inventory Management</h1>
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
          {showForm ? 'Cancel' : 'Add Item'}
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
          <h3 style={{ marginBottom: '20px' }}>Add New Item</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              placeholder="Item Name"
              value={form.itemName}
              onChange={(e) => setForm({...form, itemName: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Supplier"
              value={form.supplier}
              onChange={(e) => setForm({...form, supplier: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({...form, quantity: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Min Stock Level"
              value={form.minStockLevel}
              onChange={(e) => setForm({...form, minStockLevel: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Unit Cost"
              value={form.unitCost}
              onChange={(e) => setForm({...form, unitCost: e.target.value})}
              required
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
              Add Item
            </button>
          </form>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Item</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Quantity</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Unit Cost</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Total Cost</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>
                  <div>
                    <strong>{item.itemName}</strong>
                    {item.supplier && <div style={{ fontSize: '12px', color: '#666' }}>Supplier: {item.supplier}</div>}
                  </div>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>{item.category}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>{item.quantity}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>${item.unitCost}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>${item.totalCost}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: item.quantity <= item.minStockLevel ? '#fee' : '#efe',
                    color: item.quantity <= item.minStockLevel ? '#c33' : '#363'
                  }}>
                    {item.quantity <= item.minStockLevel ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>
                  <input
                    type="number"
                    placeholder="New qty"
                    style={{ width: '80px', padding: '4px', marginRight: '5px' }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        updateStock(item.id, parseInt(e.target.value));
                        e.target.value = '';
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;