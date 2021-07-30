import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as LSWorker from 'services/localStorageWorker';
import Button from 'components/Button';

const BrandContainer = styled.ul`
  display: inline-block;
  margin-left: 24px;
  margin-top: 24px;

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
  padding: 3px 10px;

  ${props =>
    props.isselected
      ? css`
          color: black;
          box-shadow: inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff;
        `
      : css`
          box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
        `};
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
    this.props.setBrand(target.value);
  };

  render() {
    const { brandClick, selectedBrand } = this.props;
    const { brandLists } = this.state;

    return (
      <BrandContainer>
        {brandClick &&
          brandLists &&
          brandLists.map((brand, index) => (
            <CustomButton
              key={index}
              isselected={selectedBrand.includes(brand)}
              onClick={this.handleClick}
              value={`${brand}`}
            >
              {brand}
            </CustomButton>
          ))}
      </BrandContainer>
    );
  }
}
