import React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';

export default ({getRecentPredictions, getPostTitle, getPostKeff}) => {
    return (
        getRecentPredictions() ?
          getRecentPredictions().length ?
            (
              <ul className="collection latest-predictions">
                {
                  getRecentPredictions().map((p, index) => (
                    <li key={index} className="collection-item">
                      <Link to={`/post/${p.id}`} className="row post-link">
                        <div className="col m11 s9">
                          {getPostTitle(p.title.rendered)}
                        </div>
                        <div className="col m1 s3 right-align">{getPostKeff(p.title.rendered)}</div>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            ) : <p>Упс... Похоже нет таких прогнозов :)</p> :
      <Loader/>
    );
};
