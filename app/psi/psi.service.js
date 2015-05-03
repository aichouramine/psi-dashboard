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
        let tests = $firebaseArray(testsRef);

        let psiService = {
            runTest: runTest,
            getAllTests: getAllTests
        };

        return psiService;

        function runTest(url) {
            let strategy = 'mobile';
            let urlPath = `${PSI_URL}?url=${url}&strategy=${strategy}`;

            if (!(window.location.href.indexOf('localhost') > -1)) {
                urlPath += `&key=${API_KEY}`;
            }

            return $http.get(urlPath).then(function (response) {
                    console.log(response.data);
                    saveTestToHistory(url, response.data);
                });
        }

        function saveTestToHistory(url, testData) {
            tests.$add({
                url: url,
                timestamp: Firebase.ServerValue.TIMESTAMP,
                test: testData
            });
        }

        function getAllTests() {
            return tests;
        }
    }
}());