# Neighborhood Map Project

This is the final (8th) project for Udacity's Frontend Developer Nanodegree. The main idea is to show off interesting places in your neighborhood using React. Being the foodie that I am, I chose to showcase a couple of restaurants that I personally like.

You should see markers for these restaurants on the map. You can click on the marker to view more details about the restaurant. Details that are currently shown are:

- Restaurant Name
- Address
- Link to Zomato Page
- Cuisines
- Rating
- Avg. cost for two

All these details are fetched using the [Zomato API][1] for the restaurants present in the `/src/data/restaurant-info.json` file.

The sidebar allows you to filter restaurants based on the name and clicking on the results also displays extra information pertaining to the restaurant.

## [DEMO][2]

## Dependencies

- React
- google-maps-react
- json-laoder

## Setup instructions

1. Clone the project and `cd` into the folder
2. `yarn install && yarn start`
3. Open `localhost:3000` in your browser

## Notes

- You need to mention the Zomato ID in the JSON as the search functionality of the Zomato API isn't very robust (yet, hopefully).
- The service worker works well in production as you can see in the [demo][2] but not on the local server.

[1]: https://developers.zomato.com/api
[2]: https://doubtful-ocean.surge.sh