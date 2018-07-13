import React from 'react';

import Loader from './Loader';

export default (props) => {
    return (
      <div className="container">
        <h4 className="recent-predictions-header">Recent Predictions:</h4>
    
        <div className="predictions-list">
          <div className="latest-col">
            <Loader/>
          </div>
          <div className="recents-col">
            <Loader/>
          </div>
        </div>
      </div>
    );
};
