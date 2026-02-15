# Godfellas Tattoo Studio - Frontend

React-based frontend for the Godfellas POS system.

## Features

- **Dashboard** - Real-time overview with financial summaries and alerts
- **Billing System** - Create bills with automatic calculations
- **Artist Management** - Add/manage artists with category filtering
- **Inventory Management** - Stock tracking with low-stock alerts
- **Financial Tracking** - Daily income/expense management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Make sure the backend is running on `http://localhost:8080`

## Key Components

### Pages
- `Dashboard.js` - Main overview with summary cards
- `Billing.js` - Billing system with calculation preview
- `Artists.js` - Artist management with filtering
- `Inventory.js` - Stock management with alerts
- `Financials.js` - Daily financial tracking

### Services
- `api.js` - API service layer for backend communication

### Features
- **Automated Calculations** - All financial calculations done in real-time
- **Category Filtering** - Filter artists by Resident/Guest/All
- **Stock Alerts** - Visual indicators for low stock items
- **Responsive Design** - Clean, professional interface
- **Real-time Updates** - Data refreshes automatically

## API Integration

The frontend connects to the Spring Boot backend via proxy configuration. All API calls are made through the `api.js` service layer.

## Usage

1. **Dashboard** - View daily summaries and alerts
2. **Add Artists** - Use the Artists page to add new resident/guest artists
3. **Create Bills** - Use Billing page to process payments (auto-updates financials)
4. **Track Inventory** - Add items and monitor stock levels
5. **Monitor Financials** - Update daily income sources and view calculations