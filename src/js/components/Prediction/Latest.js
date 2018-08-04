import React from 'react';
import {Link} from 'react-router-dom';

export default ({data, getBackgroundImage}) => {
    return (
      <div
        data-id={data.id}
        className="card white bg image-1"
        style={{backgroundImage: getBackgroundImage(data)}}>
          <div className="card-content">
              <span className="card-title white-text">{data.title.rendered}</span>
              <div className="views white-text">
                  <i className="material-icons">remove_red_eye</i>
                  {data.views}
              </div>
              <Link
                to={`/post/${data.id}`}
                data-role="btn"
                className="waves-effect waves-red btn-flat red-text text-darken-2"
                >
                Show me the prediction
              </Link>
          </div>
      </div>
    );
};
