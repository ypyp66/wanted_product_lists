import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'components/Button/index.jsx';
import { Link } from 'react-router-dom';

const LinkButtonContainer = styled(Button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 80px;
`;

class LinkButton extends Component {
  render() {
    return (
      <Link to={this.props.to}>
        <LinkButtonContainer>{this.props.title}</LinkButtonContainer>
      </Link>
    );
  }
}

LinkButton.propTypes = {};

export default LinkButton;
