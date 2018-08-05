import { HashRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Latest from '../components/Prediction/Latest';
import Recent from '../components/Prediction/Recent';
import Home from '../pages/Home';
import Post from '../pages/Post';
import config from '../../config';

const HATS_CATEGORY = 1;

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.sidenav');
      const instances = M.Sidenav.init(elems);
    });
  
    
    fetch(config.endpoints.getPosts('&tags=2'), {
      method: 'GET',
      body: {
        tags: ['top']
      }
    })
      .then((res) => res.json())
      .then((best) => {
        this.setState((prevState) => ({
          posts: {
            ...prevState.posts,
            best
          }
        }));
      });
  
    this.fetchLatestPosts();
    
    fetch(config.endpoints.getCategories())
      .then((res) => res.json())
      .then((categories) => {
        this.setState({
          categories
        });
      });
    
    fetch(config.endpoints.getPosts(`&categories=${HATS_CATEGORY}`))
      .then((res) => res.json())
      .then((hats) => {
        this.setState({
          hats
        })
      });
  
    fetch(config.endpoints.getPosts(`&categories=${HATS_CATEGORY}`))
      .then((res) => res.json())
      .then((hatsPosts) => {
        this.setState({
          hatsPosts
        })
      })
  }
  fetchLatestPosts(categoryId) {
    fetch(config.endpoints.getPosts(categoryId ? `&categories=${categoryId}` : ''), {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((recents) => {
        const filtered = recents.filter((c) => !c.categories.includes(HATS_CATEGORY));
        this.setState((prevState) => ({
          posts: {
            ...prevState.posts,
            recents: filtered
          }
        }));
      });
  }
  getBestPost() {
    if (!this.state.posts || !this.state.posts.best) {
      return null;
    }
    return this.state.posts.best[0];
  }
  getBestsPosts() {
    if (!this.state.posts || !this.state.posts.best || !this.state.posts.best) {
      return null;
    }
    return this.state.posts.best.slice(1);
  }
  
  getRecentPosts = () => {
    if (!this.state.posts) {
      return null;
    }
    return this.state.posts.recents;
  };
  
  static getPostBackgroundImg(data, getImgEl) {
    if (!data) {
      return null;
    }
    
    const placeholder = 'images/image_2.jpg';
    const embeddings = data._embedded['wp:featuredmedia'];
    const url = embeddings && embeddings[0].source_url;
    
    if (!getImgEl) {
      return `url(${url || placeholder})`;
    }
    
    return <img src={url}/>
  }
  
  getPostById = (id) => {
    if (!this.state.posts || !this.state.posts.best || !this.state.posts.recents) {
      return null;
    }
    
    const idInt = window.parseInt(id);
    const filtered = this.state.posts.recents.filter((p) => p.id === idInt);
    
    if (filtered && filtered[0]) {
      return filtered[0];
    } else if (this.state.hatsPosts) {
      const hatsFiltered = this.state.hatsPosts.filter((p) => {
        return p.id === idInt;
      });
      return hatsFiltered && hatsFiltered[0];
    }
  };
  
  onChooseCategory = (id) => {
    this.fetchLatestPosts(id);
  };
  
  getPostTitle(title) {
    return title.replace(/keff:\d+(:?\.\d+)?/, '');
  }
  
  getPostKeff(title) {
    const matches = title.match(/keff:(\d+(?:\.\d+)?)/);
    return matches ? matches[1] : '-';
  }
  
  render() {
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Header/>
            <ul id="slide-out" className="sidenav">
              <li>
                <div className="activities">
                  <h5>Забирай свою шмотку:</h5>
                  <ul className="collection">
                    {
                      this.state.hats
                        ?
                        this.state.hats.map((h) => {
                          return <li key={h.id} className="collection-item">
                            <Link to={`/post/${h.id}`}>{this.getPostTitle(h.title.rendered)}</Link>
                          </li>;
                        })
                        : <Loader/>
                    }
                  </ul>
                </div>
              </li>
            </ul>
            <div className="container">
              <div className="row">
                <div className="col m9 s12">
                  <Route exact path="/" render={() => (
                    <Home getRecentPredictions={this.getRecentPosts} getPostTitle={this.getPostTitle} getPostKeff={this.getPostKeff}>
                      <div className="latest-col">
                        {this.getBestPost() ?
                          <Latest
                            data={this.getBestPost()}
                            getBackgroundImage={App.getPostBackgroundImg}
                            getPostTitle={this.getPostTitle}
                          /> :
                          <Loader/>}
                      </div>
                      <div className="recents-col">
                        {this.getBestsPosts() ?
                          this.getBestsPosts().map((p, i) => {
                             return <Recent
                                data={p}
                                key={i}
                                getBackgroundImage={App.getPostBackgroundImg}
                                getPostTitle={this.getPostTitle}
                              />
                          }) :
                          <Loader/>
                        }
                      </div>
                    </Home>
                  )}/>
                  <Route path="/post/:id" render={(props) => <Post {...props} getPostById={this.getPostById} getPostTitle={this.getPostTitle} />}/>
                </div>
                <div className="hide-on-small-only col s3">
                  <div className="topics">
                    <h5>Рубрики:</h5>
                    <ul className="collection">
                      {
                        this.state.categories
                          && this.state.categories.map((c) => {
                            return (
                              <li
                                key={c.id}
                                className="collection-item">
                                <a href="javascript:void(0)" onClick={() => this.onChooseCategory(c.id)}>{c.name}</a>
                              </li>
                            )
                          })
                      }
                      <li
                        className="collection-item">
                        <a href="javascript:void(0)" onClick={() => this.onChooseCategory('')}>Все</a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="activities">
                    <h5>Забирай свою шмотку:</h5>
                    <ul className="collection">
                      {
                        this.state.hats
                          ?
                          this.state.hats.map((h) => {
                            return <li key={h.id} className="collection-item">
                              <Link to={`/post/${h.id}`}>{this.getPostTitle(h.title.rendered)}</Link>
                            </li>;
                          })
                          : <Loader/>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
};
