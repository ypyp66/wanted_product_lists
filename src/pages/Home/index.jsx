import React, { Component } from 'react';
import CardList from 'components/CardList/index';
import PageTitle from 'components/Text/pageTitle';
import LinkButton from 'components/LinkButton/index';
import { getJsonData } from 'utils/getJsonData';
import PAGE_TITLE from 'constants/pageTitle.js';
import ROUTES from 'constants/routesPath.js';
import { getNotInterested } from 'services/localStorageWorker';
import { HomeContainer, HeaderContainer } from './styles';

class Home extends Component {
  _isMounted = false;

  state = {
    products: [],
  };

  async componentDidMount() {
    this._isMounted = true;
    const notInterested = getNotInterested();
    const products = await getJsonData();
    this._isMounted &&
      this.setState({
        products: products.filter(
          product => !notInterested.includes(product.id),
        ),
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
        <LinkButton title={PAGE_TITLE.RECENT_LIST} to={ROUTES.RECENT_LIST} />
      </HomeContainer>
    );
  }
}

export default Home;
