import { HashRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../../config';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Latest from '../components/Prediction/Latest';
import Recent from '../components/Prediction/Recent';
import Home from '../pages/Home';
import Post from '../pages/Post';
import Category from '../pages/Category';

const HATS_CATEGORY = 1;

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  static getNoHashUrl() {
    return window.location.origin + window.location.hash.replace('#', '')
  }
  hideDisqus() {
    const disqusEl = document.querySelector('.disqus');
    disqusEl && disqusEl.setAttribute('hidden', 'hidden');
  }
  initDisqus() {
    const script = document.createElement('script');
    const disqusEl = document.querySelector('.disqus');
    const pageUrl = App.getNoHashUrl();
  
    if (!disqusEl) {
      return;
    }
  
    script.type = 'text/javascript';
    script.textContent = `var disqus_config=function (){this.page.url='${pageUrl}'; this.page.identifier='${pageUrl}';}; (function(){var d=document, s=d.createElement('script'); s.src='https://pudgepredicts.disqus.com/embed.js'; s.setAttribute('data-timestamp', +new Date()); (d.head || d.body).appendChild(s);})();`;
    disqusEl.appendChild(script);
  }
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.sidenav');
      const instances = M.Sidenav.init(elems);
    });
    
    this.initDisqus();
    
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
        console.log(categories);
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
        console.log(recents);
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
  
  getPostById = (slug) => {
    if (!this.state.posts || !this.state.posts.best || !this.state.posts.recents) {
      return null;
    }
    
    const filtered = this.state.posts.recents.filter((p) => p.slug === slug);
    
    if (filtered && filtered[0]) {
      return filtered[0];
    } else if (this.state.hatsPosts) {
      const hatsFiltered = this.state.hatsPosts.filter((p) => {
        return p.slug === slug;
      });
      return hatsFiltered && hatsFiltered[0];
    }
  };
  
  getPostTitle(title) {
    return title.replace(/keff:\d+(:?\.\d+)?/, '');
  }
  
  getPostKeff(title) {
    const matches = title.match(/keff:(\d+(?:\.\d+)?)/);
    return matches ? matches[1] : '-';
  }
  
  getSelectedCategory = (id) => {
    if (!this.state.categories) {
      return null;
    }
    
    const idInt = window.parseInt(id);
    const filtered = this.state.categories.filter((c) => c.id === idInt);
    return filtered && filtered[0];
  };
  
  getPostsWithCategory = (categoryId) => {
    if (!this.state.posts || !this.state.posts.recents) {
      return [];
    }
    
    const categoryIdInt = window.parseInt(categoryId);
    
    return this.state.posts.recents.filter((p) => p.categories.includes(categoryIdInt));
  };
  
  render() {
    this.hideDisqus();
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Header/>
            <ul id="slide-out" className="sidenav">
              <li>
                <div className="topics">
                  <h5>Рубрики:</h5>
                  <ul className="collection">
                    {
                      this.state.categories
                      && this.state.categories.map((c) => {
                        return (
                          <li
                            key={c.id}
                            className="collection-item sidenav-close">
                            <Link to={`/category/${c.id}`}>{c.name}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </li>
              <li>
                <div className="activities">
                  <h5>Забирай свою шмотку:</h5>
                  <ul className="collection">
                    {
                      this.state.hats
                        ?
                        this.state.hats.map((h) => {
                          return <li key={h.id} className="collection-item sidenav-close">
                            <Link to={`/post/${h.slug}`}>{this.getPostTitle(h.title.rendered)}</Link>
                          </li>;
                        })
                        : <Loader/>
                    }
                  </ul>
                </div>
              </li>
              <li>
                <h5>Присоединяйся:</h5>
                <a target="_blank" href="https://t.me/pudgepredicts" className="sidenav-close">Канал Телеграм</a>
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
                  <Route path="/category/:id" render={(props) => <Category {...props} getCategory={this.getSelectedCategory} getPostsWithCategory={this.getPostsWithCategory} getPostTitle={this.getPostTitle}/>}/>
                  <div hidden className="disqus">
                    <div id="disqus_thread"></div>
                  </div>
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
                                <Link to={`/category/${c.id}`}>{c.name}</Link>
                              </li>
                            )
                          })
                      }
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
                              <Link to={`/post/${h.slug}`}>{this.getPostTitle(h.title.rendered)}</Link>
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
