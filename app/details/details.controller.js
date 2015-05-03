(function() {
    'use strict';

    angular
        .module('app')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$location'];

    function DetailsController($location) {
        let vm = this;

        vm.urlInput = $location.search().url;
    }
}());