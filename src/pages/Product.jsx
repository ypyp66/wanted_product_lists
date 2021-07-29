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

// NOTE: withRouter 를 써야하는이유는?
export default withRouter(Product);
