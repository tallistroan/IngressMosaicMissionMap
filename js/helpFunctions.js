// function to determine the number of unique portals in the mosaic
function unique(a) {
	var seen = new Set();
	return a.filter(function (x) {
		// use of toString, because every pair of coordinates is an array -> quick comparison of the values
		return !seen.has(x.toString()) && seen.add(x.toString());
	})
}
// calculate distance between to waypoints, return value in km
function calcDistance(pointOne, pointTwo) {
	var x = (pointTwo[0] * Math.PI / 180 - pointOne[0] * Math.PI / 180) * Math.cos((pointOne[1] * Math.PI / 180 + pointTwo[1] * Math.PI / 180) / 2);
	var y = (pointTwo[1] * Math.PI / 180 - pointOne[1] * Math.PI / 180);
	return Math.sqrt(x * x + y * y) * 6371;
}
function arrayToOneDimension(array) {
	var oneDimArray = [];
	for (i = 0; i < array.length; i++) {
		for (x = 0; x < array[i].length; x++) {
			oneDimArray.push(array[i][x]);
		};
	};
	return oneDimArray;
}
// return the time string which is displayed for infos
function calcTime(timeInMs) {
	if (timeInMs > 3600000) { // more than one hour
		var tempHour = Math.floor(timeInMs / 1000 / 60 / 60);
		return tempHour + ' h ' + (timeInMs / 1000 / 60 - (tempHour * 60)).toFixed(0) + ' min'
	} else {
		return (timeInMs / 1000 / 60).toFixed(0) + ' min'
	}
}
