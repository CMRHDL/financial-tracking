(function() {
  'use strict';
  angular.module('team.app').directive('settingsAttribution', settingsAttribution);

  settingsAttribution.$inject = [  ];
  function settingsAttribution() {
    return {
      bindToController: true,
      controller : 'AttributionCtrl',
      controllerAs : 'attr',
      restrict: 'E',
      templateUrl: 'components/settings/attribution/attribution.html',
      link: function(scope, element, attrs, ctrls) {
      },
    };
  }
})();
