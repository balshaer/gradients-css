import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { inject } from '@vercel/analytics';
inject();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
