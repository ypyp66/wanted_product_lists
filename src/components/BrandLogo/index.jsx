import React, { Component } from 'react';
import BRAND from 'constants/brand.js';
import { PropTypes } from 'prop-types';
import {
  ChanelIcon,
  GucciIcon,
  LouisVuittonIcon,
  NikeIcon,
  StoneIslandIcon,
} from 'res/svgIcons.js';

class BrandLogo extends Component {
  render() {
    const { brand } = this.props;
    const logos = {
      [BRAND.NIKE]: <NikeIcon />,
      [BRAND.CHANEL]: <ChanelIcon />,
      [BRAND.GUCCI]: <GucciIcon />,
      [BRAND.LOUISVUITTON]: <LouisVuittonIcon />,
      [BRAND.STONEISLAND]: <StoneIslandIcon />,
    };
    return logos[brand] || <div>??</div>;
  }
}

BrandLogo.propTypes = {
  brand: PropTypes.string,
};

export default BrandLogo;
