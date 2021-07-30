import React, { Component, createRef } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  background-color: rgba(200, 200, 200, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
  }
  handleClick = e => {
    if (e.target === this.modalRef.current) {
      this.props.closeModal();
    }
  };
  render() {
    const { show } = this.props;
    return (
      <ModalContainer
        ref={this.modalRef}
        onClick={this.handleClick}
        show={show}
      >
        {this.props.children}
      </ModalContainer>
    );
  }
}
