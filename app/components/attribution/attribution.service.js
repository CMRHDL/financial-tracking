(function() {
  'use strict';

  angular.module('team.app').service('attribution', attribution);

  //attribution.$inject = [''];
  function attribution() {
    var service = this; // jshint ignore:line

    var attributions = {};
    attributions.in = [
      {name:'Spende'},
      {name:'U'},
      {name:'wot'},
      {name:'mate'},
      {name:'Spende'},
      {name:'Spende'},
      {name:'Spende'},
      {name:'Spende'},
    ];
    attributions.out = [
      {name:'Miete'},
      {name:'Miete'},
      {name:'Miete'},
      {name:'Miete'},
      {name:'Miete'},
      {name:'Miete'},
      {name:'Miete'},
      {name:'Miete'},
      {name:'Miete'},
    ];

    service.get = function() {
      return attributions;
    }

    service.add = function(kindOf, val) {
      attributions[kindOf].push(val);
    }
  }
})();