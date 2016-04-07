// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.

var map;
var markers = [];

$(document).ready(function(){
  initMap();
});

$("#bcreate").submit(function(){
  if(document.getElementById('lat').value == '' &&
      document.getElementById('lng').value == ''){
        alert("Veuillez choisir un point sur la map google.");
        return false;
      }
});
function initMap() {
  var haightAshbury;
  var dejainit = false;
  var edit = false;

  if(document.getElementsByTagName("INPUT")[0].getAttribute("readonly") == null)
    edit = true;

  if(document.getElementById('lat').value != '' && document.getElementById('lng').value != ''){
        var lt = parseFloat(document.getElementById('lat').value);
        var lg = parseFloat(document.getElementById('lng').value);
        haightAshbury = {lat : lt, lng : lg};
        dejainit = true;
  }else{
      haightAshbury = {lat: 50.6091412, lng: 3.1393831};
  }

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: haightAshbury,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  if(dejainit){
      if(edit){
          // This event listener will call addMarker() when the map is clicked.
          map.addListener('click', function(event) {
              addMarker(event.latLng);
          });
      }
      addMarker(haightAshbury);
  }else{
      // This event listener will call addMarker() when the map is clicked.
      map.addListener('click', function(event) {
          addMarker(event.latLng);
      });
  }
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  deleteMarkers();
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title : 'Balise'
  });
  markers.push(marker);
  document.getElementById('lat').value=location.lat();
  document.getElementById('lng').value=location.lng();
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}
