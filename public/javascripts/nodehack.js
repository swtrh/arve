/* global angular */

(function () {
    "use strict";
    var app = angular.module("nodehack", ["ui.router"]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: "/partials/index.html"
            });

    });

})();