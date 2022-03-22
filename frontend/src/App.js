import { Component } from 'react';
import Login from './Login';
import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="title">
          <h2 className="App-title">Homepage</h2>
        </header>
        <p className="App-intro">
          sign in with facebook
        </p>
        <Login />

      </div>
    );
  }
}
export default App;