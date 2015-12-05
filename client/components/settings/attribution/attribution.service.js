(function() {
  'use strict';

  angular.module('team.app').service('attribution', attribution);

  //attribution.$inject = [''];
  function attribution() {
    var service = this; // jshint ignore:line

    var attributions = {};
    attributions.in = [
      { name:'Miete_in', displayName: 'Miete' },
      { name:'Spende_in', displayName: 'Spende' },
    ];
    attributions.out = [
      {name:'Gehalt_out', displayName: 'Gehalt' },
      {name:'Telefon_out', displayName: 'Telefon' },
    ];

    service.get = function() {
      return attributions;
    }

    service.getAsArray = function() {
      return attributions.in.reduce(function(arr, val) {
        arr.push({ name: val.name, displayName: val.displayName, group: 'Einnahmearten', type: 'in' })
        return arr;
      }, []).concat(attributions.out.reduce(function(arr, val) {
        arr.push({ name: val.name, displayName: val.displayName, group: 'Ausgabearten', type: 'out' })
        return arr;
      }, []));
    }

    service.add = function(attr) {
      attributions[attr.type].push( { name: attr.displayName + "_" + attr.type, displayName: attr.displayName, type: attr.type } );
      attributions.in = _.sortBy(attributions.in, 'displayName')
      attributions.out = _.sortBy(attributions.out, 'displayName')
    }

    
  }
})();