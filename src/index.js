import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
     <App />
    </Router>
  </React.StrictMode>
);
