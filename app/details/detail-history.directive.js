(function() {
    'use strict';

    angular
        .module('app')
        .directive('detailHistory', detailHistory);

    function detailHistory() {
        DetailHistoryController.$inject = ['psiService'];

        let directive = {
            replace: 'true',
            restrict: 'E',
            scope: {
                tests: '=',
                url: '='
            },
            templateUrl: 'app/details/detail-history.directive.html',
            controller: DetailHistoryController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };

        return directive;

        function DetailHistoryController(psiService) {
            var vm = this;
            vm.deleteTest = deleteTest;

            function deleteTest(test){
                psiService.deleteTest(test);
            }
        }
    }
}());