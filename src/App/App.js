import React, { Component } from 'react';
import LogoContainer from '../Logo/LogoContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAvailable: false,
    };
    this.boundLogoClicked = this.logoClicked.bind(this);
  }

  logoClicked (event) {
    // for performance reasons, only setState the first time
    if (!this.state.menuAvailable) {
      this.setState({ menuAvailable: true });
    }
  }

  render() {
    return (
      <div className="App">
        <LogoContainer
          menuAvailable={this.state.menuAvailable}
          onClick={this.boundLogoClicked}
        />
      </div>
    );
  }
}

export default App;
