(function() {
  'use strict';
  angular.module('team.app').directive('myCode', myCode);

  myCode.$inject = [  ];
  function myCode() {
    return {
      bindToController: true,
      controller : 'CodeCtrl',
      controllerAs : 'code',
      restrict: 'E',
      templateUrl: 'components/code/code.html',
      link: function(scope, element, attrs, ctrls) {
      },
    };
  }
})();
