(function() {
    'use strict';
    angular.module('team.app').controller('DetailsCtrl', DetailsCtrl);

    //DetailsCtrl.$inject = [ '' ];
    function DetailsCtrl() {
        var vm = this;

        // variables
        vm.var = '';

        // public functions
        vm.someFunctionOne = someFunctionOne;

        function someFunctionOne() {
        }

    }
})();
