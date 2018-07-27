import React from 'react';

export default ({children}) => {
  return (
    <React.Fragment>
      <h4 className="recent-predictions-header">Recent Predictions:</h4>
      
      <div className="predictions-list">
        {children}
      </div>
    </React.Fragment>
  );
}
