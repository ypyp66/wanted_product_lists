import React, { Component } from 'react';
import CardList from 'components/CardList/index';
import PageTitle from 'components/Text/pageTitle';
import Button from 'components/Button/index';
import LinkButton from 'components/LinkButton/index';
import BrandLists from 'components/BrandLists/index';
import HideCheckBox from 'components/HideCheckBox/index';
import SortFilter from 'components/SortFilter';
import Modal from 'Modals';
import * as LSWorker from 'services/localStorageWorker';
import { sortProductByKey } from 'services/sortProductByKey.js';
import ROUTES from 'constants/routesPath.js';
import PAGE_TITLE from 'constants/pageTitle.js';
import SORT_KEY from 'constants/sortKey.js';
import {
  RecentListContainer,
  HeaderContainer,
  FilterContainer,
  CustomButton,
} from './styles';

class RecentList extends Component {
  _isMounted = false;

  state = {
    products: [],
    selectedBrands: [],
    isChecked: false,
    brandClick: false,
    brand: '',
    sortKey: SORT_KEY.RECENT,
    isModalShow: false,
  };

  componentDidMount() {
    this._isMounted = true;
    const products = LSWorker.getRecentList();
    this._isMounted && this.setState({ products });
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

  handleSortChange = sortKey => {
    this.setState({ sortKey });
  };

  handleCloseModal = () => {
    this.setState({ isModalShow: false });
  };

  setSelectedBrands = name => {
    const { selectedBrands } = this.state;
    let newSelectedBrands;
    if (name === 'all') {
      newSelectedBrands = [];
    } else if (!selectedBrands.includes(name)) {
      newSelectedBrands = [...selectedBrands, name];
    } else {
      newSelectedBrands = selectedBrands.filter(brand => brand !== name);
    }
    this.setState({ selectedBrands: newSelectedBrands });
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
              {sortKey === SORT_KEY.RECENT ? '최근 조회 순' : '낮은 가격 순'}
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
        <Modal show={this.state.isModalShow} closeModal={this.handleCloseModal}>
          <SortFilter
            handleSortChange={this.handleSortChange}
            closeModal={this.handleCloseModal}
          />
        </Modal>
      </RecentListContainer>
    );
  }
}

export default RecentList;
