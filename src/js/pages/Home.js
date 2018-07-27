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
          console.log(posts);
          this.setState({
            posts
          });
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
    static getPostBackgroundImg(data) {
      const placeholder = 'images/image_2.jpg';
      const embeddings = data._embedded['wp:featuredmedia'];
      const url = embeddings ? embeddings[0].source_url : placeholder;
      
      return `url(${url})`;
    }
    render() {
        return (
          <div className="container">
            <h4 className="recent-predictions-header">Recent Predictions:</h4>
    
            <div className="predictions-list">
              <div className="latest-col">
                {this.arePostsLoaded() ?
                  <Latest
                    data={this.getLatestPost()}
                    getBackgroundImage={Home.getPostBackgroundImg}/> :
                  <Loader/>}
              </div>
              <div className="recents-col">
                {this.arePostsLoaded() ?
                  this.getRecentPosts().map((p, i) => (
                    <Recent data={p} key={i} getBackgroundImage={Home.getPostBackgroundImg} />
                  )) :
                  <Loader/>
                }
              </div>
            </div>
          </div>
        );
    }
}
