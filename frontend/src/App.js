import React from 'react';
import './App.css';

import logo from './assets/logo.svg';

import Routes from './routes';

function App() { /* Conceito 1: Componentização */
  return (
    <div className="container">
      {/* Sempre que precisar incluir código Javascript (ex da img .svg) na página, chamar entre chaves! */}
      <img src={logo} alt="AirCnC"/> 

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
