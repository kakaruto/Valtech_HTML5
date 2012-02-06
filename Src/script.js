function initIndex() {
    showMap();
    showPosition();
    initProfil();
    getOrientation();
    setDragDrop();
    setDragDropFiles();
}


function initProfil() {

    if (localStorage.getItem('sujet')) {
        document.querySelector('#sujet').innerHTML = localStorage.getItem('sujet');
    }

    var description = document.querySelector('#description');
    if (localStorage.getItem('description')) {
        description.innerHTML = localStorage.getItem('description');
    }

    description.addEventListener('keyup', function () { saveContent(description); }, true);
}

function saveContent(element) {
    localStorage.setItem(element.id, element.innerHTML);
}

function showMap() {
    var options = {
        center: new google.maps.LatLng(40, 20),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 1
    };
    var map = new google.maps.Map(document.getElementById('map'), options);
}

function showPosition() {
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

function initParams() {
    document.querySelector('#sujet').value = localStorage.getItem('sujet');
}

function saveParams() {
    localStorage.setItem('sujet', document.querySelector('#sujet').value);
    document.querySelector('#saveMessage').style.display = '';

    document.querySelector('#form').addEventListener('focus', hideSaveMessage, true);
}

function hideSaveMessage() {
    document.querySelector('#saveMessage').style.display = 'none';
}


function getOrientation() {
    if (!window.DeviceMotionEvent) {
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


function setDragDrop() {
    var dropZone = document.querySelector('#drop-zone');

    dropZone.addEventListener('dragenter', function (event) {
        if (event.preventDefault) event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        this.className = 'hovering';
        return false;
    }, false);

    dropZone.addEventListener('dragover', function (event) {
        if (event.preventDefault) event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        return false;
    }, false);

    dropZone.addEventListener('dragleave', function (event) {
        if (event.preventDefault) event.preventDefault();
        this.className = '';
        return false;
    }, false);

    dropZone.addEventListener('drop', function (event) {
        if (event.preventDefault) event.preventDefault();
        if (event.dataTransfer.getData('text')) {
            this.innerHTML = event.dataTransfer.getData('text');
        }
        else if (event.dataTransfer.getData('text/plain')) {
            this.innerHTML = event.dataTransfer.getData('text/plain');
        }
        return false;
    }, false);

}

function setDragDropFiles()
{
    var dropZone = document.querySelector('#drop-img');

    dropZone.addEventListener("dragenter", stopBrowserEvent, false);
    dropZone.addEventListener("dragexit", stopBrowserEvent, false);
    dropZone.addEventListener("dragover", stopBrowserEvent, false);

    dropZone.addEventListener('drop', function (e) {
        if (event.preventDefault) event.preventDefault();
        var reader = new FileReader();
        reader.onload = function(evt) {
            document.querySelector('#preview').src = evt.target.result;
        };
        reader.readAsDataURL(e.dataTransfer.files[0]);
    }, false);
}

function stopBrowserEvent(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}