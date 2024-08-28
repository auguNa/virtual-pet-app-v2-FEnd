import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App'; // Main App component

// Creating the root element and rendering the App component into the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
