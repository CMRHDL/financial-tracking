(function() {
  'use strict';

  angular.module('team.app').service('settings', settings);

  //settings.$inject = [''];
  function settings() {

    var service = this; // jshint ignore:line

    service.variable = '';

    service.functionOne = function () {
    };
  }
})();