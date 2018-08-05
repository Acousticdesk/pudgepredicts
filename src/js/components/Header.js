import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => {
    return (
      <header>
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link to="/" data-logo href="#" className="brand-logo brand-logo--left-pad">PudgePredicts</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a target="_blank" href="https://t.me/pudgepredicts">Канал Телеграм</a></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger hide-on-large-only">
              <i className="material-icons">menu</i>
            </a>
          </div>
        </nav>
      </header>
    );
};
