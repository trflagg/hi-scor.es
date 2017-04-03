import React, { Component } from 'react';
import logoImage from './logotransparent640.png';
import './Logo.css';

class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <img src={logoImage} alt="hiscores" />
      </div>
    );
  }
}

export default Logo;
