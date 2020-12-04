import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'rsuite/dist/styles/rsuite-default.css';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
  html {
    overflow-y: hidden;
    height: 100vh;
  }
  
  body, #root {
    height: 100%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
