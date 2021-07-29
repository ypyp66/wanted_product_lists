import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class PageTitle extends Component {
  render() {
    const { title } = this.props;
    return <TitleText>{title}</TitleText>;
  }
}

PageTitle.propTypes = {
  title: PropTypes.string,
};

const TitleText = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export default PageTitle;
