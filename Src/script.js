function initIndex () {	
	showMap();
	showPosition();
	initProfil();
}


function initProfil () {

	if(localStorage.getItem('prenom'))
	{
		document.querySelector('#nom').innerHTML = localStorage.getItem('prenom');
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
	document.querySelector('#prenom').value = localStorage.getItem('prenom');
}

function saveParams () {
	localStorage.setItem('prenom', document.querySelector('#prenom').value);
	document.querySelector('#saveMessage').style.display = '';

	document.querySelector('#form').addEventListener('focus', hideSaveMessage, true);
}

function hideSaveMessage () {	
	document.querySelector('#saveMessage').style.display = 'none';
}