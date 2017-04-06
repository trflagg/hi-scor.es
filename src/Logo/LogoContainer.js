import React, { Component } from 'react';
import Logo from './Logo';

class LogoContainer extends Component {
  render() {
    const height = window.innerHeight;
    const width = window.innerWidth;

    let logoWidth = 0;
    let logoTop = 0;
    let logoLeft = 0;

    // position of logo depends on menu availability
    if (!this.props.menuAvailable) {
      logoWidth = Math.min( Math.max(width * 0.35, 336), 448) ;
      logoTop = Math.max((height * 0.375 - 200), 0);
      logoLeft = width * 0.05;
    } else {
      logoWidth = 300;
      logoTop = 10;
      logoLeft = 72;
    }

    return (
      <Logo width={logoWidth}
        top={logoTop}
        left={logoLeft}
        onClick={this.props.onClick}
      />
    );
  }
}

LogoContainer.propTypes = {
  menuAvailable: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

LogoContainer.defaultProps = {
  menuAvailable: false,
  onClick: () => {},
};

export default LogoContainer;
