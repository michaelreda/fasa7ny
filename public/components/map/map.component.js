angular.module('myapp').
  component('map',{
    templateUrl:'components/map/map.template.html',
    controller: function MapController($scope,$state,geolocation,landingPageSRV){

        geolocation.getLocation().then(function(data){
          var activities = [];
          var lat=30.1796;
          var long= 31.30756

          $scope.markers = [];
          // if(data!=undefined){

            lat=data.coords.latitude;
            long=data.coords.longitude;
            console.log(lat+","+long);

            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(lat, long),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);


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
          // }

          var createMarker = function (info){

              var marker = new google.maps.Marker({
                  map: $scope.map,
                  position: new google.maps.LatLng(info.lat, info.long),
                  title: info.title
              });
              marker.content = '<div class="infoWindowContent">' + 'type: '+info.type +'<br>price: EGP '+ info.price+ '</div>';

              google.maps.event.addListener(marker, 'click', function(){
                  infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                  infoWindow.open($scope.map, marker);
              });

              $scope.markers.push(marker);

          }
          landingPageSRV.getNearbyActivities(lat,long).success(function(data){
              for(var i=0;i<data.activities.length;i++){

                var lat= parseFloat((data.activities[i].location.split(","))[0]);
                var long= parseFloat((data.activities[i].location.split(","))[1]);
                activities.push({
                  title: data.activities[i].title,
                  type: data.activities[i].type,
                  price: data.activities[i].prices[0].price,
                  lat:lat,
                  long:long
                });

              }
              for (i = 0; i < activities.length; i++){
                  //console.log(activities[i]);
                  createMarker(activities[i]);
              }
          })



          $scope.openInfoWindow = function(e, selectedMarker){
              e.preventDefault();
              google.maps.event.trigger(selectedMarker, 'click');
          }
            var infoWindow = new google.maps.InfoWindow();

        });


    }
});