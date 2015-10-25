
(function() {
  'use strict';
  angular.module('team.app').directive('myNav', myNav);

  //myNav. = [ '' ];
  function myNav() {
    return {
      restrict: 'E',
      templateUrl: 'navbar/navbar.html',
      controller: 'NavbarCtrl',
      controllerAs: 'nav',
      link: function(scope, element, attrs, tabsCtrl) {
      },
    };
  }
})();
