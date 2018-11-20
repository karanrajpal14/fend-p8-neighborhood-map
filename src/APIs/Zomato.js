export const fetchZomatoData = zomatoID => {
	const zomatoKey = '35b8f8f1e89eded996602e47567a11c3';
	const headers = new Headers();
	headers.append('user-key', zomatoKey);

	const URL = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${zomatoID}`;
	const request = new Request(URL, { method: 'GET', headers: headers });

	return fetch(request)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				return;
			}
		})
		.catch(() =>
			console.log(
				'Failed to fetch data from Zomato API. Please check if you are connected to the internet.'
			)
		);
};
