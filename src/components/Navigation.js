import React, { Component } from 'react';

class Navigation extends Component {
	state = {
		sidebarOpen: false
	};

	onHamburgerClick = () => {
		const sidebar = document.querySelector('.sidebar');
		if (this.state.sidebarOpen) {
			sidebar.style.transform = 'translateX(-250px)';
			this.setState({ sidebarOpen: false });
		} else {
			sidebar.style.transform = 'translateX(0px)';
			this.setState({ sidebarOpen: true });
		}
	};

	render() {
		return (
			<div className="navigation" role="navigation">
				<div className="navbar-container">
					<nav className="navbar">
						<button
							aria-label="Hamburger Menu"
							tabIndex="0"
							className="hamburger-container"
							onClick={this.onHamburgerClick}
						>
							<div className="hamburger-bar" />
							<div className="hamburger-bar" />
							<div className="hamburger-bar" />
						</button>
						<div className="navbar-title">
							<h1>Neighborhood Restaurants Project</h1>
						</div>
					</nav>
				</div>
				<div className="sidebar">
					<div className="form-group">
						<input
							id="restaurant-input"
							placeholder="Enter restaurant name"
							aria-label="Search Filter"
							type="text"
							onChange={changeEvent =>
								this.props.onQuery(changeEvent.target.value)
							}
						/>
						<label htmlFor="restaurant-input">
							Enter restaurant name
						</label>
					</div>
					<ul className="restaurants">
						{this.props.restaurants.map(restaurant => {
							return (
								<li
									tabIndex="0"
									role="button"
									aria-label="Restaurant Location"
									id={restaurant.zomatoID}
									key={restaurant.zomatoID}
									onClick={() =>
										this.props.setActiveRestaurant(
											restaurant.name
										)
									}
								>
									{restaurant.name}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default Navigation;
