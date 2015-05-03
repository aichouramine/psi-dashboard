(function () {
    'use strict';

    let app = angular.module('app', [
        'ngRoute',
        'firebase'
    ]);

    app.constant('FIREBASE_URL', 'https://psi-api.firebaseio.com');

    app.config(['$routeProvider', function($routeProvider) {
        // $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: 'app/core/templates/home.html'
        });

        $routeProvider.when('/about', {
            templateUrl: 'app/core/templates/about.html'
        });

        $routeProvider.when('/account', {
            templateUrl: 'app/core/templates/account.html'
        });

        $routeProvider.when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }]);

    app.run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            console.log(current);
            if (!authService.isLoggedIn()) {
                // event.preventDefault();
                $location.path('/');
                console.log('Route Unauthenticated');
            }  else {
                console.log('Route Authenticated');
            }
        });
    }]);
}());