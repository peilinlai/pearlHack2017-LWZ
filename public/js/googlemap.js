//________________googleMap ______________

     function initMap() {
        var myLatLng = {lat: 36, lng: 281.1}; //my current location

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: myLatLng
        });

        /* how to mark a location
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'here i am '
        });
        */

        //zoom in with marker
        map.addListener('click', function(){
          map.setZoom(10);
          map.setCenter(marker.getPosition());
        });

        //turn on location service and center with it
        var geo = new google.maps.InfoWindow({map: map});
         if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            geo.setPosition(pos);
            geo.setContent('You are here !:)');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, geo, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, geo, map.getCenter());
        }

        /* indicate for zoom change
        var zoomInMap = new google.maps.InfoWindow({
          position:myLatLng
        });
        zoomInMap.open(map);

        map.addListener('zoom_changed', function(){
          zoomInMap.setContent('Zoom: ' + map.getZoom());
        });
        */

        var charitynames = ['one', 'two','three'];
        var lats = [35.8, 35.2, 35.3]
        var lngs = [281.2, 281.1, 280.9]

        for (var i = 0; i < charitynames.length; ++i){
          var marker = new google.maps.Marker({
            position:{
              lat: lats[i],
              lng: lngs[i]
            },
            map: map
          });
          attachName(marker, charitynames[i])
        }

      }

      function attachName(marker, charityName) {
        var infowindow = new google.maps.InfoWindow({
          content:charityName
        });

        marker.addListener('click', function(){
          infowindow.open(marker.get('map'),marker);
        });

      }

       function handleLocationError(browserHasGeolocation, geo, pos) {
        geo.setPosition(pos);
        geo.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

//____________________ajax and database________________

function newuser(){
   console.log("newuser!")

   var username = document.getElementById("name").value;
    var userlat = document.getElementById("lat").value;
    var userlng = document.getElementById("lng").value;
    submitOK = "true";

    if (isNaN(lat) || isNaN(lng)) {
        alert(" longtitute & latitute must be a number");
        submitOK = "false";
    }

    if (submitOK == "false") {
        return false;
    }

  var xhttp;

  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {


      document.getElementById("submit").value = "success";
    }
  };
  xhttp.open("POST", "newuser", true);
  xhttp.send({name：username, lat: userlat, lng:userlng});
}

