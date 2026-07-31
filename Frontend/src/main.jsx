// Override fetch to automatically prepend VITE_API_BASE_URL for API calls in production
const originalFetch = window.fetch;
window.fetch = function (url, options) {
  if (typeof url === 'string' && url.startsWith('/api/')) {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    url = `${apiBase}${url}`;
  }
  return originalFetch(url, options);
};

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { store } from './store/store.js'
import {Provider} from 'react-redux'






createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // <Provider store={store}>
        <App />
  // </Provider>
  // </StrictMode>
)
