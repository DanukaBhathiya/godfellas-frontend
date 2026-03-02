import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Billing = () => {
  const [artists, setArtists] = useState([]);
  const [form, setForm] = useState({
    clientId: '',
    artistId: '',
    amount: '',
    paymentMethod: 'Cash',
    serviceType: 'Tattoo'
  });
  const [billings, setBillings] = useState([]);

  const printInvoice = (billing) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${billing.id}</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; }
            .signature { margin-top: 80px; border-top: 1px solid #000; width: 200px; }
            .total { font-size: 20px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>GOODFELLAS TATTOO STUDIO</h1>
            <p>Invoice #${billing.id}</p>
            <p>Date: ${new Date(billing.billingDate).toLocaleDateString()}</p>
          </div>
          <div class="details">
            <div class="row"><span>Artist:</span><span>${billing.artist?.name || 'N/A'}</span></div>
            <div class="row"><span>Service:</span><span>${billing.serviceType}</span></div>
            <div class="row"><span>Payment Method:</span><span>${billing.paymentMethod}</span></div>
            <hr/>
            <div class="row total"><span>Total:</span><span>Rs ${billing.amount}</span></div>
          </div>
          <div style="margin-top: 100px;">
            <div class="signature">Customer Signature</div>
            <div class="signature" style="margin-top: 50px;">Staff Signature</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  useEffect(() => {
    loadArtists();
    loadBillings();
  }, []);

  const loadArtists = async () => {
    try {
      const response = await api.getArtists();
      setArtists(response.data);
    } catch (error) {
      console.error('Error loading artists:', error);
    }
  };

  const loadBillings = async () => {
    try {
      const response = await api.getBillings();
      setBillings(response.data);
    } catch (error) {
      console.error('Error loading billings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createBilling({
        ...form,
        clientId: 1, // Default client for now
        amount: parseFloat(form.amount)
      });
      setForm({
        clientId: '',
        artistId: '',
        amount: '',
        paymentMethod: 'Cash',
        serviceType: 'Tattoo'
      });
      loadBillings();
    } catch (error) {
      console.error('Error creating billing:', error);
    }
  };

  const calculateEarnings = (amount) => {
    const studioCut = amount * 0.13;
    const artistPayment = amount - studioCut;
    return { studioCut, artistPayment };
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Billing System</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Create New Bill</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Artist
              </label>
              <select
                value={form.artistId}
                onChange={(e) => setForm({...form, artistId: e.target.value})}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="">Select Artist</option>
                {artists.map(artist => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name} ({artist.category})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Service Type
              </label>
              <select
                value={form.serviceType}
                onChange={(e) => setForm({...form, serviceType: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="Tattoo">Tattoo</option>
                <option value="Removal">Tattoo Removal</option>
                <option value="Piercing">Piercing</option>
                <option value="Product">Product Sale</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Amount (Rs)
              </label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({...form, amount: e.target.value})}
                required
                step="0.01"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="0.00"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Payment Method
              </label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({...form, paymentMethod: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            {form.amount && (
              <div style={{ 
                background: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '5px',
                marginBottom: '15px'
              }}>
                <h4 style={{ marginBottom: '10px' }}>Calculation Preview:</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Amount:</span>
                  <span>Rs {parseFloat(form.amount).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Studio Cut (13%):</span>
                  <span>Rs {(parseFloat(form.amount) * 0.13).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>After 13%:</span>
                  <span>Rs {(parseFloat(form.amount) * 0.87).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Artist Payment (50%):</span>
                  <span>Rs {(parseFloat(form.amount) * 0.87 * 0.50).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Dimu Payment (50%):</span>
                  <span>Rs {(parseFloat(form.amount) * 0.87 * 0.50).toFixed(2)}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Create Bill
            </button>
          </form>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Recent Billings</h2>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {billings.slice(0, 10).map(billing => (
              <div
                key={billing.id}
                style={{
                  padding: '15px',
                  border: '1px solid #eee',
                  borderRadius: '5px',
                  marginBottom: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong>{billing.artist?.name}</strong>
                  <span style={{ color: '#27ae60', fontWeight: 'bold' }}>Rs {billing.amount}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {billing.serviceType} • {billing.paymentMethod} • {new Date(billing.billingDate).toLocaleDateString()}
                </div>
                <button
                  onClick={() => printInvoice(billing)}
                  style={{
                    marginTop: '10px',
                    padding: '5px 10px',
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Print Invoice
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;