import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RestaurantApp from './RestaurantApp';
import GMapsError from './GMapsError';
import * as serviceWorker from './serviceWorker';

window.gm_authFailure = () => {
	ReactDOM.render(<GMapsError />, document.getElementById('root'));
};

ReactDOM.render(<RestaurantApp />, document.getElementById('root'));
serviceWorker.register();
