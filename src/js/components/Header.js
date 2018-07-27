import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
      <header>
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link to="/" data-logo href="#" className="brand-logo brand-logo--left-pad">PudgePredicts</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#">My Subscription</a></li>
              <li><a href="#">Predictions</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
};
