(function() {
  'use strict';

  angular.module('team.app').service('attribution', attribution);

  attribution.$inject = [ '$http' ];
  function attribution($http) {
    var service = this; // jshint ignore:line

    var attributions = [];

    service.get = function() {
      //return attributions;
      return $http.get('/api/attr').then(function(res){
        return res.data;
      },
      function(err){
        console.log(err);
      });
    }

    service.add = function(attr) {
      $http.post('/api/attr', attr).then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });       
    }   
  }
})();