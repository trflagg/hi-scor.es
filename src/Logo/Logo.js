import React from 'react';
import logoImage from './logotransparent640.png';
import './Logo.css';

function Logo({ width, top, left, onClick }) {

      const style = {
        width: width,
        top: top,
        left: left,
        position: "absolute",
    }

    return (
      <div>
        <img src={logoImage}
          className={"Logo pulse"}
          style={style}
          alt="hiscores"
          onClick={onClick}
        />
      </div>
    );

}

export default Logo;
