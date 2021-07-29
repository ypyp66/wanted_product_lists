import React, { Component } from 'react';
import CardList from '../components/CardList/index';

class Home extends Component {
  state = {
    products: [],
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/data/productList.json');
    const products = await response.json();
    this.setState({
      products,
    });
  }

  render() {
    return <CardList cards={this.state.products} />;
  }
}

Home.propTypes = {};

export default Home;
