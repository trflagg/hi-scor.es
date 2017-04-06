import React from 'react';
import logoImage from './logotransparent640.png';
import './Logo.css';

function Logo({ width, top, left, pulse, onClick }) {

      const style = {
        width: width,
        top: top,
        left: left,
        position: "absolute",
    }

    return (
      <div>
        <img src={logoImage}
          className={"Logo " + (pulse ? "pulse" : "")}
          style={style}
          alt="hiscores"
          onClick={onClick}
        />
      </div>
    );

}

export default Logo;
