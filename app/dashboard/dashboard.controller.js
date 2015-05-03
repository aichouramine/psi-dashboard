(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['psiService'];

    function DashboardController(psiService) {
        let vm = this;

        vm.urlInput = '';
        vm.addUrl = addUrl;

        function addUrl() {
            psiService.get(vm.urlInput).then(function(data) {
                vm.data = data;
            });
        }
    }
}());