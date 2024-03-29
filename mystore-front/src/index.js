import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import MyApp from './MyApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggelProvider from './Context/ToggelConstext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToggelProvider>
  <MyApp></MyApp>
  </ToggelProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
