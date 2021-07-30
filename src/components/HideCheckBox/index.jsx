import Button from 'components/Button';
import React, { Component } from 'react';
import styled from 'styled-components';

const HideBoxContainer = styled(Button.withComponent('div'))`
  font-size: 13px;
  margin-right: 24px;
  padding: 0 12px;

  label {
    display: flex;
    align-items: center;
  }
`;
export default class index extends Component {
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
