import React, { Component } from 'react';
import styled from 'styled-components';
import CardList from 'components/CardList/index';
import PageTitle from 'components/Text/pageTitle';
import Button from 'components/Button/index';
import LinkButton from 'components/LinkButton/index';
import BrandLists from 'components/BrandLists/index';
import SortFilter from 'components/SortFilter/index.jsx';
import * as LSWorker from 'services/localStorageWorker';
import { sortProductByKey } from 'services/sortProductByKey.js';
import { filterProduct } from 'services/filterProduct.js';

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
  button + button {
    margin-left: 20px;
  }
`;

class RecentList extends Component {
  state = {
    products: [],
    filteredProducts: [],
    brandLists: [],
    isChecked: false,
    brandClick: false,
    brand: '',
    sortKey: '', // '', recent, lowPrice
  };

  componentDidMount() {
    const products = LSWorker.getRecentList();
    this.setState({
      products,
    });
  }

  handleHideExceptItems = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  toggleBrandLists = () => {
    this.setState({ brandClick: !this.state.brandClick });
  };

  setBrand = name => {
    const index = this.state.brandLists.indexOf(name);

    if (index === -1) {
      this.setState({
        brandLists: [...this.state.brandLists, name],
      });
    } else {
      this.setState({
        brandLists: this.state.brandLists.filter((_, idx) => idx !== index),
      });
    }
  };

  handleFilterBrand = () => {
    this.setState({
      filteredProducts: this.state.products.filter(
        product => this.state.brandLists.indexOf(product.brand) !== -1,
      ),
    });
  };

  handleSortChange = sortKey => {
    this.setState({ sortKey });
  };

  render() {
    const { products, isChecked, brandClick, sortKey, brandLists } = this.state;
    const newProducts = sortProductByKey(
      filterProduct(products, isChecked, brandLists),
      sortKey,
    );

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
                display: 'flex',
                width: '100%',
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
          <SortFilter setSortKey={this.handleSortChange} />
        </FilterConatiner>
        <BrandLists brandClick={brandClick} setBrand={this.setBrand} />

        <CardList cards={newProducts} />
        <LinkButton title="상품 목록" to="/" />
      </RecentListContainer>
    );
  }
}

RecentList.propTypes = {};

export default RecentList;
