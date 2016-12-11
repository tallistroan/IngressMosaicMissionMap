// mapbox API Key for displaying the map
var mapbox_accesstoken = 'pk.eyJ1IjoidGFsbGlzdHJvYW4iLCJhIjoiY2lqaWsybWVqMDAzYXZzbHhma2pvZDJociJ9.rSsWNVnoyDoNAckKDQzcyw';

// provide boundaries if you wish, that the user is only able to pan and zoom at your city and not at the whole world
// but choose the corners generous, because otherwise the user is very limited in the zoom-functionality especially at small zoom levels
var southEastBounds = new mapboxgl.LngLat(10.754076,47.653085);
var northWestBounds = new mapboxgl.LngLat(12.649536,48.756453);
var bounds = new mapboxgl.LngLatBounds(southEastBounds, northWestBounds);
// make sure the position in the array matches with the id+1 given to the mosaic
var missionList = [
    "bach",
    "stachus",
    "olyturm",
    "uptown",
    "walls",
    "spiderweb",
    "kindl",
    "bavaria",
    "siegOne",
    "siegTwo", // 10
    "schwabylon",
    "stroll",
    "oberhaching",
    "sound",
    "reiter",
    "schleiss",
    "garten",
    "love",
    "bier",
    "trudering", // 20
    "tierpark",
    "turk",
    "innen",
    "aussen",
    "gauting",
    "starnberg",
    "sunset",
    "pullach",
    "kermit",
    "germering", // 30
    "mors",
    "tatort",
    "sendling",
    "ottobrunn",
    "endless",
    "antiquarium",
    "celtic",
    "zombie",
    "dachau",
    "aurum", // 40
    "shapers",
    "ffbenl",
    "erding",
    "bluesun",
    "ismaning",
    "olympics",
    "marienplatz",
    "city",
    "districts",
    "postcard", // 50
    "biergarten",
    "reswue",
    "wiesn",
    "exqvire",
    "time",
    "engel"
];