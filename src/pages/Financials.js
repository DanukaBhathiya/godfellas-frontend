import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Financials = () => {
  const [financials, setFinancials] = useState(null);
  const [incomeForm, setIncomeForm] = useState({
    customerAdvance: '',
    tattooing: '',
    tattooRemoval: '',
    piercing: '',
    productSale: '',
    etc: ''
  });

  useEffect(() => {
    loadFinancials();
  }, []);

  const loadFinancials = async () => {
    try {
      const response = await api.getTodayFinancials();
      setFinancials(response.data);
      setIncomeForm({
        customerAdvance: response.data.customerAdvance || '',
        tattooing: response.data.tattooing || '',
        tattooRemoval: response.data.tattooRemoval || '',
        piercing: response.data.piercing || '',
        productSale: response.data.productSale || '',
        etc: response.data.etc || ''
      });
    } catch (error) {
      console.error('Error loading financials:', error);
    }
  };

  const updateIncome = async (source, amount) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await api.updateIncome(today, source, amount);
      loadFinancials();
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const handleInputChange = (source, value) => {
    setIncomeForm(prev => ({ ...prev, [source]: value }));
    if (value) {
      updateIncome(source, parseFloat(value));
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Daily Financials</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Income Sources</h2>
          
          {[
            { key: 'customerAdvance', label: 'Customer Advance' },
            { key: 'tattooing', label: 'Tattooing' },
            { key: 'tattooRemoval', label: 'Tattoo Removal' },
            { key: 'piercing', label: 'Piercing' },
            { key: 'productSale', label: 'Product Sale' },
            { key: 'etc', label: 'Other' }
          ].map(item => (
            <div key={item.key} style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {item.label}
              </label>
              <input
                type="number"
                value={incomeForm[item.key]}
                onChange={(e) => handleInputChange(item.key, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                placeholder="0.00"
              />
            </div>
          ))}
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Calculations</h2>
          
          {financials && (
            <div>
              <FinancialRow label="Total Daily Income" value={financials.totalDailyIncome} color="#3498db" />
              <FinancialRow label="Studio Cut (13%)" value={financials.studioCut} color="#e74c3c" />
              <FinancialRow label="After Studio Cut" value={financials.afterStudioCut} color="#27ae60" />
              <FinancialRow label="Artist Payment" value={financials.artistPayment} color="#f39c12" />
              <FinancialRow label="Dimu Payment (50%)" value={financials.dimuPayment} color="#9b59b6" />
              
              <hr style={{ margin: '20px 0' }} />
              
              <FinancialRow label="Tattoo Removal 30%" value={financials.tattooRemoval30} color="#e67e22" />
              <FinancialRow label="Tattoo Removal 70%" value={financials.tattooRemoval70} color="#2ecc71" />
              
              <hr style={{ margin: '20px 0' }} />
              
              <FinancialRow label="Total Expenses" value={financials.totalExpenses} color="#e74c3c" />
              <FinancialRow label="Total After Expenses" value={financials.totalAfterExpenses} color="#27ae60" />
              <FinancialRow label="Total Profit" value={financials.totalProfit} color="#27ae60" bold />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FinancialRow = ({ label, value, color, bold }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    marginBottom: '10px',
    fontWeight: bold ? 'bold' : 'normal',
    fontSize: bold ? '18px' : '14px'
  }}>
    <span>{label}:</span>
    <span style={{ color }}>${value || 0}</span>
  </div>
);

export default Financials;