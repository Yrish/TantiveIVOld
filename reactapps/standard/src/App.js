import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from "./store"
import LoginCard from "./components/loginCard"
import {socketSetup} from "./helpers/webSocketManager"

class App extends Component {

  componentWillMount() {
    socketSetup()
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1>Welcome to Tantive IV</h1>
          <hr />
          <LoginCard />
        </div>
      </Provider>
    );
  }
}

export default App;
