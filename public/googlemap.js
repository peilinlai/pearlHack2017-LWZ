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



        selectAll(function(resultsArray){
            var lats = []
            var lngs = []
            var charitynames = []
            var des = []
            var web = []

            for (var i = 0; i < resultsArray.length; i++){
              lats[i] = resultsArray[i].lat;
              lngs[i] = resultsArray[i].lng;
              charitynames[i] = resultsArray[i].name;
              des[i] = resultsArray[i].descrip;
              web[i] = resultsArray[i].web
            }

          for (var i = 0; i < charitynames.length; ++i){
            var marker = new google.maps.Marker({
              position:{
                lat: lats[i],
                lng: lngs[i]
              },
              map: map
            });
            var contentString =  charitynames[i]  + ", is looking for " + tag + ". Their description is : " + des + " And check out their website at: " + web;
            attachName(marker, contentString);
        }
        });



      }

      function attachName(marker, contentString) {
        var infowindow = new google.maps.InfoWindow({
          content:contentString
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
/*
window.onload = function(){
        selectAll(function(resultsArray){
            var lats = []
            var lngs = []
            var charitynames = []
            var des = []
            var web = []

            for (var i = 0; i < resultsArray.length; i++){
              lats[i] = resultsArray[i].lat;
              lngs[i] = resultsArray[i].lng;
              charitynames[i] = resultsArray[i].name;
              des[i] = resultsArray[i].descrip;
              web[i] = resultsArray[i].web
            }

          for (var i = 0; i < charitynames.length; ++i){
            var marker = new google.maps.Marker({
              position:{
                lat: lats[i],
                lng: lngs[i]
              },
              map: map
            });
            var contentString =  charitynames[i]  + ", is looking for " + tag + ". Their description is : " + des + " And check out their website at: " + web;
            attachName(marker, contentString);
        }
        });
}



function getCharityName(){
   var charityNames = [];
   charityNames[0] = "one";
   charityNames[1] = "two";
   charityNames[2] = "three";

   return charityNames;

}

function getLats(){
  var lats = [];
  lats[0] = 35.8;
  lats[1] = 35.2;
  lats[2] = 35.3;

  return lats;
}

function getLngs(){
  var lngs = [];
  lngs = [281.2, 281.1, 280.9];
  return lngs;

}

function getTag(){
  return "food";
}

function getDes(){
  return "description can be replaced ";
}

function getWeb(){
  return "www.fun.com";
}

function selectMap(){
  var charityTag = document.getElementById("button").value;
  console.log("test");
  console.log(charityTag);
}

*/


//___________charity.html____________________

function signUp(){
    var charityName = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var phoneNum = document.getElementById("phonenumber").value;
    var longtitute = document.getElementById("lng").value;
    var latitute = document.getElementById("lat").value;
    var tag = document.getElementById("tag").value;
    var website = document.getElementById("web").value;
    var description = document.getElementById("descrip").value;

    if (isNaN(latitute) || isNaN(longtitute)){
        alert(" longtitute & latitute must be a number");
        return false;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "signup", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log("received from server");
            console.log(xhttp.responseText); //helloWorld
            console.log("what's the response text");
            document.getElementById("submit").value = "success";//your account has been created
        }
    };
    xhttp.send(JSON.stringify({name:charityName, password:password, phonenumber:phoneNum, lng:longtitute, lat:latitute, tag:tag, web:website, descrip:description}));
}

//________________________________________________________not ready yet


function selectALL(callback){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "all", true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log("received from server");
            var resultsArray = JSON.parse(xhttp.responseText).docs; //helloWorld
            callback(resultsArray);
            //var responseText.split(" ")
            //document.getElementById("submit").value = "success";//your account has been created
        }
    };
    //xhttp.open("GET", "???", true);
    xhttp.send();
}



