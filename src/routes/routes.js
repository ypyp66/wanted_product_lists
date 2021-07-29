import { HashRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import Home from 'pages/Home';
import Product from 'pages/Product';
import RecentList from 'pages/recentList.jsx';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/product/:id'>
          <Product />
        </Route>
        <Route exact path='/recentList'>
          <RecentList />
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
