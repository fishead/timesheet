import './main.css';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Sheet from './components/Sheet';

(function main() {
  const app = document.createElement('div');
  app.style.height = '100%';
  document.body.appendChild(app);
  ReactDOM.render(<Sheet />, app);
}());
