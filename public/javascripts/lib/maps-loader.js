// Google async initializer needs global function, so we use $window
// http://codereview.stackexchange.com/questions/59678/simple-async-google-maps-initializer-with-angularjs
angular.module('GoogleMapsInitializer', [])
    .factory('GoogleMapsInitializer', function ($window, $q) {

        //Google's url for async maps initialization accepting callback function
        var asyncUrl = 'https://maps.googleapis.com/maps/api/js?callback=',
            mapsDefer = $q.defer();

        //Callback function - resolving promise after maps successfully loaded
        $window.googleMapsInitialized = mapsDefer.resolve;

        //Async loader
        var asyncLoad = function (asyncUrl, callbackName) {
            var script = document.createElement('script');
            script.src = asyncUrl + callbackName;
            document.body.appendChild(script);
        };
        //Start loading google maps
        asyncLoad(asyncUrl, 'googleMapsInitialized');

        //Usage: GoogleMapsInitializer.mapsInitialized.then(callback)
        return {
            mapsInitialized: mapsDefer.promise
        };
    });
    