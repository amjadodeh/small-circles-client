import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { LoggedInProvider } from './Context/LoggedInContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <LoggedInProvider>
      <App />
    </LoggedInProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
