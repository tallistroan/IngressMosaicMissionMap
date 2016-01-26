/**
 * Script for extracting the mosaic missions as geojson customized for the use in the mission map
 *
 * Please note: This script exports almost all properties from every mission,
 * but not all are displayed to the user at the website at the moment
 * (e.g. the faction of the author, number of unique players completed the mission, ...)
 *
 * Special thanks to @macrojames for providing the basis for this script
 */

// Please fill out the following values for the mosaic, before you run the script:

/* title for the mosaic which is displayed to the user
   Please use only alphanumeric characters! */
var mosaicTitle = "title";
/* internal name of the mosaic, use a short and descriptive name,
   it is only used for including the files at the website and must be unique at the whole website
   Please use only letters a-z */
var mosaicName = "name";
/* numeric value, is used to determine which mosaic the user wants to see when choosing
 at the overview (map) or from the menu-bar, should be increased by one with each new mosaic */
var mosaicID = 0;
/* put any additional information here, e.g. preferred way of transport,
 opening hours of parks/areas, only doable at some hours of the day, etc. */
var mosaicDescription = "description";
/* if there is a post on G+ e.g. in a mosaic community, paste the link to the post
 into this variable.*/
var mosaicInfoPost = "---";

var lines = [];
var counter = 1;
var startPoints = [];
// begin of the kml file
var kml = '<?xml version="1.0" encoding="utf-8" ?><kml xmlns="http://www.opengis.net/kml/2.2"><Document>'
    + '<Style id="lineStyle"><LineStyle><width>2</width><color>ff0055ff</color></LineStyle></Style>'
    + '<Folder><name>' + mosaicTitle + '</name>';
var kmlCoordDelim = " ";

function createOutputString(arr) {
    var all = [],
        delim = "";
    arr.forEach(function (element, index, array) {
        columns = element.map(function (e) {
            return e
        });
        all.push(columns.join(delim))
    });

    return all.join("\r\n");
}

for (guid in window.plugin.missions.cacheByMissionGuid) {
    var m = window.plugin.missions.cacheByMissionGuid[guid];
    var line = [];
    if (counter == 1) {
        line.push('var ' + mosaicName + '_mission={"type":"FeatureCollection","features":[');
        counter = counter + 1
    }
    // names of the portals
    var portalTitle = m.data.waypoints.map(function (e) {

        return '"' + e.title.replace(/"/g, '\'') + '", '
    });
    // type as numeric value 1 to 3
    var portalTypeNum = m.data.waypoints.map(function (e) {
        return e.typeNum + ', '
    });
    // action on portal as numeric value 1 to 8
    var portalObjectiveNum = m.data.waypoints.map(function (e) {

        return e.objectiveNum + ', '
    });
    line.push('{"type": "Feature",\n"properties":{\n');
    line.push('"time": ' + m.time + ',\n');
    line.push('"guid": "' + m.data.guid + '",\n');
    line.push('"title": "' + m.data.title.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\'') + '",\n');
    line.push('"description": "' + m.data.description.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\'') + '",\n');
    line.push('"author":"' + m.data.authorNickname + '",\n');
    line.push('"authorTeam": "' + m.data.authorTeam + '",\n');
    line.push('"ratingE6": ' + m.data.ratingE6 + ',\n');
    line.push('"medianCompletionTimeMs": ' + m.data.medianCompletionTimeMs + ',\n');
    line.push('"numUniqueCompletedPlayers": ' + m.data.numUniqueCompletedPlayers + ',\n');
    line.push('"typeNumMission": ' + m.data.typeNum + ',\n');
    line.push('"image": "' + m.data.image + '",\n');
    line.push('"portalTitle": [');
    line.push.apply(line, portalTitle);
    line.push('],\n');
    line.push('"portalTypeNum": [');
    line.push.apply(line, portalTypeNum);
    line.push('],\n');
    line.push('"portalObjectiveNum": [');
    line.push.apply(line, portalObjectiveNum);
    line.push('],\n');
    line.push('"id": ' + mosaicID + '\n');
    line.push('},\n"geometry": {\n"type": "LineString",\n"coordinates": [\n');

    kml += '<Placemark><description>' + m.data.title.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\'') + '</description>'
        + '<styleUrl>#lineStyle</styleUrl><LineString><altitudeMode>relativeToGround</altitudeMode><coordinates>';

    var waypoints = m.data.waypoints.map(function (e) {
        // possible solution for fieldtrip waypoints and/or hidden portals -> write 0,0 as coordinates
        // if (!e.portal || !e.portal.latE6){return "\t[\n\t0,0\n],\n"}
        //another solution: ignore the hidden and/or fieltrip waypoints completely (better for rendering, because 0,0 is a bit difficult to manage)
        if (!e.portal || !e.portal.latE6) {
            return ""
        }
        kml += [e.portal.lngE6 / 1E6, e.portal.latE6 / 1E6].join(",") + kmlCoordDelim;
        return '[\n' + [e.portal.lngE6 / 1E6, e.portal.latE6 / 1E6].join(", ") + '\n],\n'
    });

    kml += '</coordinates></LineString></Placemark>';

    line.push.apply(line, waypoints);
    lines.push(line);

    line.push(']\n}\n},\n');
    startPoints.push(waypoints[0])
}


line.push(']};\n'); //end of mission
line.push('var ' + mosaicName + '_startMissions = {\n"type":"FeatureCollection",\n"features":[\n');
for (var i = 0; i < startPoints.length; i++) {
    line.push('{"type": "Feature",\n"properties": {\n');
    // write extra information only once to the file
    if (i == 0) {
        line.push('"title": "' + mosaicTitle.replace(/"/g, ' ') + '",\n');
        line.push('"description": "' + mosaicDescription.replace(/"/g, ' ') + '",\n');
        line.push('"imagePath": "pics/' + mosaicName+ '.jpg",\n');
        line.push('"info": "' + mosaicInfoPost + '",\n');
        line.push('"id": ' + mosaicID + ',\n');
    }
    line.push('"missionNumber":' + (i + 1) + '},\n');
    line.push('"geometry": {\n"type": "Point",\n"coordinates":' + startPoints[i] + '}},')
}
line.push(']\n};'); // end of startMissions

var html = '<p><a onclick="$(\'.ui-dialog-missions-copy textarea\').select();">Select all</a> and press CTRL+C to copy it.</br>Save the content to a file with the extension .js and include this specific file to the website</p>'
    + '<textarea style="width: 96%;height: 500px;" readonly onclick="$(\'.ui-dialog-missions-copy textarea\').select();">'
    + createOutputString(lines)
    + '</textarea>';
dialog({
    html: html,
    height: 'auto',
    width: '400px',
    dialogClass: 'ui-dialog-missions-copy',
    title: 'GeoJSON Output'
}).dialog('option', 'buttons', {
    'Delete Mission Cache and Reload Intel Map': function () {
        // important to delete all locally saved missions before the next run
        delete localStorage['plugins-missions-missioncache'];
        delete localStorage['plugins-missions-portalcache'];
        // reloads browser
        window.location.reload(true);
        $(this).dialog('close');
    }

});
var textKML = '<p><a onclick="$(\'.ui-dialog-missions-kml textarea\').select();">Select all</a> and press CTRL+C to copy it.</br>Save the content to a file named ' + mosaicName + '.kml</p>'
    + '<textarea style="width: 96%;height: 250px;" readonly onclick="$(\'.ui-dialog-missions-kml textarea\').select();">'
    + kml + '</Folder></Document></kml>'
    + '</textarea>';
dialog({
    html: textKML,
    height: 'auto',
    width: '400px',
    dialogClass: 'ui-dialog-missions-kml',
    title: 'KML File'
}).dialog('option', 'buttons', {
    'Close': function () {
        $(this).dialog('close');
    }

});