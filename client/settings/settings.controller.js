(function() {
  'use strict';
  angular.module('team.app').controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = [ ];
  function SettingsCtrl() {
    var vm = this;
    vm.set = set;
    function set(show) {
      vm.show = show;
    }
  }
})();