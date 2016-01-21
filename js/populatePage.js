var totalPortals = 0;
var uniquePortals = 0;
var authorName = null;
var actionCount = 0;
var countPortalsInMission = 0;
var countFieldtripsInMission = 0;
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

// initialize background map
L.mapbox.accessToken = 'pk.eyJ1IjoidGFsbGlzdHJvYW4iLCJhIjoiY2lnZzJqaHF6MHNubnZhbHRpa3B1cGwzYiJ9.JJbpmACaFungAeXf7eomgA';
var southWest = L.latLng(47.653085, 10.754076);
var northEast = L.latLng(48.756453, 12.649536);
bounds = L.latLngBounds(southWest, northEast);
var map = L.mapbox.map('map', 'mapbox.streets', {
		maxBounds : bounds,
		maxZoom : 17,
		minZoom : 10
	})
map.setView([48.14, 11.57], 14);	
L.control.locate().addTo(map);

// create ClusterGroup for start points on the main map
var markers = new L.MarkerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 20,
        spiderfyDistanceMultiplier: 2
    });

// shows all start portals of every single mosaic, when no specific one is choosen
function showStartPortals() {
	 markers.addLayer(L.geoJson(panorama_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(kindl_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(weihnacht_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(marienplatz_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(bach_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(ampel_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(endless_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(love_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(ismaning_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(stroll_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(spiderweb_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(city_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(sunset_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(innen_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(aussen_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(districts_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(garten_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(trudering_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(erding_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(res_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(kermit_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(germering_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(biergarten_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	markers.addLayer(L.geoJson(nymphenburg_startMissions.features[0], {
			pointToLayer : startMissionStyle,
			onEachFeature : onEachPointOverview
		}));
	// markers.addLayer(L.geoJson(westkreuz_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(pasing_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(pullach_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	markers.addLayer(L.geoJson(olyturm_startMissions.features[0], {
			pointToLayer : startMissionStyle,
			onEachFeature : onEachPointOverview
		}));
	// markers.addLayer(L.geoJson(bier_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(dachau_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	markers.addLayer(L.geoJson(stachus_startMissions.features[0], {
			pointToLayer : startMissionStyle,
			onEachFeature : onEachPointOverview
		}));
	// markers.addLayer(L.geoJson(xmas_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(shapers_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(ffbenl_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(turk_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(aurum_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(argentum_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	 markers.addLayer(L.geoJson(celtic_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(warcraft_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(star_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(sendling_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(antiquar_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	// markers.addLayer(L.geoJson(postcard_startMissions.features[0], {pointToLayer: startMissionStyle, onEachFeature: onEachPointOverview}));
	map.addLayer(markers);
}
switch (getQueryVariable("id")) {
case "1":
	addLayer(panorama_mission, panorama_startMissions);
	break;
case "2":
	addLayer(kindl_mission, kindl_startMissions);
	break;
case "3":
	addLayer(weihnacht_mission, weihnacht_startMissions);
	break;
case "4":
	addLayer(marienplatz_mission, marienplatz_startMissions);
	break;
case "5":
	addLayer(bach_mission, bach_startMissions);
	break;
case "6":
	addLayer(ampel_mission, ampel_startMissions);
	break;
case "7":
	addLayer(endless_mission, endless_startMissions);
	break;
case "8":
	addLayer(love_mission, love_startMissions);
	break;
case "9":
	addLayer(ismaning_mission, ismaning_startMissions);
	break;
case "10":
	addLayer(stroll_mission, stroll_startMissions);
	break;
case "11":
	addLayer(spiderweb_mission, spiderweb_startMissions);
	break;
case "12":
	addLayer(city_mission, city_startMissions);
	break;
case "13":
	addLayer(sunset_mission, sunset_startMissions);
	break;
case "14":
	addLayer(innen_mission, innen_startMissions);
	break;
case "15":
	addLayer(aussen_mission, aussen_startMissions);
	break;
case "16":
	addLayer(districts_mission, districts_startMissions);
	break;
case "17":
	addLayer(garten_mission, garten_startMissions);
	break;
case "18":
	addLayer(trudering_mission, trudering_startMissions);
	break;
case "19":
	addLayer(erding_mission, erding_startMissions);
	break;
case "20":
	addLayer(res_mission, res_startMissions);
	break;
case "21":
	addLayer(kermit_mission, kermit_startMissions);
	break;
case "22":
	addLayer(germering_mission, germering_startMissions);
	break;
case "23":
	addLayer(biergarten_mission, biergarten_startMissions);
	break;
case "24":
	addLayer(nymphenburg_mission, nymphenburg_startMissions);
	break;
case "25":
	addLayer(westkreuz_mission, westkreuz_startMissions);
	break;
case "26":
	addLayer(pasing_mission, pasing_startMissions);
	break;
case "27":
	addLayer(pullach_mission, pullach_startMissions);
	break;
case "28":
	addLayer(olyturm_mission, olyturm_startMissions);
	break;
case "29":
	addLayer(bier_mission, bier_startMissions);
	break;
case "30":
	addLayer(dachau_mission, dachau_startMissions);
	break;
case "31":
	addLayer(stachus_mission, stachus_startMissions);
	break;
case "32":
	addLayer(xmas_mission, xmas_startMissions);
	break;
case "33":
	addLayer(shapers_mission, shapers_startMissions);
	break;
case "34":
	addLayer(ffbenl_mission, ffbenl_startMissions);
	break;
case "35":
	addLayer(turk_mission, turk_startMissions);
	break;
case "36":
	addLayer(aurum_mission, aurum_startMissions);
	break;
case "37":
	addLayer(argentum_mission, argentum_startMissions);
	break;
case "38":
	addLayer(celtic_mission, celtic_startMissions);
	break;
case "39":
	addLayer(warcraft_mission, warcraft_startMissions);
	break;
case "40":
	addLayer(star_mission, star_startMissions);
	break;
case "41":
	addLayer(sendling_mission, sendling_startMissions);
	break;
case "42":
	addLayer(antiquar_mission, antiquar_startMissions);
	break;
case "43":
	addLayer(postcard_mission, postcard_startMissions);
	break;
default:
	showStartPortals();
	break;
}
function addLayer(feature, startMissions) {
	document.getElementById("title").innerHTML = "◄ " + startMissions.features[0].properties.title;
	var arrayPortals = [];
	var arrayPortalTypeNum = [];
	var arrayPortalObjectiveNum = [];

	for (var i = feature.features.length - 1; i >= 0; i--) {
		// collect all waypoints of the mosaic
		for (var j = feature.features[i].geometry.coordinates.length - 1; j >= 0; j--) {
			arrayPortals.push(feature.features[i].geometry.coordinates[j]);
		}
		// collect all type of every waypoint of the mosaic
		arrayPortalTypeNum.push(feature.features[i].properties.portalTypeNum);
		// collect all objectives (actions) of every waypoint of the mosaic
		arrayPortalObjectiveNum.push(feature.features[i].properties.portalObjectiveNum);
		// count total completion time of the mosaic
		medianCompletionTime += feature.features[i].properties.medianCompletionTimeMs;
	}

	// calc mission length incl. gaps between the missions itself
	var tempLength = 0;
	for (var i = 0; i < arrayPortals.length - 1; i++) {
		tempLength += calcDistance(arrayPortals[i], arrayPortals[i + 1]);
	}
	missionLength = tempLength;

	countPortalsInMission = $.grep(arrayToOneDimension(arrayPortalTypeNum), function (elem) {
			return elem === 1; // value for Portal
		}).length;
	countFieldtripsInMission = $.grep(arrayToOneDimension(arrayPortalTypeNum), function (elem) {
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

	asOf = new Date(feature.features[0].properties.time);

	authorName = feature.features[0].properties.author;
	totalPortals = arrayPortals.length;
	uniquePortals = unique(arrayPortals).length;

	var missionLayer = L.geoJson(feature, {
			style : missionStyles,
			onEachFeature : onEachFeature
		});
	var startSingleMissions = L.geoJson(startMissions, {
			pointToLayer : startMissionStyle,
			onEachFeature : onEachStartPoint
		});

	map.addLayer(missionLayer);
	map.addLayer(startSingleMissions);
	//set mapView to the start of the mosaic
	map.setView([startMissions.features[0].geometry.coordinates[1], startMissions.features[0].geometry.coordinates[0]], 16);
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

function onEachFeature(feature, layer) {
	var popupContent = "";
	if (feature.properties && feature.properties.title && feature.properties.typeNumMission) {
		popupContent +=  feature.properties.title+ '</br>Dauer: '+ calcTime(feature.properties.medianCompletionTimeMs);
	}

	layer.bindLabel(popupContent);

	layer.on("mouseover", function (e) {
		layer.setStyle({
			"weight" : 8
		})
	});
	layer.on("mouseout", function (e) {
		layer.setStyle({
			"weight" : 4
		})
	});
	layer.on("click", function (e) {
		layer.setStyle({
			"weight" : 8
		})
	});

}

// function to determine the number of unique portals in the mosaic
function unique(a) {
	var seen = new Set();
	return a.filter(function (x) {
		// use of toString, because every pair of coordinates is an array -> quick comparison of the values
		return !seen.has(x.toString()) && seen.add(x.toString());
	})
}

function missionStyles(feature) {
	if (feature.properties && feature.properties.typeNumMission) {
		switch (feature.properties.typeNumMission) {
		case 2: //non sequential
			return {
				"color" : '#ff8000',
				"dashArray" : "5,8",
				"smoothFactor" : 1,
				"lineJoin" : "round",
				"opacity" : 1,
				"weight" : 4
			};
		case 1: //sequential
			return {
				"color" : '#ff8000',
				"smoothFactor" : 1,
				"lineJoin" : "round",
				"opacity" : 1,
				"weight" : 4
			};
		}
	}
}

// what is shown on the overview at the map
function onEachPointOverview(feature, layer) {
	if (feature.properties && feature.properties.title) {
		layer.bindPopup(
			'<h4>' + feature.properties.title + '</h4>'
			 + '<img class="mapPic" src="' + feature.properties.imagePath + '">'
			 + '<p><a href="index.html?id=' + feature.properties.id + '">Details/Route in der Karte anzeigen</a></p>');
	}
}

function onEachStartPoint(feature, layer) {
	if (feature.properties && feature.properties.missionNumber) {
		// create clickable intel-link for every mission start as label
		layer.bindLabel('<a id="linkPortal" title="Startportal in Intel aufrufen" href="https://www.ingress.com/intel?' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '&z=17&pll=' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '">' + feature.properties.missionNumber.toString() + '</a>', {
			noHide : true
		});
		// add a popup with information on the start point of the first mission
		switch (feature.properties.missionNumber) {
		case 1:
			if (feature.properties && feature.properties.title) {
				// concat action string
				var actionsString = []
				if (countActionHack > 0) {
					actionsString.push(countActionHack + ' x Hack')
				}
				if (countActionCapture > 0) {
					actionsString.push(countActionCapture + ' x Capture oder Upgrade')
				}
				if (countActionLink > 0) {
					actionsString.push(countActionLink + ' x Link erstellen')
				}
				if (countActionField > 0) {
					actionsString.push(countActionField + ' x Feld erstellen')
				}
				if (countActionMod > 0) {
					actionsString.push(countActionMod + ' x Mod deployen')
				}
				if (countActionPhoto > 0) {
					actionsString.push(countActionPhoto + ' x Photo machen')
				}
				if (countActionViewWaypoint > 0) {
					actionsString.push(countActionViewWaypoint + ' x Fieldtrip Waypoint')
				}
				if (countActionPassphrase > 0) {
					actionsString.push(countActionPassphrase + ' x Passphrase eingeben')
				}
				// create output mission length
				var outputMissionLength = ""
					if (missionLength < 1) {
						//when length < 1km display the value in meters
						outputMissionLength += (missionLength * 1000).toFixed(0) + ' m'
					} else {
						// when length > 1km display the value in kilometers
						outputMissionLength += missionLength.toFixed(2) + ' km'
					}
				
					var popupContent =
					'<h4>' + feature.properties.title + '</h4>'

					 + '<p><span>Ersteller: </span>' + authorName + '</p>'
					 + '<p><span>Zeit: </span>ca. ' + calcTime(medianCompletionTime) + '</p>'
					 + '<p><span>Länge: </span>ca. ' + outputMissionLength + '</p>'
					 + '<p><span>Aktionen: </span>' + actionsString.join(", ") + '</p>'
					 + '<p><span>Gesamtanzahl Portale: </span>' + totalPortals + '</p>'
					 + '<p><span>Anzahl Unique Portale: </span>' + uniquePortals + '</p>'
					 + '<p><span>Mehr: </span>' + feature.properties.description + '</p>'
					if (feature.properties.info != "---") {
						popupContent += '<p><a href="' + feature.properties.info + '">mehr Infos auf G+</a></p>'
					} else {
						popupContent += '<p>Leider kein G+ Post verfügbar</p>'
					}
					popupContent += '<img class="mapPic" src="' + feature.properties.imagePath + '">'
					 + '<p><span>Stand vom: </span>' + asOf.getDate() + '.' + (asOf.getMonth()) + 1 + '.' + asOf.getFullYear() + '</p>'

					layer.bindPopup(popupContent);
			}
			break;
		}
	}
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

function startMissionStyle(feature, latlng) {
	switch (feature.properties.missionNumber) {
	case 1:
		return L.circleMarker(latlng, {
			radius : 8,
			fillColor : '#ff8000',
			color : '#fff',
			weight : 2,
			opacity : 1,
			fillOpacity : 1
		})
		break;
	default:
		return L.circleMarker(latlng, {
			radius : 5,
			color : '#bbb',
			fillOpacity : 0,
			opacity : 1
		})
		break;
	}
}
// return the get value of id
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}
