(function() {
    'use strict';

    angular
        .module('app')
        .controller('DetailsController', DetailsController);

    DetailsController.$inject = ['$location', 'psiService'];

    function DetailsController($location, psiService) {
        let vm = this;

        vm.urlInput = $location.search().url;
        vm.tests = psiService.getTests();
        vm.deleteTest = deleteTest;

        function deleteTest(test){
            vm.tests.$remove(test).then(function(ref) {
                ref.key() === test.$id; // true
            });
        }
    }
}());