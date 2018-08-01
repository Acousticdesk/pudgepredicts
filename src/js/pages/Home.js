import React from 'react';

import LatestPredictions from '../components/LatestPredictions';

export default ({children, getRecentPredictions}) => {
  return (
    <React.Fragment>
      <h4 className="recent-predictions-header">Лучшие прогнозы:</h4>
      
      <div className="predictions-list">
        {children}
      </div>
      
      <h4 className="latest-predictions-header">Прогнозы на ближайшие матчи:</h4>
      
      <LatestPredictions getRecentPredictions={getRecentPredictions}/>
    </React.Fragment>
  );
}
