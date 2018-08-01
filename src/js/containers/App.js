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
  
    fetch(config.endpoints.getPosts(), {
      method: 'GET',
      body: {
        tags: ['top']
      }
    })
      .then((res) => res.json())
      .then((recents) => {
        this.setState((prevState) => ({
          posts: {
            ...prevState.posts,
            recents
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
              <div className="row">
                <div className="col s9">
                  <Route exact path="/" render={() => (
                    <Home getRecentPredictions={this.getRecentPosts}>
                      <div className="latest-col">
                        {this.getBestPost() ?
                          <Latest
                            data={this.getBestPost()}
                            getBackgroundImage={App.getPostBackgroundImg}
                            onPostClick={this.onPostClick}
                          /> :
                          <Loader/>}
                      </div>
                      <div className="recents-col">
                        {this.getBestsPosts() ?
                          this.getBestsPosts().map((p, i) => (
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
                <div className="col s3">
                  <div className="topics">
                    <h5>Рубрики:</h5>
                    <ul className="collection">
                      <li className="collection-item">Рубрика 1</li>
                      <li className="collection-item">Рубрика 2</li>
                      <li className="collection-item">Рубрика 3</li>
                    </ul>
                  </div>
                  
                  <div className="activities">
                    <h5>Забирай свою шмотку:</h5>
                    <ul className="collection">
                      <li className="collection-item">Штаны Макара на Пуджа</li>
                      <li className="collection-item">Сет Макса, который тот дал потаскать Владу :)</li>
                      <li className="collection-item">Арканка на Паджика</li>
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
