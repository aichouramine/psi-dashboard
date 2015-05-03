(function () {
    'use strict';

    angular
        .module('app')
        .factory('psiService', psiService);

    psiService.$inject = ['$http'];

    function psiService($http) {
        const PSI_URL = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed';
        const API_KEY = 'AIzaSyCEuHSeoUR2wQ86Qr8lSEAs6ykitWIts3s';

        let psiService = {
            get: get
        };

        return psiService;

        function get(url) {
            let strategy = 'mobile';
            let urlPath = PSI_URL + '?url=' + url + '&strategy=' + strategy;// + '&key=' + API_KEY;

            if (!(window.location.href.indexOf('localhost') > -1)) {
                urlPath += '&key=' + API_KEY;
            }

            return $http.get(urlPath).
                success(function (response) {
                    return response.data;
                }).
                error(function (error) {
                    console.log(error);
                });
        }
    }
}());