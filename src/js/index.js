import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import './materialize';
import App from './components/App';
import './app';

ReactDOM.render(<App/>, document.querySelector('#root'));
