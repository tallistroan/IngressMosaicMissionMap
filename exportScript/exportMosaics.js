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
var mosaicTitle = "Title";
/* internal name of the mosaic, use a short and descriptive name,
   it is only used for including the files at the website and must be unique at the whole website
   Please use only letters a-z */
var mosaicName = "title";
/* numeric value, is used to determine which mosaic the user wants to see when choosing
 at the overview (map) or from the menu-bar, should be increased by one with each new mosaic */
var mosaicID = 1;
/* put any additional information here, e.g. preferred way of transport,
 opening hours of parks/areas, only doable at some hours of the day, etc. */
var mosaicDescription = "description";
/* if there is a post on G+ e.g. in a mosaic community, paste the link to the post
 into this variable.*/
var mosaicInfoPost = "";

var lines = [];
var counter = 0;
var startPoints = '{"type": "FeatureCollection","features": [';
// begin of the kml file
var kml = '<?xml version="1.0" encoding="utf-8" ?><kml xmlns="http://www.opengis.net/kml/2.2"><Document>'
    + '<Style id="lineStyle"><LineStyle><width>2</width><color>ff0055ff</color></LineStyle></Style>'
    + '<Folder><name>' + mosaicTitle + '</name>';
var kmlCoordDelim = " ";
var popupText ='{"type":"Feature","properties":{"title":"' + mosaicTitle.replace(/"/g, ' ') + '",'+
                '"description":"' + mosaicDescription.replace(/"/g, ' ') + '",'+
                '"name":"'+ mosaicName+ '",'+
                '"info":"' + mosaicInfoPost + '",'+
                '"id":' + mosaicID + ','+
                '"missions": '+Object.keys(window.plugin.missions.cacheByMissionGuid).length +'},';
function createOutputString(arr) {
    var all = [],
        delim = "";
    arr.forEach(function (element, index, array) {
        columns = element.map(function (e) {
            return e
        });
        all.push(columns.join(delim))
    });

    return all.join("");
}

function saveFile(url, name) {
    // Get file name from url
    var filename = name;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        delete a;
    };
    xhr.open('GET', url);
    xhr.send();
}

for (guid in window.plugin.missions.cacheByMissionGuid) {
    var m = window.plugin.missions.cacheByMissionGuid[guid];
    var line = [];
    if (counter == 0) {
        line.push('{"type":"FeatureCollection","features":[');

    }
    counter += 1;
    // save pic for the mission
    saveFile(m.data.image, mosaicName+'_'+counter);

    // names of the portals
    var portalTitle = m.data.waypoints.map(function (e) {
        return ('"' + e.title.replace(/"/g, '\'') + '"');
    });
    // type as numeric value 1 to 3
    var portalTypeNum = m.data.waypoints.map(function (e) {
        return e.typeNum;
    });
    // action on portal as numeric value 1 to 8
    var portalObjectiveNum = m.data.waypoints.map(function (e) {

        return e.objectiveNum;
    });
    line.push('{"type":"Feature","properties":{');
    line.push('"time":' + m.time + ',');
    line.push('"guid":"' + m.data.guid + '",');
    line.push('"title":"' + m.data.title.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\'') + '",');
    line.push('"description":"' + m.data.description.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\'') + '",');
    line.push('"author":"' + m.data.authorNickname + '",');
    line.push('"authorTeam":"' + m.data.authorTeam + '",');
    line.push('"ratingE6":' + m.data.ratingE6 + ',');
    line.push('"medianCompletionTimeMs":' + m.data.medianCompletionTimeMs + ',');
    line.push('"numUniqueCompletedPlayers":' + m.data.numUniqueCompletedPlayers + ',');
    line.push('"typeNumMission":' + m.data.typeNum + ',');
    line.push('"image":"' + m.data.image + '",');
    line.push('"portalTitle":[');
    line.push(portalTitle.toString());
    line.push('],');
    line.push('"portalTypeNum":[');
    line.push(portalTypeNum.toString());
    line.push('],');
    line.push('"portalObjectiveNum":[');
    line.push(portalObjectiveNum.toString());
    line.push('],');
    line.push('"id": ' + mosaicID + '');
    line.push('},"geometry":{"type":"LineString","coordinates":[');

    kml += '<Placemark><description>' + m.data.title.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '\'') + '</description>'
        + '<styleUrl>#lineStyle</styleUrl><LineString><altitudeMode>relativeToGround</altitudeMode><coordinates>';

    var waypoints = m.data.waypoints.map(function (e) {
        // possible solution for fieldtrip waypoints and/or hidden portals -> write 0,0 as coordinates
        // if (!e.portal || !e.portal.latE6){return "\t[\n\t0,0\n],\n"}
        //another solution: ignore the hidden and/or fieltrip waypoints completely (better for rendering, because 0,0 is a bit difficult to manage)
        if (!e.portal || !e.portal.latE6) {
            return null;
        }
        kml += [e.portal.lngE6 / 1E6, e.portal.latE6 / 1E6].join(",") + kmlCoordDelim;
        return '[' + [e.portal.lngE6 / 1E6, e.portal.latE6 / 1E6].join(",") + ']';
    });

    kml += '</coordinates></LineString></Placemark>';
    // remove null values for fieldtrip waypoints/hidden portals
    var wp = waypoints.filter(function(n){ return n != undefined });
    line.push(wp.toString()/*.substring(0, waypoints.toString().length-1)*/);
    //line.push.apply(line, waypoints);
    lines.push(line);
    // TODO Handle the case, when the first portal of the mosaic is not longer available
    line.push(']}},');
        startPoints += '{"type":"Feature","properties":{"mission":' + counter + '},"geometry":{"type":"Point","coordinates":' +
            waypoints[0].toString() + '}},';
    if(counter == 1) {
        popupText += '"geometry":{"type": "Point","coordinates":'+waypoints[0].toString() + '}}';
    }
}

startPoints = startPoints.substring(0, startPoints.length-1)+']}';
line.push(']}'); //end of mission



var html = '<p><a onclick="$(\'.ui-dialog-missions-copy textarea\').select();">Select all</a> and press CTRL+C to copy it.</br>Save all files:</p>'
    + '<div id="missions">Mission: </div><div id="starts">Startpoints: </div><div id="kml">KML: </div>'
    + '<textarea style="width: 96%;height: 500px;" readonly onclick="$(\'.ui-dialog-missions-copy textarea\').select();">'
    + popupText
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

var kml_save = "text/plain;charset=utf-8," + encodeURIComponent(kml+ '</Folder></Document></kml>');
var resultString = createOutputString(lines);
resultString = resultString.substring(0,resultString.length-1)+'}]}';
var json_save = "text/json;charset=utf-8," + encodeURIComponent(resultString);
var starts_save = "text/json;charset=utf-8," + encodeURIComponent(startPoints);
$('<a href="data:' + kml_save + '" download="'+mosaicName+'.kml">download KML</a>').appendTo('#kml');
$('<a href="data:' + json_save + '" download="'+mosaicName+'.geojson">download geojson</a>').appendTo('#missions');
$('<a href="data:' + starts_save + '" download="'+mosaicName+'_start.geojson">download geojson</a>').appendTo('#starts');