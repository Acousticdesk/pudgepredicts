import React from 'react';

import Loader from '../components/Loader';

export default ({getRecentPredictions}) => {
    return (
        getRecentPredictions() ?
          (
            <ul className="collection latest-predictions">
              {
                getRecentPredictions().map((p, index) => (
                  <li key={index} className="collection-item">
                    <div className="row">
                      <div className="col s11">
                        {p.title.rendered}
                      </div>
                      <div className="col s1 right-align">100.92</div>
                    </div>
                  </li>
                ))
              }
            </ul>
          ) :
      <Loader/>
    );
};
