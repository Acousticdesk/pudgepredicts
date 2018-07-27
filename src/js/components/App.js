import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import React from 'react';

import Header from './Header';
import Home from '../pages/Home';
import Post from '../pages/Post';

export default () => {
  console.log('running');
  return (
    <React.Fragment>
      <Header/>
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/post" component={Post}/>
        </div>
      </Router>
    </React.Fragment>
  );
};
