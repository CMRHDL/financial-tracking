(function() {
  'use strict';
  angular.module('team.app').service('codeService', codeService);

  codeService.$inject = [ '$http' ];
  function codeService($http) {
    var service = this; // jshint ignore:line  

    service.codes = {
      year: 2015,
      number: 1,
      page: 1,
      position: 1,
      code: getCode(),
    };

    service.get = function() {
      return service.codes;
    }

    service.decrease = function(type) {
      service.codes[type]--;
    }

    service.incease = function(type) {
      service.codes[type]++;
    }

    function getCode() {
      return '';
      // return service.codes.year.toString() + service.codes.number.toString() + service.codes.page.toString() + service.codes.position.toString();
    }
  }
})();