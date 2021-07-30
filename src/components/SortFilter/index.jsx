import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  float: right;
  height: fit-content;
`;

// 1. noValue => 정렬 초기화
// 2. recent => 조회순으로 정렬
// 3. lowPrice => 낮은 가격순 정렬

class SortFilter extends Component {
  render() {
    return (
      <StyledSelect
        onChange={({ target }) => this.props.setSortKey(target.value)}
      >
        <option value="">&nbsp; -- 정렬 --</option>
        <option value="recent">최근 조회순</option>
        <option value="lowPrice">낮은 가격순</option>
      </StyledSelect>
    );
  }
}

export default SortFilter;
