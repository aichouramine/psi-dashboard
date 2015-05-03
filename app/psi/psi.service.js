(function () {
    'use strict';

    angular
        .module('app')
        .factory('psiService', psiService);

    psiService.$inject = ['$http', '$firebaseArray', 'FIREBASE_URL'];

    function psiService($http, $firebaseArray, FIREBASE_URL) {
        const PSI_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed';
        const API_KEY = 'AIzaSyCEuHSeoUR2wQ86Qr8lSEAs6ykitWIts3s';

        let ref = new Firebase(FIREBASE_URL);
        let authData = ref.getAuth();
        let testsRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/tests');

        let psiService = {
            get: get,
            getTestsRef: getTestsRef
        };

        return psiService;

        function get(url) {
            let strategy = 'mobile';
            let urlPath = `${PSI_URL}?url=${url}&strategy=${strategy}`;

            if (!(window.location.href.indexOf('localhost') > -1)) {
                urlPath += `&key=${API_KEY}`;
            }

            return $http.get(urlPath).
                success(function (response) {
                    return response.data;
                }).
                error(function (error) {
                    console.log(error);
                });
        }

        function getTestsRef() {
            return $firebaseArray(testsRef);
        }
    }
}());