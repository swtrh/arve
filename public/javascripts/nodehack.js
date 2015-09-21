/* global angular */

(function () {
    "use strict";
    var app = angular.module("nodehack", ["ui.router"]);

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: "/partials/index.html"
            });
    });

    app.directive("map", function() {
        return {
            template: "<div></div>",
            link: function () {
                
            }
        }
    })

})();