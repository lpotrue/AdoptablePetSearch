
function initMap() {
  var myLatlng = new google.maps.LatLng(41.850033, -87.6500523);
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
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        //alert(results[0].formatted_address);
        //console.log(results)
        //console.log(results[0].address_components[7].long_name)

          results[0].address_components.forEach((result, i)=>{ 
            if (result.types[0]== "postal_code") {
              
              let zipcode = Number(result.long_name)
              console.log(zipcode)
              makeApiCall(zipcode)
            }
          })

        

      }
    }
  });
});

}
