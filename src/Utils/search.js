import _ from "lodash";

export const searchByLocations = (locations, usersLocation, numbers) => {
	if (_.isEmpty(locations)) return locations;

	_.map(locations, (location) => {
		location.distance = getDistanceBetweenPoints(
			usersLocation,
			location
		).toFixed(2);
	});

	const sortLocations = locations.sort((locationA, locationB) => {
		return locationA.distance - locationB.distance;
	});
	return sortLocations.slice(0, numbers);
}

const getDistanceBetweenPoints = (start, end) => {
	let R = 6371
	let lat1 = start.lat;
	let lon1 = start.lng;
	let lat2 = end.lat;
	let lon2 = end.lng;

	let dLat = toRad((lat2 - lat1));
	let dLon = toRad((lon2 - lon1));
	let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
		Math.sin(dLon / 2) *
		Math.sin(dLon / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c;
	return d;
}

const toRad = (x) => {
	return x * Math.PI / 180;
}