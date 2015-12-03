(function() {
  'use strict';
  angular.module('team.app').controller('GridCtrl', GridCtrl);

  //GridCtrl.$inject = [ '' ];
  function GridCtrl() {
    var vm = this;

    // variables
    vm.var = '';

    // public functions
    vm.someFunctionOne = someFunctionOne;

    function someFunctionOne() {
    }

  }
})();