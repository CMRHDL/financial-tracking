(function() {
  'use strict';

  angular.module('team.app').service('attribution', attribution);

  //attribution.$inject = [''];
  function attribution() {
    var service = this; // jshint ignore:line

    var attributions = {};
    attributions.in = [
      { name:'Miete' },
      { name:'Spende' },
    ];
    attributions.out = [
      {name:'Gehalt'},
      {name:'Telefon'},
    ];

    service.get = function() {
      return attributions;
    }

    service.getAsArray = function() {
      return attributions.in.reduce(function(arr, val) {
        arr.push({ name: val.name, type: 'Einnahmearten' })
        return arr;
      }, []).concat(attributions.out.reduce(function(arr, val) {
        arr.push({ name: val.name, type: 'Ausgabearten' })
        return arr;
      }, []));
    }

    service.add = function(kindOf, val) {
      attributions[kindOf].push( { name: val } );
    }
  }
})();