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
	for (var i = 0; i < array.length; i++) {
		for (var x = 0; x < array[i].length; x++) {
			oneDimArray.push(array[i][x]);
		}
	}
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
function getMissionLengthOutput(missionLength){
    if (missionLength < 1) {
        //when length < 1km display the value in meters
        return (missionLength * 1000).toFixed(0) + ' m'
    } else {
        // when length > 1km display the value in kilometers
        return missionLength.toFixed(2) + ' km'
    }
}
var totalPortals = 0;
var uniquePortals = 0;
var authorName = [];
var countPortalsInMosaic = 0;
var countFieldtripsInMosaic = 0;
var countActionHack = 0;
var countActionCapture = 0;
var countActionLink = 0;
var countActionField = 0;
var countActionMod = 0;
var countActionPhoto = 0;
var countActionViewWaypoint = 0;
var countActionPassphrase = 0;
var missionLength = 0;
var asOf;
var medianCompletionTime = 0;
var mosaicLength = 0;

function calcMosaicProperties(mosaicData) {
    var arrayPortals = [];
    var arrayPortalTypeNum = [];
    var arrayPortalObjectiveNum = [];
    mosaicLength = mosaicData.length;
    for (var i = mosaicData.length - 1; i >= 0; i--) {
        // collect all waypoints of the mosaic
        for (var j = mosaicData[i].geometry.coordinates.length - 1; j >= 0; j--) {
            arrayPortals.push(mosaicData[i].geometry.coordinates[j]);
        }
        // collect all type of every waypoint of the mosaic
        arrayPortalTypeNum.push(mosaicData[i].properties.portalTypeNum);
        // collect all objectives (actions) of every waypoint of the mosaic
        arrayPortalObjectiveNum.push(mosaicData[i].properties.portalObjectiveNum);
        // count total completion time of the mosaic
        medianCompletionTime += mosaicData[i].properties.medianCompletionTimeMs;
    }
    countPortalsInMosaic = $.grep(arrayToOneDimension(arrayPortalTypeNum), function (elem) {
        return elem === 1; // value for Portal
    }).length;
    countFieldtripsInMosaic = $.grep(arrayToOneDimension(arrayPortalTypeNum), function (elem) {
        return elem === 2; // value for Fieldtrip Waypoint
    }).length;
    countActionHack = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 1; // value for Action Hack
    }).length;
    countActionCapture = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 2; // value for Action Capture or Upgrade
    }).length;
    countActionLink = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 3; // value for Action Create Link from Portal
    }).length;
    countActionField = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 4; // value for Action Create Field from Portal
    }).length;
    countActionMod = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 5; // value for Action Install Mod on Portal
    }).length;
    countActionPhoto = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 6; // value for Action Take a Photo
    }).length;
    countActionViewWaypoint = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 7; // value for Action View this Fieldtrip Waypoint
    }).length;
    countActionPassphrase = $.grep(arrayToOneDimension(arrayPortalObjectiveNum), function (elem) {
        return elem === 8; // value for Action Enter the Passphrase
    }).length;

    asOf = new Date(mosaicData[0].properties.time);
    totalPortals = arrayPortals.length;
    uniquePortals = unique(arrayPortals).length;

    // calc mission length incl. gaps between the missions itself
    var tempLength = 0;
    for (var i = 0; i < arrayPortals.length - 1; i++) {
        tempLength += calcDistance(arrayPortals[i], arrayPortals[i + 1]);
    }
    missionLength = tempLength;

    currentID = mosaicData[0].properties.id;
    // collect all agents who created missions for the mosaic ...
    for (var i = 0; i < mosaicData.length; i++) {
        authorName.push(mosaicData[i].properties.author);
    }
    // ... and remove multiple entries
    authorName = $.unique(authorName);
}
function createMissionPicString(mission, mosaicLength) {
    var stringMissionPictures = "";
    var missionName = mission;
    // creates the html string for the mission images,
    // window[missionName+"mission"] is used to access the according variable and to get the number of missions in the mosaic
    for (var i = mosaicLength - 1; i >= 0; i--) {
        // change the .jpg when you use another file format for the pictures
        stringMissionPictures += '<img src="pics/' + missionName + '_' + (i + 1) + '.jpg"  style="padding:2px;width: 40px;height: 40px;">';
        if (i % 6 == 0)
            stringMissionPictures += "</br>";
    }
    return stringMissionPictures;
}