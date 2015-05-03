'use strict';

(function () {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'firebase']);

    app.constant('FIREBASE_URL', 'https://psi-api.firebaseio.com');

    app.config(['$routeProvider', function ($routeProvider) {
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

        $routeProvider.when('/details', {
            templateUrl: 'app/details/details.html'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }]);

    app.run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (!authService.isLoggedIn()) {
                // event.preventDefault();
                $location.path('/');
                console.log('Route Unauthenticated');
            } else {
                console.log('Route Authenticated');
            }
        });
    }]);
})();
(function () {
    'use strict';

    angular.module('app').factory('authService', authService);

    authService.$inject = ['$firebaseAuth', 'FIREBASE_URL'];

    function authService($firebaseAuth, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        var authService = {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        };

        return authService;

        function login(provider) {
            return auth.$authWithOAuthPopup(provider).then(function (authData) {
                var usersRef = ref.child('/users/' + authData.uid);
                usersRef.child('authData').set(authData); // Save user data

                //console.log("Authenticated successfully with payload:", authData);
                //console.log("User " + authData.uid + " is logged in with " + authData.provider);

                return authData;
            })['catch'](function (error) {
                return console.log('Authentication failed:', error);
            });
        }

        function logout() {
            ref.unauth();
        }

        function isLoggedIn() {
            return !!ref.getAuth();
        }
    }
})();
(function () {
    'use strict';

    angular.module('app').controller('BaseController', BaseController);

    BaseController.$inject = ['$location', '$rootScope', 'FIREBASE_URL', 'authService'];

    function BaseController($location, $rootScope, FIREBASE_URL, authService) {
        var vm = this;
        var ref = new Firebase(FIREBASE_URL);
        var authData = ref.getAuth();

        vm.isAuthenticated = false;
        vm.provider = 'Not logged in';
        vm.login = login;
        vm.logout = logout;
        vm.toggleNav = toggleNav;

        setLoggedInInfo(authData);

        function login(provider) {
            authService.login(provider).then(function (authData) {
                setLoggedInInfo(authData);
                $location.path('/dashboard');
            })['catch'](function (error) {
                return console.log('Authentication failed:', error);
            });
        }

        function logout() {
            $location.path('/');
            authService.logout();

            vm.provider = 'Not logged in';
            vm.isAuthenticated = false;
        }

        function setLoggedInInfo(authData) {
            if (authData !== null && authData.uid !== null) {
                vm.provider = 'Logged in with ' + authData.provider;
                vm.isAuthenticated = true;
            }
        }

        function toggleNav() {
            vm.showNav = !vm.showNav;
        }

        $rootScope.$on('$locationChangeStart', function () {
            return vm.showNav = false;
        });
    }
})();
/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param [key] {string} the name of the attribute of each object to compare for uniqueness
 if the key is empty, the entire object will be compared
 if the key === false then no filtering will be performed
 * @return {array}
 */
angular.module('app').filter('unique', function () {
    // ui.filters
    'use strict';

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {},
                newItems = [];

            var extractValueToCompare = function extractValueToCompare(item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck,
                    isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }
            });
            items = newItems;
        }
        return items;
    };
});
(function () {
    'use strict';

    angular.module('app').factory('psiService', psiService);

    psiService.$inject = ['$http', '$firebaseArray', 'FIREBASE_URL'];

    function psiService($http, $firebaseArray, FIREBASE_URL) {
        var PSI_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed';
        var API_KEY = 'AIzaSyCEuHSeoUR2wQ86Qr8lSEAs6ykitWIts3s';

        var ref = new Firebase(FIREBASE_URL);
        var authData = ref.getAuth();
        var testsRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/tests');

        var psiService = {
            get: get,
            getTestsRef: getTestsRef
        };

        return psiService;

        function get(url) {
            var strategy = 'mobile';
            var urlPath = '' + PSI_URL + '?url=' + url + '&strategy=' + strategy;

            if (!(window.location.href.indexOf('localhost') > -1)) {
                urlPath += '&key=' + API_KEY;
            }

            return $http.get(urlPath).success(function (response) {
                return response.data;
            }).error(function (error) {
                console.log(error);
            });
        }

        function getTestsRef() {
            return $firebaseArray(testsRef);
        }
    }
})();
(function () {
    'use strict';

    angular.module('app').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['psiService'];

    function DashboardController(psiService) {
        var vm = this;

        vm.urlInput = 'http://corycode.me';
        vm.addUrl = addUrl;
        vm.tests = psiService.getTestsRef();
        vm.data = '';

        function addUrl(isValid) {
            if (isValid) {
                psiService.get(vm.urlInput).then(function (response) {
                    vm.tests.$add({
                        url: vm.urlInput,
                        timestamp: Firebase.ServerValue.TIMESTAMP,
                        test: response.data
                    });
                });
            }
        }
    }
})();
(function () {
    'use strict';

    angular.module('app').controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$location'];

    function DetailsController($location) {
        var vm = this;

        vm.urlInput = $location.search().url;
    }
})();