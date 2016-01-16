(function() {
  'use strict';
  angular.module('team.app').directive('myInitial', myInitial);

  myInitial.$inject = [  ];
  function myInitial() {
    return {
      bindToController: true,
      controller : 'InitialCtrl',
      controllerAs : 'vm',
      restrict: 'E',
      scope: {
        foo: '@',
        bar: '=',
      },
      templateUrl: 'components/settings/initial/initial.html',
      link: function(scope, element, attrs, ctrls) {
      },
    };
  }
})();
