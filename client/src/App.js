import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
 constructor(){
   super();
   this.state ={persons: []};
 }

  componentDidMount() {
  fetch('/persons')
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(persons => {
      console.log(persons);
      this.setState({ persons })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Persons</h1>
        {this.state.persons.map(person =>
          <div key={person.id}>name: {person.name}</div>
        )}
      </div>
    );
  }
}

export default App;
