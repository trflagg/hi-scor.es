import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import './App.css';

class App extends Component {
  render() {

    const height = window.innerHeight;
    const width = window.innerWidth;

    const logoWidth = Math.min( Math.max(width * 0.35, 336), 448) ;
    const logoTop = Math.max((height * 0.375 - 200), 0);
    const logoLeft = width * 0.05;

    return (
      <div className="App">
        <Logo width={logoWidth}
          top={logoTop}
          left={logoLeft}
        />
      </div>
    );
  }
}

export default App;
