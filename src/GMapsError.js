import React, { Component } from 'react';
import './RestaurantApp.css';

class GMapsError extends Component {
	state = {
		errMsg:
			'Cannot load Google Maps API. Please check your API key or try again later.'
	};

	render() {
		return <h1 className="gmaps-error-message">{this.state.errMsg}</h1>;
	}
}

export default GMapsError;
