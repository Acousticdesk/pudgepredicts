import React from 'react';
import {Link} from 'react-router-dom';

export default ({data, getBackgroundImage, onPostClick, getPostTitle}) => {
    return (
      <div className="cold">
        <div
          className="card white image-3"
          style={{backgroundImage: getBackgroundImage(data)}}>
          <div className="card-content">
            <Link
              to={`/post/${data.slug}`}
              className="card-title white-text tooltipped"
              data-position="top"
              data-tooltip={getPostTitle(data.title.rendered)}>
              {getPostTitle(data.title.rendered)}
            </Link>
          </div>
        </div>
      </div>
    );
};
