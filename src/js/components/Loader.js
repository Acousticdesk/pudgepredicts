import React from 'react';

export default (props) => {
    return (
      <div className={`preloader-wrapper big active ${props.centered ? 'centered' : ''}`}>
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"/>
          </div><div className="gap-patch">
          <div className="circle"/>
        </div><div className="circle-clipper right">
          <div className="circle"/>
        </div>
        </div>
      </div>  
    );
};
