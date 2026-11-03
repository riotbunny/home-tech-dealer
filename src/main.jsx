import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { connectPhoneTracking } from './services/phoneTracking'

const disconnectPhoneTracking = connectPhoneTracking(document.getElementById('root'));
if (import.meta.hot) import.meta.hot.dispose(disconnectPhoneTracking);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
