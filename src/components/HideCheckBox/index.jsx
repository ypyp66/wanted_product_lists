import Button from 'components/Button';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HideBoxContainer = styled(Button.withComponent('div'))`
  min-width: 180px;
  font-size: 13px;
  margin-right: 24px;
  padding: 0 12px;
  justify-content: center;

  label {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }
`;

export default class HideCheckBox extends Component {
  render() {
    const { isChecked, handleHideExceptItems } = this.props;
    return (
      <HideBoxContainer>
        <label>
          <input
            type="checkbox"
            value={isChecked}
            onChange={handleHideExceptItems}
          />
          관심 없는 상품 숨기기
        </label>
      </HideBoxContainer>
    );
  }
}

HideCheckBox.propTypes = {
  isChecked: PropTypes.bool,
  handleHideExceptItems: PropTypes.func,
};
