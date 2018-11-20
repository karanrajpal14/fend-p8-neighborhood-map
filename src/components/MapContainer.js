import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
	state = {
		viewportBounds: {},
		clickedRestaurant: {},
		activeRestaurant: {},
		showingInfoWindow: true,
		center: {},
		url: '#',
		address: '',
		cuisines: '',
		rating: '',
		costForTwo: ''
	};

	componentDidMount() {
		this.setViewportBounds();
		this.setState({ center: this.props.centerCoords.location });
	}

	setViewportBounds = () => {
		const viewportBounds = new this.props.google.maps.LatLngBounds();
		for (let restaurant of this.props.restaurants) {
			viewportBounds.extend(restaurant.location);
		}
		this.setState({ viewportBounds });
	};

	onMarkerClick = (props, marker) => {
		const restaurant = this.props.restaurants.filter(
			restaurant => restaurant.name === props.title
		);
		this.setState({
			showingInfoWindow: true,
			activeRestaurant: marker,
			clickedRestaurant: restaurant[0]
		});
	};

	render() {
		const mapStyle = {
			width: '100%',
			height: '100%'
		};

		return (
			<div className="Map">
				<Map
					google={this.props.google}
					style={mapStyle}
					center={this.state.center}
					bounds={this.state.viewportBounds}
				>
					{this.props.restaurants.map((restaurant, index) => (
						<Marker
							key={index}
							name={restaurant.name}
							title={restaurant.name}
							zomatoID={restaurant.zomatoID}
							position={{
								lat: restaurant.location.lat,
								lng: restaurant.location.lng
							}}
							onClick={this.onMarkerClick}
							animation={
								this.state.activeRestaurant.name ===
									restaurant.name &&
								this.props.google.maps.Animation.BOUNCE
							}
						/>
					))}
					<InfoWindow
						marker={this.state.activeRestaurant}
						visible={this.state.showingInfoWindow}
					>
						{!this.props.zomatoAPICallsExceeded ? (
							<div>
								<h1>{this.state.clickedRestaurant.name}</h1>
								<h3>Exceeded Zomato API calls quota</h3>
							</div>
						) : (
							<div>
								<a href={this.state.clickedRestaurant.url}>
									<h1>{this.state.clickedRestaurant.name}</h1>
								</a>

								<h2>{this.state.clickedRestaurant.address}</h2>

								<h3>
									{this.state.clickedRestaurant.cuisines}
									{' | '}
									{this.state.clickedRestaurant.rating}
									{'★ | About ₹ '}
									{this.state.clickedRestaurant.costForTwo}
									{' for two'}
								</h3>
							</div>
						)}
					</InfoWindow>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDgLyKemKHxzniLby6HA2MmL7LkXPFuIGg'
})(MapContainer);
