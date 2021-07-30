import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button from 'components/Button';
import LinkButton from 'components/LinkButton';
import PageTitle from 'components/Text/pageTitle';
import {
  checkAlreadyExistInNotInterested,
  setItemToNotInterested,
  setItemToRecentList,
} from 'services/localStorageWorker';
import { getJsonData } from 'utils/getJsonData';
import { getRandomInt } from 'utils/math';

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
    this._isMounted && this.setState({
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

  componentWillUnmount(){
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
    this.props.history.push(`/product/${randomId}`);
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
      return <div>Loading</div>;
    } else {
      const { id, isNotInterested } = this.state;
      const { title, brand, price } = this.state.products[id];
      return (
        <ProductContainer>
          <HeaderContainer>
            <PageTitle title="상품 상세 페이지" />
          </HeaderContainer>
          <ItemContainer>
            <Title>{title}</Title>
            <Brand>{brand}</Brand>
            <Price>
              <strong>{price}</strong>원
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
          <LinkButton title="조회 이력" to="/recentList" />
        </ProductContainer>
      );
    }
  }
}

Product.propTypes = {};

// NOTE: withRouter 를 써야하는이유는?
export default withRouter(Product);

const ProductContainer = styled.div`
  max-width: 1080px;
  min-height: 100vh - 24px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin-left: 24px;
  margin-top: 24px;
`;

const ItemContainer = styled.div`
  width: 50%;
  padding: 5%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 5%;
  h2,
  h3,
  h4 {
    margin-bottom: 5%;
  }
  margin: 5% auto;
`;

const Title = styled.h2`
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  font-size: 26px;
  line-height: 36px;
  height: 72px;
  max-height: 72px;
  /* -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
`;

const Brand = styled.h4`
  font-size: 16px;
  color: #2d2d2d;
`;

const Price = styled.h3`
  font-size: 18px;
  strong {
    font-weight: 600;
    font-size: 20px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const RandomProductButton = styled(Button)`
  width: 100px;
  background-color: white;
  margin-top: 24px;
  box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
`;
const NotInterestedButton = styled(Button)`
  width: 100px;
  margin-top: 24px;
  background-color: white;
  ${props =>
    props.isnotinterested
      ? css`
          color: darkgray;
          cursor: default;
          box-shadow: inset 5px 5px 10px #d9d9d9, inset -5px -5px 10px #ffffff;
        `
      : css`
          box-shadow: 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff;
        `};
`;
