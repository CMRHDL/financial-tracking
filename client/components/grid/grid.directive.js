(function() {
  'use strict';
  angular.module('team.app').directive('settingsGrid', settingsGrid);

  settingsGrid.$inject = [  ];
  function settingsGrid() {
  return {
    controller : 'GridCtrl',
    controllerAs : 'grid',
    restrict: 'E',
    templateUrl: 'components/settings/grid/grid.html',
    link: function(scope, element, attrs, ctrls) {
    },
  };
  }
})();
