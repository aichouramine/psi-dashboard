(function() {
    'use strict';

    angular
        .module('app')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$location', 'psiService'];

    function DetailsController($location, psiService) {
        let vm = this;

        vm.urlInput = $location.search().url;
        vm.tests = psiService.getAllTests();
    }
}());