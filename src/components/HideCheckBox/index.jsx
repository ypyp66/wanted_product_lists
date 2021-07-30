import Button from 'components/Button';
import React, { Component } from 'react';
import styled from 'styled-components';
import SortFilter from 'components/SortFilter/index.jsx';

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
`;
const CheckButton = styled(Button)`
  margin-right: 24px;
  padding: 0 12px;
`;
export default class index extends Component {
  render() {
    const { isChecked, handleHideExceptItems } = this.props;
    return (
      <CenterDiv>
        <CheckButton>
          <CenterDiv>
            <label>
              <input
                type="checkbox"
                value={isChecked}
                onChange={handleHideExceptItems}
              />
              관심 없는 상품 숨기기
            </label>
          </CenterDiv>
        </CheckButton>
        <SortFilter setSortKey={this.handleSortChange} />
      </CenterDiv>
    );
  }
}
