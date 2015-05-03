(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['psiService'];

    function DashboardController(psiService) {
        let vm = this;

        vm.data = '';
        vm.urlInput = 'http://corycode.me';
        vm.tests = psiService.getAllTests();
        vm.addUrl = addUrl;

        function addUrl(isValid) {
            if (isValid) {
                psiService.runTest(vm.urlInput).then(response => vm.urlInput = '');
            }
        }
    }
}());