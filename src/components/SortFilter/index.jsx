import Button from 'components/Button';
import React, { Component } from 'react';
import styled from 'styled-components';

// 1. noValue => 정렬 초기화
// 2. recent => 조회순으로 정렬
// 3. lowPrice => 낮은 가격순 정렬

const SortedFilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 300px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
`;

const RecentButton = styled(Button)``;
const PriceASCButton = styled(Button)``;
class SortFilter extends Component {
  handleClick = e => {
    const { handleSortChange, closeModal } = this.props;
    handleSortChange(e.target.value);
    closeModal();
  };
  render() {
    return (
      <SortedFilterContainer>
        <RecentButton onClick={this.handleClick} value="recent">
          최근 조회 순
        </RecentButton>
        <PriceASCButton onClick={this.handleClick} value="lowPrice">
          낮은 가격 순
        </PriceASCButton>
      </SortedFilterContainer>
    );
  }
}

export default SortFilter;
