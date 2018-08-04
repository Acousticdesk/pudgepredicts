import React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';

export default ({getRecentPredictions}) => {
    return (
        getRecentPredictions() ?
          getRecentPredictions().length ?
            (
              <ul className="collection latest-predictions">
                {
                  getRecentPredictions().map((p, index) => (
                    <li key={index} className="collection-item">
                      <Link to={`/post/${p.id}`} className="row post-link">
                        <div className="col s11">
                          {p.title.rendered}
                        </div>
                        <div className="col s1 right-align">100.92</div>
                      </Link>
                    </li>
                  ))
                }
              </ul>
            ) : <p>Упс... Похоже нет таких прогнозов :)</p> :
      <Loader/>
    );
};
