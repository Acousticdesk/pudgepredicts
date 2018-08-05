import React, { Component } from 'react';
import Loader from '../components/Loader';

export default class extends Component {
    componentDidMount() {
      const script = document.createElement('script');
      const disqusEl = document.querySelector('.disqus');
      const weqe = window.location.origin + window.location.hash.replace('#', '');
      
      if (!disqusEl) {
        return;
      }
      script.type = 'text/javascript';
      script.textContent = `var disqus_config=function (){this.page.url='${weqe}'; this.page.identifier='${weqe}';}; (function(){var d=document, s=d.createElement('script'); s.src='https://pudgepredicts.disqus.com/embed.js'; s.setAttribute('data-timestamp', +new Date()); (d.head || d.body).appendChild(s);})();`;
      disqusEl.appendChild(script);
    }
    render() {
      const data = this.props.getPostById(this.props.match.params.id);
      return (data ?
          <div className="l-post">
            <h2>{this.props.getPostTitle(data.title.rendered)}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered }}/>
            <div className="disqus">
              <div id="disqus_thread"></div>
            </div>
          </div> :
          <Loader centered/>
      );
    }
};
