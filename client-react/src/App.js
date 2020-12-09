import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MathPowCalculator from './logic/mathPowCalculator';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Math Power Calculator</h1>
          </header>
          <div>
            <Route exact path="/" component={MathPowCalculator} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
