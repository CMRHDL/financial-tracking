(function() {
  'use strict';

  angular.module('team.app').service('recordset', recordset);

  //recordset.$inject = [''];
  function recordset() {
    var service = this; // jshint ignore:line

    service.recordset = [];

    service.addAll = function(data) {
      service.recordset = service.recordset.concat(data);
    };

    service.get = function() {
      return service.recordset;
    }
  }
})();