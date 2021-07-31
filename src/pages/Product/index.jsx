import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LinkButton from 'components/LinkButton';
import PageTitle from 'components/Text/pageTitle';
import * as LSWorker from 'services/localStorageWorker';
import { getJsonData } from 'utils/getJsonData';
import { getRandomInt } from 'utils/math';
import PAGE_TITLE from 'constants/pageTitle.js';
import ROUTES from 'constants/routesPath.js';
import * as Styles from './styles';

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
    LSWorker.setItemToRecentList(products[id]);
    this._isMounted &&
      this.setState({
        products,
        id,
        isNotInterested: LSWorker.checkAlreadyExistInNotInterested(
          parseInt(id),
        ),
      });
  }

  //id 변경 시 id 변경 감지하여 state update
  //해당 상품 조회 이력 추가
  async componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      const { id } = this.props.match.params;
      this.setState({
        id,
        isNotInterested: LSWorker.checkAlreadyExistInNotInterested(
          parseInt(id),
        ),
      });
      LSWorker.setItemToRecentList(this.state.products[id]);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  checkRandomProduct = () => {
    let randomId = this.state.id;
    while (
      randomId === this.state.id ||
      LSWorker.checkAlreadyExistInNotInterested(parseInt(randomId))
    ) {
      randomId = getRandomInt(0, 100);
    }
    this.props.history.push(`${ROUTES.PRODUCT}/${randomId}`);
  };

  onNotInterestedClick = () => {
    const { id } = this.state;
    LSWorker.setItemToNotInterested(parseInt(id));
    this.setState({
      isNotInterested: LSWorker.checkAlreadyExistInNotInterested(parseInt(id)),
    });
  };

  render() {
    if (!this.state.products[this.state.id]) {
      return <div></div>;
    } else {
      const { id, isNotInterested } = this.state;
      const { title, brand, price } = this.state.products[id];
      return (
        <Styles.ProductContainer>
          <Styles.HeaderContainer>
            <PageTitle title={PAGE_TITLE.PRORUDCT_DETAIL} />
          </Styles.HeaderContainer>
          <Styles.ItemContainer>
            <Styles.Title>{title}</Styles.Title>
            <Styles.Brand>{brand}</Styles.Brand>
            <Styles.Price>
              <strong>{price.toLocaleString()}</strong>원
            </Styles.Price>
            <Styles.ButtonContainer>
              <Styles.RandomProductButton onClick={this.checkRandomProduct}>
                랜덤 상품 조회
              </Styles.RandomProductButton>
              <Styles.NotInterestedButton
                onClick={this.onNotInterestedClick}
                isnotinterested={isNotInterested}
                disabled={isNotInterested}
              >
                {isNotInterested ? '관심 없음' : '관심 없음'}
              </Styles.NotInterestedButton>
            </Styles.ButtonContainer>
          </Styles.ItemContainer>
          <LinkButton title={PAGE_TITLE.RECENT_LIST} to={ROUTES.RECENT_LIST} />
        </Styles.ProductContainer>
      );
    }
  }
}

// NOTE: withRouter 를 써야하는이유는?
export default withRouter(Product);
