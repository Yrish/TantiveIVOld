import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from "./store"
import LoginCard from "./components/loginCard"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Welcom to Tantive IV</h1>
          <hr />
          <LoginCard />
        </div>
      </Provider>
    );
  }
}

export default App;
