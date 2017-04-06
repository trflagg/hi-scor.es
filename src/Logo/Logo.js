import React from 'react';
import logoImage from './logotransparent640.png';
import './Logo.css';

function Logo({ width, top, left }) {

      const style = {
        width: width,
        top: top,
        left: left,
        position: "absolute",
    }

    return (
      <div className="Logo">
        <img src={logoImage} className="pulse" style={style} alt="hiscores" />
      </div>
    );

}

export default Logo;
