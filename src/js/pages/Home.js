import React, {Component} from 'react';

import Loader from '../components/Loader';
import Latest from '../components/Prediction/Latest';
import Recent from '../components/Prediction/Recent';
import config from '../../config';

export default class Home extends Component {
    constructor() {
      super();
      this.state = {};
    }
    componentDidMount() {
      fetch(config.endpoints.getPosts())
        .then((res) => res.json())
        .then((posts) => {
          this.setState({
            posts
          });
          // posts = data;
          // updateLatestCard( getLastPost(posts) );
          // updateRecentCards(getRecentPosts(posts));
          // initTooltips();
          // window.setTimeout(showCards, 0);
        });
    }
    getLatestPost() {
      return this.state.posts[0];
    }
    getRecentPosts() {
      return this.state.posts.slice(1);
    }
    arePostsLoaded() {
      return typeof this.state.posts !== 'undefined';
    }
    render() {
        return (
          <div className="container">
            <h4 className="recent-predictions-header">Recent Predictions:</h4>
    
            <div className="predictions-list">
              <div className="latest-col">
                {this.arePostsLoaded() ? <Latest data={this.getLatestPost()}/> : <Loader/>}
              </div>
              <div className="recents-col">
                {this.arePostsLoaded() ?
                  this.getRecentPosts().map((p, i) => <Recent data={this.getLatestPost()} key={i} />) :
                  <Loader/>
                }
              </div>
            </div>
          </div>
        );
    }
}
