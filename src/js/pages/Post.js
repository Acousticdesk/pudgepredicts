import React, { Component } from 'react';

import Loader from '../components/Loader';
import App from '../containers/App';

export default class extends Component {
    disqusReset() {
      if (typeof DISQUS === 'undefined') {
        return;
      }
      
      DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = App.getNoHashUrl();
          this.page.url = App.getNoHashUrl();
        }
      });
      document.querySelector('.disqus').removeAttribute('hidden');
    }
    disqusHide() {
      const disqusEl = document.querySelector('.disqus');
      disqusEl && disqusEl.setAttribute('hidden', 'hidden');
    }
    componentDidUpdate() {
      this.disqusReset();
    }
    componentDidMount() {
      this.disqusReset();
      window.onpopstate = () => {
        const isNavigationToNextPost = /\/post\/.+/;
        if (!isNavigationToNextPost.test(window.location.hash)) {
          this.disqusHide();
        }
      }
    }
    componentWillUnmount() {
      window.onpopstate = () => {};
    }
    render() {
      const data = this.props.getPostById(this.props.match.params.id);
      const postImg = App.getPostBackgroundImg(data, true);
      return (data ?
          <div className="l-post">
            <h2>{this.props.getPostTitle(data.title.rendered)}</h2>
            {postImg}
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered }}/>
          </div> :
          <Loader centered/>
      );
    }
};
