(function() {
  'use strict';

  angular.module('team.app').service('recordset', recordset);

  recordset.$inject = [ '$http' ];
  function recordset($http) {
    var service = this; // jshint ignore:line

    service.recordset = [];

    service.get = function() {
      return $http.get('/api/recordset').then(function(res){
        return res.data;
      },
      function(err){
        console.log(err);
      });
    };

    service.getLastAddedDate = function() {
      return $http.get('/api/recordset/lastAddedDate').then(function(res){
        return res.data;
      },
      function(err){
        console.log(err);
      });
    };

    service.add = function(recordset) {
      recordset.forEach(function(entry){
        $http.post('/api/recordset', entry).then(function(res){
          console.log(res);
        },
        function(err){
          console.log(err);
        });
      });
    };

    service.delete = function() {
      $http.delete('/api/recordset').then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });
    };
  }
})();