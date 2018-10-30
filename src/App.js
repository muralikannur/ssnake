import React, { Component } from 'react';
import './App.css';
import { Sidebar } from "./containers/Sidebar"
import { Board } from "./containers/Board"

class App extends Component {
  render() {
    return (
      <div id="container">
        <Sidebar />
        <section id="main">
          <Board />
        </section>
      </div>
    );
  }
}

export default App;
