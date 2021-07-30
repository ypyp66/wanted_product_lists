import React, { Component } from 'react';
import styled from 'styled-components';
import CardList from 'components/CardList/index';
import PageTitle from 'components/Text/pageTitle';
import Button from 'components/Button/index';
import LinkButton from 'components/LinkButton/index';
import { getJsonData } from 'utils/getJsonData';
import PAGE_TITLE from 'constants/pageTitle.js';

const HomeContainer = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin-left: 24px;
  margin-top: 24px;
`;

class Home extends Component {
  _isMounted = false;

  state = {
    products: [],
  };

  async componentDidMount() {
    this._isMounted = true;
    const products = await getJsonData();
    // TODO: not-intertest 는 필터링한 다음에 set을 해줘야할까?
    // TODO: 어떻게 커스터마이징
    this._isMounted &&
      this.setState({
        products,
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <HomeContainer>
        <HeaderContainer>
          <PageTitle title={PAGE_TITLE.HOME} />
        </HeaderContainer>

        <CardList cards={this.state.products} />
        <LinkButton title={PAGE_TITLE.RECENT_LIST} to="/recentList" />
      </HomeContainer>
    );
  }
}

Home.propTypes = {};

export default Home;
