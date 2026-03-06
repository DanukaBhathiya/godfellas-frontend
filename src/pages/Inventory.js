import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [form, setForm] = useState({
    itemName: '',
    category: '',
    supplier: '',
    quantity: '',
    minStockLevel: '10',
    unitCost: '',
    barcode: ''
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
        unitCost: '',
        barcode: ''
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
  
  const handleBarcodeSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/barcode/${barcodeInput}`);
      if (response.ok) {
        const item = await response.json();
        const newQty = prompt(`Current quantity: ${item.quantity}\nEnter new quantity:`, item.quantity);
        if (newQty) {
          await updateStock(item.id, parseInt(newQty));
        }
      } else {
        alert('Barcode not found');
      }
      setBarcodeInput('');
    } catch (error) {
      console.error('Error searching barcode:', error);
    }
  };
  
  const generateBarcode = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/inventory/barcode/generate?itemId=${itemId}`, {
        method: 'POST'
      });
      const barcode = await response.text();
      alert(`Barcode generated: ${barcode}`);
      loadInventory();
    } catch (error) {
      console.error('Error generating barcode:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '10px' }}>
        <h1>Inventory Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setScanMode(!scanMode)}
            style={{
              padding: '10px 20px',
              background: scanMode ? '#e74c3c' : '#9b59b6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {scanMode ? '📋 Manual Mode' : '📷 Scan Mode'}
          </button>
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
      </div>
      
      {scanMode && (
        <div style={{ 
          background: 'rgba(155, 89, 182, 0.1)', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid #9b59b6'
        }}>
          <h3 style={{ marginBottom: '15px', color: '#ecf0f1' }}>🔍 Barcode Scanner</h3>
          <form onSubmit={handleBarcodeSearch} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Scan or enter barcode..."
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              autoFocus
              style={{ 
                flex: 1, 
                padding: '12px', 
                fontSize: '16px',
                border: '2px solid #9b59b6',
                borderRadius: '5px'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 30px',
                background: '#9b59b6',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Search
            </button>
          </form>
          <p style={{ marginTop: '10px', fontSize: '12px', color: '#95a5a6' }}>
            Tip: Use a USB barcode scanner or type the barcode manually
          </p>
        </div>
      )}

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
              type="text"
              placeholder="Barcode (optional)"
              value={form.barcode}
              onChange={(e) => setForm({...form, barcode: e.target.value})}
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

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Item</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Barcode</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Category</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Quantity</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Unit Cost</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Total Cost</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ecf0f1', color: '#2c3e50', fontWeight: 'bold' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1', color: '#2c3e50' }}>
                  <div>
                    <strong>{item.itemName}</strong>
                    {item.supplier && <div style={{ fontSize: '12px', color: '#95a5a6' }}>Supplier: {item.supplier}</div>}
                  </div>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1', color: '#2c3e50' }}>
                  {item.barcode ? (
                    <span style={{ fontFamily: 'monospace', background: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
                      {item.barcode}
                    </span>
                  ) : (
                    <button
                      onClick={() => generateBarcode(item.id)}
                      style={{
                        padding: '4px 8px',
                        background: '#9b59b6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}
                    >
                      Generate
                    </button>
                  )}
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1', color: '#2c3e50' }}>{item.category}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1', color: '#2c3e50' }}>{item.quantity}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1', color: '#2c3e50' }}>Rs {item.unitCost}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1', color: '#2c3e50' }}>Rs {item.totalCost}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: item.quantity <= item.minStockLevel ? 'rgba(231, 76, 60, 0.2)' : 'rgba(39, 174, 96, 0.2)',
                    color: item.quantity <= item.minStockLevel ? '#e74c3c' : '#27ae60',
                    border: `1px solid ${item.quantity <= item.minStockLevel ? '#e74c3c' : '#27ae60'}`
                  }}>
                    {item.quantity <= item.minStockLevel ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #ecf0f1' }}>
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