import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Product extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    console.log(match.params.id);
  }

  componentDidMount() {
    // const { match } = this.props;
    // console.log(match.params.id);
  }

  render() {
    return <div>product</div>;
  }
}

Product.propTypes = {};

export default withRouter(Product);
