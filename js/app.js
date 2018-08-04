// Add your JavaScript
// Geolocation pede permisão para saber sua localização.
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
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: O serviço de Geolocalização falhou.' :
    'Error: Seu browser não tem suporte ao serviço de Geolocalização.');
    infoWindow.open(map);
  }

  function imageList() {
    for (var i in restaurantes) {
      var foodThumbs = document.getElementById('food-thumbs');
      var itemList = document.createElement('li');
      var img = document.createElement('img');
      img.src = restaurantes[i].image;
      itemList.appendChild(img);
      foodThumbs.appendChild(itemList);
    }
  }
  imageList();

  function imgFiltered(images) {
    $( '#food-thumbs' ).html('');
    images.map(function(images) {
      var foodThumbs = document.getElementById('food-thumbs');
      var itemFoodmap = document.createElement('li');
      itemFoodmap.classList.add('item-foodmap');
      var img = document.createElement('img');
      img.src = images.image;
      itemFoodmap.appendChild(img);
      foodThumbs.appendChild(itemFoodmap);
    });
  }

  //Splash screen
  $(document).ready( ()=> {
    //Efeito da tela inicial
    $('.lg-foodmap').delay('1000').fadeToggle('slow', 'linear');
    $('.screen-main').delay('5000').fadeIn('slow');
    $('.lg-foodmap').delay('3000').fadeOut('slow');

    //Filtro de restaurantes
    $('#search').click(()=> {
      var itemValue = $('.search-item').val();
      var eateryFiltered = restaurantes.filter(eatery => itemValue === eatery.name || itemValue === eatery.type);
      //console.log(eateryFiltered);
      imgFiltered(eateryFiltered);
    });

  });
