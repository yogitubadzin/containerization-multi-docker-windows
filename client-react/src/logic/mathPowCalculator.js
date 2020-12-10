import React, { Component } from 'react';
import axios from 'axios';

class MathPowCalculator extends Component {
  state = {
    seenNumbers: [],
    numbersWithCalculations: {},
    number: ''
  };

  componentDidMount() {
    this.fetchAllNumbersWithCalculations();
    this.fetchAllNumbers();
  }

  async fetchAllNumbersWithCalculations() {
    const numbersWithCalculations = await axios.get('/api/numbers/all-with-calculations');
    this.setState({ numbersWithCalculations: numbersWithCalculations.data });
  }

  async fetchAllNumbers() {
    const seenNumbers = await axios.get('/api/numbers/all');
    this.setState({
      seenNumbers: seenNumbers.data
    });
  }

  submit = async event => {
    event.preventDefault();

    await axios.post('/api/numbers', {
      number: this.state.number
    });
    this.setState({ number: '' });
    
    this.fetchAllNumbersWithCalculations();
    this.fetchAllNumbers();
  };

  renderSeenNumbers() {
    return this.state.seenNumbers.map(({ number }) => number).join(', ');
  }

  renderNumbersWithCalculations() {
    const entries = [];

    for (let key in this.state.numbersWithCalculations) {
      entries.push(
        <div key={key}>
          For number {key} I calculated {this.state.numbersWithCalculations[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label>Enter your number:</label>
          <input
            value={this.state.number}
            onChange={event => this.setState({ number: event.target.value })}
          />
          <button>Calculate</button>
        </form>

        <h3>Numbers I have seen:</h3>
        {this.renderSeenNumbers()}

        <h3>Calculated Values:</h3>
        {this.renderNumbersWithCalculations()}
      </div>
    );
  }
}

export default MathPowCalculator;
