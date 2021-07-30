import React, { Component } from 'react';
import styled from 'styled-components';
import * as LSWorker from 'services/localStorageWorker';
import Button from 'components/Button/index';

const BrandContainer = styled.ul`
  display: flex;
  margin-left: 24px;
  margin-top: 24px;

  overflow-x: auto;
  padding: 3px;

  button + button {
    margin-left: 10px;
  }
`;

const CustomButton = styled(Button)`
  background-color: white;
  box-shadow: 2px 2px 4px gray;
  padding: 3px 10px;

  &:hover {
    background-color: black;
    color: white;
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
    this.props.setBrand(target.value);
  };

  render() {
    const { brandClick } = this.props;
    const { brandLists } = this.state;

    return (
      <BrandContainer>
        {brandClick &&
          brandLists &&
          brandLists.map((brand, index) => (
            <CustomButton key={index} onClick={this.handleClick} value={brand}>
              {brand}
            </CustomButton>
          ))}
      </BrandContainer>
    );
  }
}
