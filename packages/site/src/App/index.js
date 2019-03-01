import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import './index.scss';

const App = function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
    </Router>
  );
};

export default App;
