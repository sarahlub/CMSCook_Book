import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DarkMode from './components/darkMode/DarkMode';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <DarkMode/>
  </React.StrictMode>
);


