import React, { Component } from 'react';
import './App.css';

import Comment from './pages/comment/comment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Comment />
      </div>
    );
  }
}

export default App;
