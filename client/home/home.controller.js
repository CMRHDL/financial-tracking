(function() {
  'use strict';
  angular.module('team.app').controller('HomeCtrl', HomeCtrl);

  //HomeCtrl.$inject = [ '' ];
  function HomeCtrl() {
    var vm = this;

    vm.login = login;

    function login() {
      if(vm.input.username === 'komm' && vm.input.password === 'ev') {
        window.location = '/#/input';
      }
    }

  }
})();
