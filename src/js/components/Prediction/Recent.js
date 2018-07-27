import React from 'react';

export default ({data, getBackgroundImage}) => {
    return (
      <div data-id={data.id} className="cold">
          <div
            className="card white image-3"
            style={{backgroundImage: getBackgroundImage(data)}}>
              <div className="card-content">
                  <span 
                          className="card-title white-text tooltipped"
                          data-position="top"
                          data-tooltip={data.title.rendered}>
                    {data.title.rendered}
                  </span>
              </div>
          </div>
      </div>
    );
};
