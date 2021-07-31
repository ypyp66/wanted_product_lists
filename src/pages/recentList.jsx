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
import SortFilter from 'components/SortFilter';
import PAGE_TITLE from 'constants/pageTitle.js';
import ROUTES from 'constants/routesPath.js';
import Modal from 'Modals/Modal';

const RecentListContainer = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin: 24px 24px 0 24px;
`;

const CustomButton = styled(Button)`
  min-width: 80px;
`;

const FilterContainer = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;

  button + button {
    margin-left: 20px;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

class RecentList extends Component {
  _isMounted = false;

  state = {
    products: [],
    selectedBrands: [],
    isChecked: false,
    brandClick: false,
    brand: '',
    sortKey: 'recent',
    isModalShow: false,
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
    const { isChecked, brandClick, selectedBrands, sortKey } = this.state;
    const products = this.filterProducts();

    return (
      <RecentListContainer>
        <HeaderContainer>
          <PageTitle title={PAGE_TITLE.RECENT_LIST} />
        </HeaderContainer>
        <FilterContainer>
          <CustomButton onClick={this.toggleBrandLists}>브랜드</CustomButton>
          <div>
            <HideCheckBox
              isChecked={isChecked}
              handleHideExceptItems={this.handleHideExceptItems}
            />
            <Button onClick={() => this.setState({ isModalShow: true })}>
              {sortKey === 'recent' ? '최근 조회 순' : '낮은 가격 순'}
            </Button>
          </div>
        </FilterContainer>
        <BrandLists
          brandClick={brandClick}
          setSelectedBrands={this.setSelectedBrands}
          selectedBrand={selectedBrands}
        />
        <CardList cards={products} />
        <LinkButton title={PAGE_TITLE.HOME} to={ROUTES.HOME} />
        <Modal
          show={this.state.isModalShow}
          closeModal={() => this.setState({ isModalShow: false })}
        >
          <SortFilter
            handleSortChange={this.handleSortChange}
            closeModal={() => this.setState({ isModalShow: false })}
          />
        </Modal>
      </RecentListContainer>
    );
  }
}

export default RecentList;
