/* global angular */

(function () {
    "use strict";
    var app = angular.module("nodehack", ["ui.router"]);

    var mapCallbacks = [];

    window.initMap = function() {
        mapCallbacks.forEach(function(cb) {
            cb();
        });
    };

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: "/partials/index.html"
            });
    });

    app.directive("mapView", function() {
        return {
            template: "<div class='map'></div>",
            link: function (scope, element) {
                var el = document.getElementsByClassName("map")[0];
                function initMap() {
                    var map = new google.maps.Map(el, {
                        center: {lat: -34.397, lng: 150.644},
                        zoom: 8
                    });
                }
                if(google.maps.Map !== undefined) {
                    initMap();
                } else {
                    mapCallbacks.push(initMap);
                }
            }
        }
    });
})();