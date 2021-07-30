import { HashRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Home from 'pages/Home';
import Product from 'pages/Product';
import RecentList from 'pages/recentList.jsx';
import ROUTES from 'constants/routesPath.js';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route exact path={`${ROUTES.PRODUCT}/:id`}>
          <Product />
        </Route>
        <Route exact path={ROUTES.RECENT_LIST}>
          <RecentList />
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
