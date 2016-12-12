// mapbox API Key for displaying the map
var mapbox_accesstoken = 'pk.eyJ1IjoidGFsbGlzdHJvYW4iLCJhIjoiY2lqaWsybWVqMDAzYXZzbHhma2pvZDJociJ9.rSsWNVnoyDoNAckKDQzcyw';

// provide boundaries if you wish, that the user is only able to pan and zoom at your city and not at the whole world
// but choose the corners generous, because otherwise the user is very limited in the zoom-functionality especially at small zoom levels
var southEastBounds = new mapboxgl.LngLat(10.754076,47.653085);
var northWestBounds = new mapboxgl.LngLat(12.649536,48.756453);
var bounds = new mapboxgl.LngLatBounds(southEastBounds, northWestBounds);