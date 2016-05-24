var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
};
var map = null;
var watchId = null;
//设置高精度，延迟时间0.1s， 不从缓存读取数据
var options = { enableHighAccuracy: true, timeout: 100, maximumAge:0};
var prevCoords = null;
window.onload=getMyLocation;

function getMyLocation() {
	// body...
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, 
			displayError, 
			options);
		var watchButton = document.getElementById("watch");
		watchButton.onclick = watchLocation;
		var clearWatchButton = document.getElementById("clearWatch");
		clearWatchButton.onclick = clearWatch;
	}
	else{
		alert("Oops, no geolocation support");
	}
}

function displayLocation(position) {
	// body...
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;
	div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy, " + 
	"and found in " + options.timeout + " milliseconds)";

	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from the Wickedlysmart HQ";

	if (map == null) {
		showMap(position.coords);
		prevCoords = position.coords;
	}else{
		var meters = computeDistance(position.coords, prevCoords) * 1000;
		if (meters > 20) {
			scrollMapToPosition(position.coords);
			prevCoords = position.coords;
		}
		
	}
}

function displayError(error) {
	// body...
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not available",
		3: "Request timeout"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code==0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
	options.timeout += 100;
	navigator.geolocation.getCurrentPosition(
		displayLocation,
		displayError,
		options);
	div.innerHTML += " ... checking again with timeout=" + options.timeout;
}

//半正矢Haversine公式计算两个坐标之间的距离
function computeDistance(startCoords, destCoords) {
	// body...
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; //radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
		Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees) {
	// body...
	var radius = (degrees * Math.PI)/180;
	return radius;
}

function showMap(coords) {
	// body...
	var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	var title = "Your Location";
	var content = "You are here: " + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
	// body...
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);

	var infoWindowOptions = {
		content: content,
		position: latlong
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, "click", function () {
		// body...
		infoWindow.open(map);
	});
}

function watchLocation() {
	// body...
	watchId = navigator.geolocation.watchPosition(displayLocation, 
		displayError, 
		{timeout:5000});
}

function clearWatch() {
	// body...
	if (watchId) {
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}

//跟踪运动轨迹
function scrollMapToPosition(coords) {
	// body...
	var latitude = coords.latitude;
	var longitude = coords.longitude;
	var latlong = new google.maps.LatLng(latitude, longitude);
	map.panTo(latlong);

	addMarker(map, latlong, "Your new location", "You moved to: " +
		latitude + ", " + longitude);
}