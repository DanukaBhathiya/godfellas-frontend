import axios from 'axios';

const API_BASE = '/api';

export const api = {
  // Dashboard
  getDashboard: () => axios.get(`${API_BASE}/dashboard/summary`),
  
  // Financials
  getTodayFinancials: () => axios.get(`${API_BASE}/financials/today`),
  updateIncome: (date, source, amount) => 
    axios.post(`${API_BASE}/financials/income/${date}?source=${source}&amount=${amount}`),
  
  // Artists
  getArtists: () => axios.get(`${API_BASE}/artists/active`),
  getResidents: () => axios.get(`${API_BASE}/artists/residents`),
  getGuests: () => axios.get(`${API_BASE}/artists/guests`),
  addArtist: (data) => axios.post(`${API_BASE}/artists`, data),
  
  // Inventory
  getInventory: () => axios.get(`${API_BASE}/inventory`),
  getLowStock: () => axios.get(`${API_BASE}/inventory/low-stock`),
  addItem: (data) => axios.post(`${API_BASE}/inventory`, data),
  updateStock: (id, quantity) => 
    axios.put(`${API_BASE}/inventory/${id}/stock?quantity=${quantity}`),
  
  // Clients
  getClients: () => axios.get(`${API_BASE}/clients`),
  addClient: (data) => axios.post(`${API_BASE}/clients`, data),
  
  // Expenses
  getTodayExpenses: () => axios.get(`${API_BASE}/expenses/today`),
  addExpense: (data) => axios.post(`${API_BASE}/expenses`, data),
  
  // Billing
  createBilling: (data) => axios.post(`${API_BASE}/billing`, data),
  getBillings: () => axios.get(`${API_BASE}/billing`)
};