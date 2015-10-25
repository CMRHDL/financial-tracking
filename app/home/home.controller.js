(function() {
    'use strict';
    angular.module('team.app').controller('HomeCtrl', HomeCtrl);

    //HomeCtrl.$inject = [ '' ];
    function HomeCtrl() {
        var vm = this;

        // variables
        vm.var = '';

        // public functions
        vm.someFunctionOne = someFunctionOne;

        function someFunctionOne() {
        }

    }
})();
