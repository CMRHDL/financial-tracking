(function() {
  'use strict';
  angular.module('team.app').controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = [ 'allData' ];
  function SettingsCtrl(allData) {
    var vm = this;

    // variables
    vm.var = '';
    vm.delegates = allData.getDelegates();
    vm.delegatesArr = allData.getDelegatesAsArr();

    // public functions
    vm.addDelegate = addDelegate;

    function addDelegate(delegate) {
      allData.addDelegate(delegate.indexOf('-') > -1 ? 'expenses' : 'gains', delegate.replace(/-/, ''));
    }

  }
})();