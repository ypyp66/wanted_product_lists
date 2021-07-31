import Button from 'components/Button';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

SortFilter.propTypes = {
  handleSortChange: PropTypes.func,
  closeModal: PropTypes.func,
};

export default SortFilter;
