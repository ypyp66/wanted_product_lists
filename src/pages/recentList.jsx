import React, { Component } from 'react';
import styled from 'styled-components';
import CardList from 'components/CardList/index';
import PageTitle from 'components/Text/pageTitle';
import Button from 'components/Button/index';
import LinkButton from 'components/LinkButton/index';
import BrandLists from 'components/BrandLists/index';

import HideCheckBox from 'components/HideCheckBox/index';
import * as LSWorker from 'services/localStorageWorker';
import { sortProductByKey } from 'services/sortProductByKey.js';

const RecentListContainer = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin: 24px 24px 0 24px;
`;

const FilterContainer = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;

  button + button {
    margin-left: 20px;
  }
`;

const CheckButton = styled(Button)`
  margin-right: 24px;
  padding: 0 12px;
`;

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
`;

class RecentList extends Component {
  _isMounted = false;

  state = {
    products: [],
    selectedBrands: [],
    isChecked: false,
    brandClick: false,
    brand: '',
    sortKey: '',
  };

  componentDidMount() {
    this._isMounted = true;
    const products = LSWorker.getRecentList();

    this._isMounted &&
      this.setState({
        products,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleHideExceptItems = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  toggleBrandLists = () => {
    this.setState({ brandClick: !this.state.brandClick });
  };

  setSelectedBrands = name => {
    const index = this.state.selectedBrands.indexOf(name);

    if (name === 'all') {
      this.setState({
        selectedBrands: [],
      });
      this.filterProducts();
      return;
    }
    if (index === -1) {
      this.setState({
        selectedBrands: [...this.state.selectedBrands, name],
      });
    } else {
      this.setState({
        selectedBrands: this.state.selectedBrands.filter(
          (_, idx) => idx !== index,
        ),
      });
    }
  };

  handleSortChange = sortKey => {
    this.setState({ sortKey });
  };

  filterProducts = () => {
    const { products, isChecked, sortKey, selectedBrands } = this.state;
    const notInterested = LSWorker.getNotInterested();

    return sortProductByKey(
      products
        .filter(product =>
          !isChecked ? product : !notInterested.includes(product.id),
        )
        .filter(product =>
          !selectedBrands.length
            ? product
            : selectedBrands.includes(product.brand),
        ),
      sortKey,
    );
  };

  render() {
    const { isChecked, brandClick, selectedBrands } = this.state;
    const products = this.filterProducts();

    return (
      <RecentListContainer>
        <HeaderContainer>
          <PageTitle title="최근 조회 이력" />
        </HeaderContainer>
        <FilterContainer>
          <Button width="80px" onClick={this.toggleBrandLists}>
            브랜드
          </Button>
          <HideCheckBox
            isChecked={isChecked}
            handleHideExceptItems={this.handleHideExceptItems}
          />
        </FilterContainer>
        <BrandLists
          brandClick={brandClick}
          setSelectedBrands={this.setSelectedBrands}
          selectedBrand={selectedBrands}
        />

        <CardList cards={products} />
        <LinkButton title="상품 목록" to="/" />
      </RecentListContainer>
    );
  }
}

RecentList.propTypes = {};

export default RecentList;
