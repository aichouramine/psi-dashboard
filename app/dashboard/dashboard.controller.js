(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['psiService'];

    function DashboardController(psiService) {
        let vm = this;

        vm.urlInput = 'http://corycode.me';
        vm.addUrl = addUrl;
        vm.tests = psiService.getTestsRef();
        vm.data = '';

        function addUrl(isValid) {
            if (isValid) {
                psiService.get(vm.urlInput).then(function(response) {
                    vm.tests.$add({
                        url: vm.urlInput,
                        test: response.data
                    });

                    vm.urlInput = '';
                });
            }
        }
    }
}());