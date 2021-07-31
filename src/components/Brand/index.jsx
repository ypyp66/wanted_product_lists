import React, { Component } from 'react';
import styled from 'styled-components';
import BrandLogo from '../BrandLogo/index';
import { PropTypes } from 'prop-types';

class Brand extends Component {
  render() {
    const { brand } = this.props;
    return (
      <BrandContainer>
        <BrandLogo brand={brand} />
        <BrandName>{brand}</BrandName>
      </BrandContainer>
    );
  }
}

Brand.propTypes = {
  brand: PropTypes.string,
};

export default Brand;

const BrandName = styled.span`
  margin: 0;
  margin-left: 4px;
  font-size: 12px;
  color: #2d2d2d;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
`;
