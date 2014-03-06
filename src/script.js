//setting the map
var map = L.mapbox.map('map', 'lifewinning.heoomgdl', {zoomControl: false})
    .setView([38.8932, -77.3249], 11);
var ui = document.getElementById('map-ui');

new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
//now when we scroll down through text the map won't zoom all crazylike unless we tell it to
//map.scrollWheelZoom.disable();

//make lines connecting points in phone data geojson
var latlngs = []

$.each(phone_data.features, function(index, feature){
	var obj = {}
	obj.lat = feature.properties.Lat
	obj.lon = feature.properties.Lon
	obj.time = feature.properties.Time
	latlngs.push(obj)
})

//make sure that they're sorted by timestamp
function compare(a,b) {
  if (a.time < b.time)
     return -1;
  if (a.time > b.time)
    return 1;
  return 0;
}

latlngs.sort(compare);

var pointList = []

$.each(latlngs, function(index, llobj){
	var point = new L.LatLng(llobj.lat, llobj.lon)
	pointList.push(point)	
})

var firstpolyline = new L.Polyline(pointList, {
color: 'white',
weight: 3,
opacity: 1,
smoothFactor: 1
}).addTo(map);

//now add the phone data points as points
L.geoJson(phone_data, 
	{pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
				radius: 6,
				fillColor: "#CB7751",
				color: "#fff",
				weight: 1,
				opacity: 1,
				fillOpacity: 1});
		}
	}).addTo(map);

var hash = new L.Hash(map);
