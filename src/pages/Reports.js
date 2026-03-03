import React, { useState } from 'react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const downloadDailySales = async (format = 'pdf') => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }
    const url = format === 'excel' 
      ? `/api/reports/excel/sales/daily?startDate=${selectedDate}&endDate=${selectedDate}`
      : `/api/reports/sales/daily?date=${selectedDate}`;
    const filename = format === 'excel' 
      ? `daily_sales_${selectedDate}.xlsx`
      : `daily_sales_${selectedDate}.pdf`;
    await downloadFile(url, filename, format);
  };

  const downloadMonthlySales = async (format = 'pdf') => {
    if (!selectedMonth) {
      alert('Please select a month');
      return;
    }
    const [year, month] = selectedMonth.split('-');
    const url = format === 'excel'
      ? `/api/reports/excel/sales/monthly?year=${year}&month=${parseInt(month)}`
      : `/api/reports/sales/monthly?year=${year}&month=${parseInt(month)}`;
    const filename = format === 'excel'
      ? `monthly_sales_${selectedMonth}.xlsx`
      : `monthly_sales_${selectedMonth}.pdf`;
    await downloadFile(url, filename, format);
  };

  const downloadYearlySales = async (format = 'pdf') => {
    if (!selectedYear) {
      alert('Please select a year');
      return;
    }
    const url = format === 'excel'
      ? `/api/reports/excel/sales/yearly?year=${selectedYear}`
      : `/api/reports/sales/yearly?year=${selectedYear}`;
    const filename = format === 'excel'
      ? `yearly_sales_${selectedYear}.xlsx`
      : `yearly_sales_${selectedYear}.pdf`;
    await downloadFile(url, filename, format);
  };

  const downloadMonthlySalary = async (format = 'pdf') => {
    if (!selectedMonth) {
      alert('Please select a month');
      return;
    }
    const [year, month] = selectedMonth.split('-');
    const startDate = `${year}-${month.padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    
    const url = format === 'excel'
      ? `/api/reports/excel/salary/monthly?startDate=${startDate}&endDate=${endDate}`
      : `/api/reports/salary/monthly?year=${year}&month=${parseInt(month)}`;
    const filename = format === 'excel'
      ? `salary_sheet_${selectedMonth}.xlsx`
      : `salary_sheet_${selectedMonth}.pdf`;
    await downloadFile(url, filename, format);
  };

  const downloadFile = async (url, filename, format) => {
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
                    max={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => downloadDailySales('pdf')}
                    style={{
                      padding: '10px 20px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    📄 PDF
                  </button>
                  <button
                    onClick={() => downloadDailySales('excel')}
                    style={{
                      padding: '10px 20px',
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
                    📊 Excel
                  </button>
                </div>
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
                    max={new Date().toISOString().slice(0, 7)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => downloadMonthlySales('pdf')}
                    style={{
                      padding: '10px 20px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    📄 PDF
                  </button>
                  <button
                    onClick={() => downloadMonthlySales('excel')}
                    style={{
                      padding: '10px 20px',
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
                    📊 Excel
                  </button>
                </div>
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
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    {Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => 2020 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => downloadYearlySales('pdf')}
                    style={{
                      padding: '10px 20px',
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    📄 PDF
                  </button>
                  <button
                    onClick={() => downloadYearlySales('excel')}
                    style={{
                      padding: '10px 20px',
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
                    📊 Excel
                  </button>
                </div>
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
                    max={new Date().toISOString().slice(0, 7)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => downloadMonthlySalary('pdf')}
                  style={{
                    padding: '10px 20px',
                    background: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}
                >
                  📄 PDF
                </button>
                <button
                  onClick={() => downloadMonthlySalary('excel')}
                  style={{
                    padding: '10px 20px',
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
                  📊 Excel
                </button>
              </div>
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
          <li><strong>PDF Reports:</strong> Non-editable, professional format for official use</li>
          <li><strong>Excel Reports:</strong> Editable spreadsheets with professional formatting</li>
          <li>Reports include all active artists in the system</li>
          <li>Excel reports feature company branding, proper styling, and currency formatting</li>
          <li>Sales reports show daily earnings, expenses, and profit calculations</li>
          <li>Salary sheets are available monthly only</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;