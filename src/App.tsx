import React from 'react';
import './App.scss';
import AppHeader from "./components/Header";

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <AppHeader/>
      </div>
    );
  }
}

export default App;
