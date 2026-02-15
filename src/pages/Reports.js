import React, { useState } from 'react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const downloadDailySales = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    const url = `/api/reports/sales/daily?date=${selectedDate}`;
    await downloadPdf(url, `daily_sales_${selectedDate}.pdf`);
  };

  const downloadMonthlySales = async () => {
    if (!selectedMonth) {
      alert('Please select a month');
      return;
    }
    const [year, month] = selectedMonth.split('-');
    const url = `/api/reports/sales/monthly?year=${year}&month=${parseInt(month)}`;
    await downloadPdf(url, `monthly_sales_${selectedMonth}.pdf`);
  };

  const downloadYearlySales = async () => {
    if (!selectedYear) {
      alert('Please select a year');
      return;
    }
    const url = `/api/reports/sales/yearly?year=${selectedYear}`;
    await downloadPdf(url, `yearly_sales_${selectedYear}.pdf`);
  };

  const downloadMonthlySalary = async () => {
    if (!selectedMonth) {
      alert('Please select a month');
      return;
    }
    const [year, month] = selectedMonth.split('-');
    const url = `/api/reports/salary/monthly?year=${year}&month=${parseInt(month)}`;
    await downloadPdf(url, `salary_sheet_${selectedMonth}.pdf`);
  };

  const downloadPdf = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report');
    }
  };

  const tabStyle = (isActive) => ({
    flex: 1,
    padding: '15px',
    background: isActive ? '#fff' : '#f5f5f5',
    border: 'none',
    borderBottom: isActive ? '3px solid #27ae60' : '3px solid transparent',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#27ae60' : '#666',
    transition: 'all 0.3s'
  });

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Reports & Downloads</h1>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex',
        background: '#f5f5f5',
        borderRadius: '8px 8px 0 0',
        overflow: 'hidden',
        marginBottom: '0'
      }}>
        <button
          onClick={() => setActiveTab('sales')}
          style={tabStyle(activeTab === 'sales')}
        >
          📊 Sales Reports
        </button>
        <button
          onClick={() => setActiveTab('salary')}
          style={tabStyle(activeTab === 'salary')}
        >
          💰 Salary Sheet
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '0 0 8px 8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {activeTab === 'sales' && (
          <div>
            {/* Daily Sales */}
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '2px solid #eee' }}>
              <h3 style={{ marginBottom: '15px', color: '#27ae60' }}>📅 Daily Sales Report</h3>
              <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
                Generate sales report for a specific date
              </p>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <button
                  onClick={downloadDailySales}
                  style={{
                    padding: '10px 25px',
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* Monthly Sales */}
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '2px solid #eee' }}>
              <h3 style={{ marginBottom: '15px', color: '#27ae60' }}>📆 Monthly Sales Report</h3>
              <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
                Generate sales report for an entire month
              </p>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Select Month
                  </label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <button
                  onClick={downloadMonthlySales}
                  style={{
                    padding: '10px 25px',
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* Yearly Sales */}
            <div>
              <h3 style={{ marginBottom: '15px', color: '#27ae60' }}>📊 Yearly Sales Report</h3>
              <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
                Generate comprehensive annual sales report
              </p>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Select Year
                  </label>
                  <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    min="2020"
                    max="2100"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <button
                  onClick={downloadYearlySales}
                  style={{
                    padding: '10px 25px',
                    background: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div>
            <h3 style={{ marginBottom: '15px', color: '#3498db' }}>💰 Monthly Salary Sheet</h3>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
              Generate monthly salary sheet with artist earnings, deductions, and net payments
            </p>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Select Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <button
                onClick={downloadMonthlySalary}
                style={{
                  padding: '10px 25px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              >
                Download PDF
              </button>
            </div>

            <div style={{ 
              marginTop: '30px',
              padding: '20px',
              background: '#e3f2fd',
              borderRadius: '8px',
              border: '1px solid #90caf9'
            }}>
              <h4 style={{ marginBottom: '10px', color: '#1976d2' }}>ℹ️ Salary Sheet Details</h4>
              <ul style={{ color: '#424242', lineHeight: '1.8', margin: 0 }}>
                <li>Artist income for the selected month</li>
                <li>13% studio cut deduction</li>
                <li>50% split calculation</li>
                <li>Advance payments and deductions</li>
                <li>Tattoo removal 30% commission</li>
                <li>Net salary after all deductions</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Information Section */}
      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        background: '#fff3cd',
        borderRadius: '8px',
        border: '1px solid #ffc107'
      }}>
        <h4 style={{ marginBottom: '10px', color: '#856404' }}>📋 Important Notes</h4>
        <ul style={{ color: '#856404', lineHeight: '1.8', margin: 0 }}>
          <li>All reports are generated in PDF format (non-editable)</li>
          <li>Reports include all active artists in the system</li>
          <li>Sales reports show daily earnings, expenses, and profit calculations</li>
          <li>Salary sheets are available monthly only</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;