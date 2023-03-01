import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './reducers';
import App from './components/App';
import './index.css';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
