
function initMap() {
  var myLatlng = new google.maps.LatLng(40.2010 , -98.9836);
  var myOptions = {
    zoom: 4, 
    scrollwheel: false,
    center: myLatlng

  }

  var map = new google.maps.Map(document.getElementById("map"), myOptions);

  var geocoder = new google.maps.Geocoder()

  google.maps.event.addListener(map, 'click', function(event) {
    geocoder.geocode({
      'latLng': event.latLng
    }, function(results, status) {
      console.log(results)
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {

          //setMapOnAll(null);
          results[0].address_components.forEach((result, i)=>{ 
            if (result.types[0]== "postal_code") {

              let zipcode = Number(result.long_name)
              console.log(zipcode)
              console.log(zips)
              $.when(makeApiCall(zipcode)).then(function(){

                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                var newLatLng = new google.maps.LatLng(lat , lng);
                var marker = new google.maps.Marker({
                  position: newLatLng,
                  title:"Hello World!"
                });
              // To add the marker to the map, call setMap();
              marker.setMap(map);  


            })
              

            }
          })
        }
      }
    });
  });


  google.maps.event.addListener(map, 'click', function(event) {
    console.log("whats up")
    console.log(zips)
  })
}
