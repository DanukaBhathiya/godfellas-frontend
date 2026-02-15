import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    category: '',
    description: '',
    amount: '',
    paymentMethod: 'Cash',
    isDimuExpense: false
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const response = await api.getTodayExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addExpense(form);
      setForm({
        category: '',
        description: '',
        amount: '',
        paymentMethod: 'Cash',
        isDimuExpense: false
      });
      setShowForm(false);
      loadExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const dimuExpenses = expenses.filter(e => e.isDimuExpense).reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Expense Management</h1>
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
          {showForm ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #e74c3c'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Total Expenses</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>${totalExpenses.toFixed(2)}</p>
        </div>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #9b59b6'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Dimu Expenses</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#9b59b6' }}>${dimuExpenses.toFixed(2)}</p>
        </div>
      </div>

      {showForm && (
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '20px' }}>Add New Expense</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              placeholder="Category (e.g., Supplies, Rent)"
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({...form, amount: e.target.value})}
              required
              step="0.01"
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              required
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', gridColumn: '1 / -1' }}
            />
            <select
              value={form.paymentMethod}
              onChange={(e) => setForm({...form, paymentMethod: e.target.value})}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <label style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
              <input
                type="checkbox"
                checked={form.isDimuExpense}
                onChange={(e) => setForm({...form, isDimuExpense: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              Dimu Expense
            </label>
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
              Add Expense
            </button>
          </form>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Description</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Amount</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Payment</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>{expense.category}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>{expense.description}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>
                  ${expense.amount}
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>{expense.paymentMethod}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #dee2e6' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: expense.isDimuExpense ? '#e8daef' : '#d5f4e6',
                    color: expense.isDimuExpense ? '#6c3483' : '#145a32'
                  }}>
                    {expense.isDimuExpense ? 'Dimu' : 'General'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;