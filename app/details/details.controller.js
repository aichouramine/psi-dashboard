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


        vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
        vm.series = ['Series A', 'Series B'];
        vm.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
    }
}());