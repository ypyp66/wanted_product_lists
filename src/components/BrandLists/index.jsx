import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as LSWorker from 'services/localStorageWorker';
import Button from 'components/Button';

const BrandContainer = styled.ul`
  display: inline-block;
  margin-left: 24px;
  margin-top: 14px;

  overflow-x: auto;
  padding-bottom: 12px;
  padding-right: 12px;

  button + button {
    margin-left: 10px;
  }
`;

const CustomButton = styled(Button)`
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 4px gray;
  padding: 3px 10px;

  ${props =>
    props.isselected &&
    css`
      background-color: black;
      color: white;
    `}

  &:hover {
    background-color: #e3e3e3;
    color: black;
  }

  & + & {
    margin-top: 10px;
  }
`;

export default class index extends Component {
  state = {
    brandLists: [],
  };

  componentDidMount() {
    //중복처리
    this.setState({
      brandLists: [
        ...new Set(LSWorker.getRecentList().map(items => items.brand)),
      ],
    });
  }

  handleClick = ({ target }) => {
    this.props.setSelectedBrands(target.value);
  };

  render() {
    const { brandClick, selectedBrand } = this.props;
    const { brandLists } = this.state;

    return (
      <BrandContainer>
        {brandClick && brandLists && (
          <>
            <CustomButton
              onClick={this.handleClick}
              isselected={selectedBrand.length ? false : true}
              value="all"
            >
              전체 목록
            </CustomButton>
            {brandLists.map((brand, index) => (
              <CustomButton
                key={index}
                onClick={this.handleClick}
                value={brand}
                isselected={selectedBrand.includes(brand)}
              >
                {brand}
              </CustomButton>
            ))}
          </>
        )}
      </BrandContainer>
    );
  }
}
