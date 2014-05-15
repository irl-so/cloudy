//setting the map
var map = L.mapbox.map('map', 'lifewinning.map-0lnszm21', {zoomControl: false})
    .setView([38.8932, -77.3249], 11);

//navigation 
var pull = $('#pull');
var nav = $('#map-ui');

navHeight  = nav.height();

$(pull).on('click', function(e) {  
        e.preventDefault();  
        nav.slideToggle();  
    }); 

$(window).resize(function(){  
    var w = $(window).width();  
    if(w > 320 && nav.is(':hidden')) {  
        nav.removeAttr('style');
    }  
});  


new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
//now when we scroll down through text the map won't zoom all crazylike unless we tell it to
//map.scrollWheelZoom.disable();

//make lines connecting points in phone data geojson
// var latlngs = []

// $.each(phone_data.features, function(index, feature){
// 	var obj = {}
// 	obj.latlon = feature.geometry.coordinates
// 	obj.time = feature.properties.Time
// 	latlngs.push(obj)
// })

// //make sure that they're sorted by timestamp
// function compare(a,b) {
//   if (a.time < b.time)
//      return -1;
//   if (a.time > b.time)
//     return 1;
//   return 0;
// }

// latlngs.sort(compare);

// var pointList = []

// $.each(latlngs, function(index, llobj){
// 	var point = new L.LatLng(llobj.latlon[1], llobj.latlon[0])
// 	pointList.push(point)	
// })

// var firstpolyline = new L.Polyline(pointList, {
// color: 'white',
// weight: 3,
// opacity: 1,
// smoothFactor: 1
// }).addTo(map);

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
//this is the thing that controls all the layers, it's important
function zoomTo(id, name, lat, lon, zoom) {
	var ui = document.getElementById('map-ui');

    var item = document.createElement('li');
    var link = document.createElement('a');
    item.id = id;
    item.className= 'nav clearfix';
    link.href = '#';
    link.innerHTML = name;

    item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        map.setView([lon, lat], zoom);
        
    };

    item.appendChild(link);
    ui.appendChild(item);
  
}
zoomTo("dc6", "Copt DC-6", -77.53184, 38.74733, 17);
zoomTo("amzn", "Future Amazon Data Center", -77.4504, 39.0315, 16);
zoomTo("ec2", "Amazon Data Center, Sterling",-77.43416, 39.02204, 18);
zoomTo("fz", "Full Zoom", -77.3249, 38.8932, 11);
