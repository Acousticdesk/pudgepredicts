import React from 'react';
import {Link} from 'react-router-dom';

export default ({data, getBackgroundImage, onPostClick, getPostTitle}) => {
    return (
      <div data-id={data.id} className="cold">
        <div
          className="card white image-3"
          style={{backgroundImage: getBackgroundImage(data)}}>
          <div className="card-content">
            <Link
              to={`/post/${data.id}`}
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
