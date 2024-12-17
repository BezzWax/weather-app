import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { cityStore } from './hooks/cityStore/cityStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={cityStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


