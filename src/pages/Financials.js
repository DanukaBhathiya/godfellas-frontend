import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Financials = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [financials, setFinancials] = useState(null);
  const [incomeForm, setIncomeForm] = useState({
    customerAdvance: '',
    tattooing: '',
    tattooRemoval: '',
    piercing: '',
    productSale: '',
    etc: ''
  });
  const [expenseForm, setExpenseForm] = useState({
    totalAdvancePayment: '',
    totalExpenses: '',
    dimuExpenses: '',
    totalBuyingTattooProduct: '',
    productPayingAfterSaving: ''
  });

  useEffect(() => {
    loadFinancials();
  }, [selectedDate]);

  const loadFinancials = async () => {
    try {
      const response = await api.getFinancialsByDate(selectedDate);
      setFinancials(response.data);
      setIncomeForm({
        customerAdvance: response.data.customerAdvance || '',
        tattooing: response.data.tattooing || '',
        tattooRemoval: response.data.tattooRemoval || '',
        piercing: response.data.piercing || '',
        productSale: response.data.productSale || '',
        etc: response.data.etc || ''
      });
      setExpenseForm({
        totalAdvancePayment: response.data.totalAdvancePayment || '',
        totalExpenses: response.data.totalExpenses || '',
        dimuExpenses: response.data.dimuExpenses || '',
        totalBuyingTattooProduct: response.data.totalBuyingTattooProduct || '',
        productPayingAfterSaving: response.data.productPayingAfterSaving || ''
      });
    } catch (error) {
      console.error('Error loading financials:', error);
      // Initialize empty form if no data exists
      setFinancials(null);
      setIncomeForm({
        customerAdvance: '',
        tattooing: '',
        tattooRemoval: '',
        piercing: '',
        productSale: '',
        etc: ''
      });
      setExpenseForm({
        totalAdvancePayment: '',
        totalExpenses: '',
        dimuExpenses: '',
        totalBuyingTattooProduct: '',
        productPayingAfterSaving: ''
      });
    }
  };

  const updateIncome = async (source, amount) => {
    try {
      await api.updateIncome(selectedDate, source, amount);
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

  const handleExpenseChange = (field, value) => {
    setExpenseForm(prev => ({ ...prev, [field]: value }));
    if (value) {
      updateIncome(field, parseFloat(value));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Daily Financials</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold' }}>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: '10px',
              border: '2px solid #3498db',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
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
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Expenses & Advances</h2>
          
          {[
            { key: 'totalAdvancePayment', label: 'Total Advance Payment' },
            { key: 'totalExpenses', label: 'Total Expenses' },
            { key: 'dimuExpenses', label: 'Dimu Expenses' },
            { key: 'totalBuyingTattooProduct', label: 'Total Buying Tattoo Product' },
            { key: 'productPayingAfterSaving', label: 'Product Paying After Saving' }
          ].map(item => (
            <div key={item.key} style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {item.label}
              </label>
              <input
                type="number"
                value={expenseForm[item.key]}
                onChange={(e) => handleExpenseChange(item.key, e.target.value)}
                readOnly={item.key === 'totalExpenses' || item.key === 'dimuExpenses'}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: (item.key === 'totalExpenses' || item.key === 'dimuExpenses') ? '#f0f0f0' : 'white',
                  cursor: (item.key === 'totalExpenses' || item.key === 'dimuExpenses') ? 'not-allowed' : 'text'
                }}
                placeholder={item.key === 'totalExpenses' || item.key === 'dimuExpenses' ? 'Auto-calculated from Expenses' : '0.00'}
              />
            </div>
          ))}
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Calculations</h2>
          
          {financials ? (
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
              
              <FinancialRow label="Total Advance Payment" value={financials.totalAdvancePayment} color="#e67e22" />
              <FinancialRow label="After Deduction Artist Payment" value={financials.afterDeductionArtistPayment} color="#16a085" />
              
              <hr style={{ margin: '20px 0' }} />
              
              <FinancialRow label="Total Expenses" value={financials.totalExpenses} color="#e74c3c" />
              <FinancialRow label="Total After Expenses" value={financials.totalAfterExpenses} color="#27ae60" />
              <FinancialRow label="Total Buying Tattoo Product" value={financials.totalBuyingTattooProduct} color="#8e44ad" />
              <FinancialRow label="Product Paying After Saving" value={financials.productPayingAfterSaving} color="#2980b9" />
              
              <hr style={{ margin: '20px 0' }} />
              
              <FinancialRow label="Total Profit" value={financials.totalProfit} color="#27ae60" bold />
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>
              <p>No financial data for this date.</p>
              <p>Enter income sources to create a record.</p>
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
    <span style={{ color }}>Rs {value || 0}</span>
  </div>
);

export default Financials;