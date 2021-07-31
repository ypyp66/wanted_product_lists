import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { ModalDeemed } from './styles';

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
      <ModalDeemed ref={this.modalRef} onClick={this.handleClick} show={show}>
        {this.props.children}
      </ModalDeemed>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func,
};
