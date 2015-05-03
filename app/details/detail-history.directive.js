(function() {
    'use strict';

    angular
        .module('app')
        .directive('detailHistory', detailHistory);

    function detailHistory() {
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

        function DetailHistoryController() {
            var vm = this;
            vm.deleteTest = deleteTest;

            function deleteTest(test){
                vm.tests.$remove(test).then(function(ref) {
                    ref.key() === test.$id; // true
                });
            }
        }
    }
}());