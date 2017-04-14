angular.module('myapp').
  component('map',{
    templateUrl:'components/map/map.template.html',
    controller: function MapController($scope,$state,geolocation){
        var cities = [
            {
                city : 'Toronto',
                desc : 'This is the best city in the world!',
                lat : 43.7000,
                long : -79.4000
            },
            {
                city : 'New York',
                desc : 'This city is aiiiiite!',
                lat : 40.6700,
                long : -73.9400
            },
            {
                city : 'Chicago',
                desc : 'This is the second best city in the world!',
                lat : 41.8819,
                long : -87.6278
            },
            {
                city : 'Los Angeles',
                desc : 'This city is live!',
                lat : 34.0500,
                long : -118.2500
            },
            {
                city : 'Las Vegas',
                desc : 'Sin City...\'nuff said!',
                lat : 36.0800,
                long : -115.1522
            }
        ];


        geolocation.getLocation().then(function(data){
          var lat=30.1796;
          var long= 31.30756


          if(data!=undefined){
            lat=data.coords.latitude;
            long=data.coords.longitude;

            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(lat, long),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.markers = [];
            //adding home marker
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(lat,long),
                title: "you are here",
                icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            marker.content = '<div class="infoWindowContent">' + "you are here" + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
          }

          var infoWindow = new google.maps.InfoWindow();

          var createMarker = function (info){

              var marker = new google.maps.Marker({
                  map: $scope.map,
                  position: new google.maps.LatLng(info.lat, info.long),
                  title: info.city
              });
              marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

              google.maps.event.addListener(marker, 'click', function(){
                  infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                  infoWindow.open($scope.map, marker);
              });

              $scope.markers.push(marker);

          }

          for (i = 0; i < cities.length; i++){
              createMarker(cities[i]);
          }

          $scope.openInfoWindow = function(e, selectedMarker){
              e.preventDefault();
              google.maps.event.trigger(selectedMarker, 'click');
          }

        });


    }
});
