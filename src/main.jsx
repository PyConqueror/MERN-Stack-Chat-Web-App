import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App/App.jsx'
import './Pages/App/App.css'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
)
