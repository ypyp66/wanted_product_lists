import React, { Component } from "react";
import styled from "styled-components";
import CardList from "components/CardList/index";
import PageTitle from "components/Text/pageTitle";
import Button from "components/Button/index";
import LinkButton from "components/LinkButton/index";
import BrandLists from "components/BrandLists/index";
import * as LSWorker from "services/localStorageWorker";

const RecentListContainer = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin-left: 24px;
  margin-top: 24px;
`;

const FilterConatiner = styled(HeaderContainer)`
  display: flex;

  Button + Button {
    margin-left: 20px;
  }
`;

class RecentList extends Component {
  state = {
    products: [],
    filteredProducts: [],
    isChecked: false,
    brandClick: false,
    brand: "",
  };

  componentDidMount() {
    const products = LSWorker.getRecentList();
    // TODO: not-intertest 는 필터링한 다음에 set을 해줘야할까?
    // TODO: 어떻게 커스터마이징
    this.setState({
      products,
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.brand !== "" && prevState.brand === this.state.brand) {
      this.setState({
        brand: "",
        filteredProducts: [],
      });
      return;
    }
    console.log(this.state);
  }

  handleHideExceptItems = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  toggleBrandLists = () => {
    this.setState({ brandClick: !this.state.brandClick });
  };

  setBrand = (name) => {
    this.setState({
      brand: name,
    });
    this.handleFilterBrand(name);
  };

  handleFilterBrand = (name) => {
    this.setState({
      filteredProducts: this.state.products.filter(
        (product) => product.brand === name
      ),
    });
  };

  render() {
    const { isChecked, brandClick, products, filteredProducts } = this.state;
    return (
      <RecentListContainer>
        <HeaderContainer>
          <PageTitle title="최근 조회 이력" />
        </HeaderContainer>
        <FilterConatiner>
          <Button width="80px" onClick={this.toggleBrandLists}>
            브랜드
          </Button>
          <Button>
            <label
              style={{
                display: "flex",
              }}
            >
              <input
                type="checkbox"
                value={isChecked}
                onChange={this.handleHideExceptItems}
              />
              관심 없는 상품 숨기기
            </label>
          </Button>
          <Button width="80px">정렬</Button>
        </FilterConatiner>
        <BrandLists brandClick={brandClick} setBrand={this.setBrand} />

        <CardList
          cards={filteredProducts.length ? filteredProducts : products}
        />
        <LinkButton title="상품 목록" to="/" />
      </RecentListContainer>
    );
  }
}

RecentList.propTypes = {};

export default RecentList;
