// Add your JavaScript
//Splash screen
$(document).ready( ()=> {
  //Efeito da tela inicial
  $('.lg-foodmap').delay('1000').fadeToggle('slow', 'linear');
  $('.screen-main').delay('5000').fadeIn('slow');
  $('.lg-foodmap').delay('3000').fadeOut('slow');
  //Filtro de restaurantes
  $('.search').click(function () {
    var inputValue = $('.search-item').val();
    console.log(inputValue);
    //   $("li").each( function() {
    //     if($(this).text() !== inputValue) {
    //       $(this).fadeOut('slow');
    //     }
    //   })
    // })
    //
    // $('.search-item').on('input', function () {
    //   if($(this).val() === "") {
    //     $("li").each( function() {
    //       $(this).fadeIn('slow')
    //     });
    //   }
  })
});

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Você está aqui.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  // Iserir localização de todos os restuarantes
  for (var i = 0; i < restaurantes.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(restaurantes[i].latitude, restaurantes[i].longitude),
      title: restaurantes[i].name,
      map: map
    });
  }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: O serviço de Geolocalização falhou.' :
    'Error: Seu browser não tem suporte ao serviço de Geolocalização.');
    infoWindow.open(map);
  }


  // function catchPoints() {
  //   var geoPoints = [];
  //   for (var i = 0; i < restaurantes.length; i++) {
  //     geoPoints.push(Array.of(restaurantes[i].latitude, restaurantes[i].longitude));
  //     for (j in geoPoints)  {
  //       var marker = new google.maps.Marker({
  //           position: new google.maps.LatLng(restaurantes[i].latitude, restaurantes[i].longitude),
  //           title: restaurantes[i].name,
  //           map: map
  //     }
  //
  //   }
  //
  // }
  // catchPoints();
