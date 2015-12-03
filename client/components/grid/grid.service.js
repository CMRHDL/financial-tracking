(function() {
  'use strict';

  angular.module('team.app').service('gridSettings', gridSettings);

  //gridSettings.$inject = [''];
  function gridSettings() {

    var service = this; // jshint ignore:line

    service.variable = '';

    service.functionOne = function () {
    };
  }
})();