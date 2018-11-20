import React, { Component } from 'react';
import './RestaurantApp.css';
import MapContainer from './components/MapContainer';
import Navigation from './components/Navigation';
import * as ZomatoAPI from './APIs/Zomato';
import restaurantData from './data/restaurant-info.json';

class RestaurantApp extends Component {
	state = {
		restaurants: restaurantData.restaurants,
		currentRestaurants: [],
		zomatoAPICallsExceeded: true
	};

	componentDidMount() {
		this.fetchZomatoInfo();
	}

	fetchZomatoInfo = () => {
		const fetchedRestaurants = this.state.restaurants.map(restaurant => {
			ZomatoAPI.fetchZomatoData(restaurant.zomatoID)
				.then(responseJSON => {
					restaurant.url = responseJSON.url;
					restaurant.address = responseJSON.location.address;
					restaurant.cuisines = responseJSON.cuisines;
					restaurant.rating =
						responseJSON.user_rating.aggregate_rating;
					restaurant.costForTwo = responseJSON.average_cost_for_two;
				})
				.catch(() => this.setState({ zomatoAPICallsExceeded: false }));
			return restaurant;
		});
		this.setState({ currentRestaurants: fetchedRestaurants });
	};

	filterRestaurants = inputQuery => {
		if (!inputQuery) {
			this.setState({ currentRestaurants: [] });
		}
		const filteredRestaurants = this.state.restaurants.filter(restaurant =>
			restaurant.name.toLowerCase().includes(inputQuery.toLowerCase())
		);
		this.setState({ currentRestaurants: filteredRestaurants });
	};

	setActiveRestaurant = marker => {
		document.querySelector(`[title="${marker}"]`).click();
	};

	render() {
		return (
			<div className="App">
				<Navigation
					restaurants={this.state.currentRestaurants}
					onQuery={this.filterRestaurants}
					setActiveRestaurant={this.setActiveRestaurant}
				/>
				<MapContainer
					restaurants={this.state.currentRestaurants}
					centerCoords={this.state.restaurants[0].location}
					activeRestaurant={this.state.activeRestaurant}
					showingInfoWindow={this.state.showingInfoWindow}
					zomatoAPICallsExceeded={this.state.zomatoAPICallsExceeded}
				/>
			</div>
		);
	}
}

export default RestaurantApp;
