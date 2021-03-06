import React from 'react';
import {Link} from 'react-router-dom';

export default ({data, getBackgroundImage, getPostTitle}) => {
    return (
      <div
        className="card white bg image-1"
        style={{backgroundImage: getBackgroundImage(data)}}>
          <div className="card-content">
              <span className="card-title white-text">{getPostTitle(data.title.rendered)}</span>
              <div className="views white-text">
                  <i className="material-icons">remove_red_eye</i>
                  {data.views}
              </div>
              <Link
                to={`/post/${data.slug}`}
                data-role="btn"
                className="waves-effect waves-red btn-flat red-text text-darken-2"
                >
                Show me the prediction
              </Link>
          </div>
      </div>
    );
};
