// Add your JavaScript
// Carregar o mapa com Geolocation.
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 16
  });
  infoWindow = new google.maps.InfoWindow;
  // Iserir localização de todos os restuarantes
  for (var i = 0; i < restaurantes.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(restaurantes[i].latitude, restaurantes[i].longitude),
      title: restaurantes[i].name,
      map: map
    });
    var infowindow = new google.maps.InfoWindow(), marker;
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
      }
    })(marker))
  }
  //HTML5 geolocation.
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
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: O serviço de Geolocalização falhou.' :
    'Error: Seu browser não tem suporte ao serviço de Geolocalização.');
  infoWindow.open(map);
}
$(document).ready( ()=> {
  //Efeito da tela inicial
  $('.lg-foodmap').delay('1000').fadeToggle('slow', 'linear');
  $('.screen-main').delay('5000').fadeIn('slow');
  $('.lg-foodmap').delay('3000').fadeOut('slow');
  //Monta a lista de imagens
  function imageList() {
    $.each(restaurantes, (index, value) => {
      $("#food-thumbs").append('<li class="item-foodmap" data-toggle="modal" data-target="#open-modal"><p>' + restaurantes[index].name + '</p><img id="image' + index + '" src="' + restaurantes[index].image +'" alt="' + restaurantes[index].name + '"></li>');
    });
  }
  imageList();
  //Filtro de restaurantes
  $('#search').click( ()=> {
    var itemValue = $('.search-item').val();
    var eateryFiltered = restaurantes.filter(eatery => itemValue === eatery.name || itemValue === eatery.type);
    //console.log(eateryFiltered);
    imgFiltered(eateryFiltered);
  })
  function imgFiltered(images) {
    $('#food-thumbs').html('');
    images.map((images)=> {
      $("#food-thumbs").append('<li class="item-foodmap" data-toggle="modal" data-target="#open-modal"><p>' + images.name + '</p><img src="' + images.image +'" alt="' + images.name + '"></li>');
    });
  }
  //Conteúdo dinamico do modal
  $.each(restaurantes, (index, value) => {
    $("#image"+ index).click( ()=> {
      $('.modal-body').html('<h3 class="bg-foodmap text-white p-3 m-0">' + restaurantes[index].name + '</h3><img src="' + restaurantes[index].image + '" alt="' + restaurantes[index].image + '"><p class="p-3 m-0">' + restaurantes[index].description + '</p>');
    });
  });
});
