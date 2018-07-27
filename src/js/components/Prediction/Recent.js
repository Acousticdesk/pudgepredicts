import React from 'react';
import {Link} from 'react-router-dom';

export default ({data, getBackgroundImage, onPostClick}) => {
    return (
      <div data-id={data.id} className="cold">
        <div
          className="card white image-3"
          style={{backgroundImage: getBackgroundImage(data)}}>
          <div className="card-content">
            <Link
              onClick={() => onPostClick(data.id)}
              to="/post"
              className="card-title white-text tooltipped"
              data-position="top"
              data-tooltip={data.title.rendered}>
              {data.title.rendered}
            </Link>
          </div>
        </div>
      </div>
    );
};
