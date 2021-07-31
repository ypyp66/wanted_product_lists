import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LinkButton from 'components/LinkButton';
import PageTitle from 'components/Text/pageTitle';
import {
  checkAlreadyExistInNotInterested,
  setItemToNotInterested,
  setItemToRecentList,
} from 'services/localStorageWorker';
import { getJsonData } from 'utils/getJsonData';
import { getRandomInt } from 'utils/math';
import PAGE_TITLE from 'constants/pageTitle.js';
import ROUTES from 'constants/routesPath.js';
import {
  ProductContainer,
  HeaderContainer,
  ItemContainer,
  Title,
  Brand,
  Price,
  ButtonContainer,
  RandomProductButton,
  NotInterestedButton,
} from './styles';

class Product extends Component {
  _isMounted = false;

  state = {
    products: [],
    id: null,
    isNotInterested: false,
  };

  //products와 id 모두 받아와서 state에 저장
  //해당 상품 조회 이력 추가
  async componentDidMount() {
    this._isMounted = true;
    const products = await getJsonData();
    const { id } = this.props.match.params;
    setItemToRecentList(products[id]);
    this._isMounted &&
      this.setState({
        products,
        id,
        isNotInterested: checkAlreadyExistInNotInterested(parseInt(id)),
      });
  }

  //id 변경 시 id 변경 감지하여 state update
  //해당 상품 조회 이력 추가
  async componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      const { id } = this.props.match.params;
      this.setState({
        id,
        isNotInterested: checkAlreadyExistInNotInterested(parseInt(id)),
      });
      setItemToRecentList(this.state.products[id]);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  checkRandomProduct = () => {
    let randomId = this.state.id;
    while (
      randomId === this.state.id ||
      checkAlreadyExistInNotInterested(parseInt(randomId))
    ) {
      randomId = getRandomInt(0, 100);
    }
    this.props.history.push(`${ROUTES.PRODUCT}/${randomId}`);
  };

  onNotInterestedClick = () => {
    const { id } = this.state;
    setItemToNotInterested(parseInt(id));
    this.setState({
      isNotInterested: checkAlreadyExistInNotInterested(parseInt(id)),
    });
  };

  render() {
    if (!this.state.products[this.state.id]) {
      return <div></div>;
    } else {
      const { id, isNotInterested } = this.state;
      const { title, brand, price } = this.state.products[id];
      return (
        <ProductContainer>
          <HeaderContainer>
            <PageTitle title={PAGE_TITLE.PRORUDCT_DETAIL} />
          </HeaderContainer>
          <ItemContainer>
            <Title>{title}</Title>
            <Brand>{brand}</Brand>
            <Price>
              <strong>{price.toLocaleString()}</strong>원
            </Price>
            <ButtonContainer>
              <RandomProductButton onClick={this.checkRandomProduct}>
                랜덤 상품 조회
              </RandomProductButton>
              <NotInterestedButton
                onClick={this.onNotInterestedClick}
                isnotinterested={isNotInterested}
                disabled={isNotInterested}
              >
                {isNotInterested ? '관심 없음' : '관심 없음'}
              </NotInterestedButton>
            </ButtonContainer>
          </ItemContainer>
          <LinkButton title={PAGE_TITLE.RECENT_LIST} to={ROUTES.RECENT_LIST} />
        </ProductContainer>
      );
    }
  }
}

// NOTE: withRouter 를 써야하는이유는?
export default withRouter(Product);
