
(function() {
    'use strict';

    angular
        .module('app')
        .factory('psiService', psiService);

    psiService.$inject = ['$http', '$firebaseAuth', 'FIREBASE_URL'];

    function psiService($http, $firebaseAuth, FIREBASE_URL) {
        let ref = new Firebase(FIREBASE_URL);
        let auth = $firebaseAuth(ref);

        let psiService = {
            get: get
        };

        return authService;

        function get(url) {

        }
    }
}());