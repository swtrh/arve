(function () {
    var app = angular.module("nodehack");
    app.directive("mapView", ["GoogleMapsInitializer", "Resources", function (GoogleMapsInitializer, Resources) {
        return {
            templateUrl: "/partials/map-view.html",
            link: function (scope, element) {
                scope.mapModel = {
                    center: {
                        lat: 63.447,
                        lng: 10.422
                    },
                    zoom: 8
                };

                var el = element[0].getElementsByClassName("map")[0];
                var map;

                function initMap() {
                    map = new google.maps.Map(el, scope.mapModel);
                    window.map = map;
                    map.addListener("bounds_changed", function () {
                        var center = map.getCenter();
                        scope.$apply(function () {
                            scope.mapModel.center.lat = center.lat();
                            scope.mapModel.center.lng = center.lng();
                            scope.mapModel.zoom = map.getZoom();
                        });
                    });

                    map.addListener("rightclick", function (e) {
                        var pos = e.latLng;
                        //var lat = e.latLng.lat();
                        //var lng = e.latLng.lng();
                        var newShip = {
                            name: "New ship",
                            position: {
                                lat: pos.lat(),
                                lng: pos.lng()
                            }
                        };
                        markShip(newShip);
                    });

                    var alreadyDrawn = false;
                    var drawShips = function() {
                        scope.mapModel.ships.forEach(markShip);
                        alreadyDrawn = true;
                    };

                    if(scope.mapModel.ships) {
                        drawShips();
                    }

                    scope.$watch("mapModel.ships", function(newValue) {
                        console.log(newValue);
                        if(!alreadyDrawn) {
                            drawShips();
                        }
                    });

                    var lastOpenWindow;
                    function markShip(ship) {
                        var marker = new google.maps.Marker({
                            position: ship.position,
                            map: map,
                            title: ship.name + " (" + ship.mmsi + ")",
                            draggable: true,
                            icon: "/images/icons/ship.png"
                        });
                        marker.addListener("dragend", function () {
                            console.log(marker.position);
                            ship.position.lat = marker.position.lat();
                            ship.position.lng = marker.position.lng();

                            Resources.Ships.save(ship);
                        });

                        marker.addListener("click", function() {
                            window.editShip = function() {
                                scope.editShip(ship);
                            };
                            var infoWindow = new google.maps.InfoWindow({
                                content: ship.name + " (" + ship.mmsi + ") <a onclick='editShip()'>edit</a>"
                            });
                            if(lastOpenWindow) {
                                lastOpenWindow.close();
                            }
                            infoWindow.open(map, marker);
                            lastOpenWindow = infoWindow;
                        });
                    }





                    window.map = map;
                }

                GoogleMapsInitializer.mapsInitialized.then(initMap);

            }
        };

    }]);
})();