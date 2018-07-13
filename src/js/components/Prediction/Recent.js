import React from 'react';

export default ({data}) => {
    return (
      <div data-id={data.id} className="cold">
          <div className="card white image-3">
              <div className="card-content">
                  <span 
                          className="card-title white-text tooltipped"
                          data-position="top"
                          data-tooltip={data.title}>
                    {data.title}
                  </span>
              </div>
          </div>
      </div>
    );
};
