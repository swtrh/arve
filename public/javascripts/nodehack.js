/* global angular */

(function () {
    "use strict";
    var app = angular.module("nodehack", ["ui.router", "GoogleMapsInitializer", "ngResource"]);

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: "/partials/index.html",
                controller: "MainController"
            });
    });

    app.controller("MainController", ["$scope", "Resources", function($scope, Resources) {
        $scope.mapModel = {};
        Resources.Ships.query((function(ships) {
            $scope.mapModel.ships = ships;
        }));

        $scope.editShip = function(ship) {
            $scope.$apply(function() {
                $scope.mapModel.shipToEdit = ship;
            });
        };

        $scope.cancelEdit = function() {
            delete $scope.mapModel.shipToEdit;
        };

        $scope.saveShip = function() {
            if($scope.mapModel.shipToEdit) {
                $scope.mapModel.shipToEdit.$save();
                delete $scope.mapModel.shipToEdit;
            }
        }
    }]);

    app.factory('Resources', function($resource) {
        return {
            Ships: $resource("/api/ships/:_id")
        };
    });
})();