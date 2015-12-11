(function() {
  'use strict';
  angular.module('team.app').service('util', util);

  util.$inject = [ '$filter' ];
  function util($filter) {
    var service = this; // jshint ignore:line


    service.formatAllNumbers = function (dataSet) {
      for(var key in dataSet) {
        if(key !== 'code') {
          dataSet[key] = service.currency(dataSet[key]);
        }
      }
    };

    service.currency = function (value) {
      // if value contains anything but digits
      if(!/^[0-9]+(\.[0-9]{1,2})?$/.test(value)) {
        return '';
      } else {
        return $filter('currency')(value, '€').replace(/..$/, '');
      }
    };

    service.formatDate = function(date) {
      return $filter('date')(date, "dd.MM.yyyy" , "CET");
    };

    service.prependZeroes = function(value, digits) {
      if(value.toString().length >= digits) {
        return value;
      }
      var zeroesToPrepend = digits - value.toString().length;
      return "0".repeat(zeroesToPrepend) + value;
    };
  }
})();