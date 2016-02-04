(function() {
  'use strict';
  angular.module('team.app').directive('myDataexport', myDataexport);

  myDataexport.$inject = [  ];
  function myDataexport() {
    return {
      controller : 'DataexportCtrl',
      controllerAs : 'data',
      restrict: 'E',
      scope: {
        foo: '@',
        bar: '=',
      },
      templateUrl: 'components/settings/dataexport/dataexport.html',
      bindToController: true,
      link: function(scope, element, attrs, ctrls) {
      },
    };
  }
})();
