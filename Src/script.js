function initIndex () {	
	showMap();
	showPosition();
	initProfil();
	getOrientation();
}


function initProfil () {

	if(localStorage.getItem('sujet'))
	{
		document.querySelector('#sujet').innerHTML = localStorage.getItem('sujet');
	}
	
	var description = document.querySelector('#description');
	if (localStorage.getItem('description')) {
		description.innerHTML = localStorage.getItem('description');
	}

	description.addEventListener('keyup', function() {saveContent(description);}, true);
}

function saveContent (element) {
	localStorage.setItem(element.id, element.innerHTML);
}

function showMap () {
	var options = {
		center: new google.maps.LatLng(40, 20),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 1
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
}

function showPosition () {
	navigator.geolocation.getCurrentPosition(function (position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		var options = {
			center: new google.maps.LatLng(lat, lng),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: 13
		};
		var map = new google.maps.Map(document.getElementById('map'), options);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng)
		});
		marker.setMap(map);
	});
}

function initParams () {
	document.querySelector('#sujet').value = localStorage.getItem('sujet');
}

function saveParams () {
	localStorage.setItem('sujet', document.querySelector('#sujet').value);
	document.querySelector('#saveMessage').style.display = '';

	document.querySelector('#form').addEventListener('focus', hideSaveMessage, true);
}

function hideSaveMessage () {	
	document.querySelector('#saveMessage').style.display = 'none';
}


function getOrientation() {
if(!window.DeviceMotionEvent) {
    document.querySelector('#orientation').innerHTML = "DeviceOrientation not supported";
    return;
} 
    window.addEventListener('deviceorientation', function (event) {
        var a = event.alpha;
        var b = event.beta;
        var g = event.gamma;
        document.querySelector('#alpha').innerText = a;
        document.querySelector('#beta').innerText = b;
        document.querySelector('#gamma').innerText = g;
    }, false);
}