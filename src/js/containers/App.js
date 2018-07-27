import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import React, {Component} from 'react';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Latest from '../components/Prediction/Latest';
import Recent from '../components/Prediction/Recent';
import Home from '../pages/Home';
import Post from '../pages/Post';
import config from '../../config';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    fetch(config.endpoints.getPosts())
      .then((res) => res.json())
      .then((posts) => {
        console.dir(posts);
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
    return this.state.posts;
  }
  static getPostBackgroundImg(data) {
    const placeholder = 'images/image_2.jpg';
    const embeddings = data._embedded['wp:featuredmedia'];
    const url = embeddings ? embeddings[0].source_url : placeholder;
    
    return `url(${url})`;
  }
  
  onPostClick = (id) => {
    this.setState({
      selectedPost: id
    });
  };
  
  getPostById(id) {
    if (!this.state.posts) {
      return null;
    }
    
    const filtered = this.state.posts.filter((p) => p.id === id);
    
    return filtered && filtered[0];
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Header/>
            <div className="container">
              <Route exact path="/" render={() => (
                <Home posts={this.state.posts}>
                  <div className="latest-col">
                    {this.arePostsLoaded() ?
                      <Latest
                        data={this.getLatestPost()}
                        getBackgroundImage={App.getPostBackgroundImg}
                        onPostClick={this.onPostClick}
                      /> :
                      <Loader/>}
                  </div>
                  <div className="recents-col">
                    {this.arePostsLoaded() ?
                      this.getRecentPosts().map((p, i) => (
                        <Recent
                          data={p}
                          key={i}
                          getBackgroundImage={App.getPostBackgroundImg}
                          onPostClick={this.onPostClick}
                        />
                      )) :
                      <Loader/>
                    }
                  </div>
                </Home>
              )}/>
              <Route path="/post" render={() => <Post data={this.getPostById(this.state.selectedPost)}/>}/>
            </div>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
};
