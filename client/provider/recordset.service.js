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

    service.getRx = () => Rx.Observable.fromPromise($http.get('/api/recordset'));

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

    service.backup = function(recordset) {
      return $http.post('/api/recordset/backup').then(function(res){
        alert('Sicherung wurde erstellt im Verzeichnis: ' + res.data);
        return res;
      },
      function(err){
        console.log(err);
      });
    };

    service.patch = function(recordset) {
      return $http.patch('/api/recordset', recordset).then(function(res){
        console.log(res);
        alert('Neuer Wert gespeichert');
      },
      function(err){
        console.log(err);
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

    service.deleteById = function(id) {
      return $http.delete('/api/recordset/' + id).then(function(res){
        return res;
      },
      function(err){
        console.log(err);
      });
    };

    service.getCleanRecordsetFromRowobject = function(rowObject) {
      return {
        _id: rowObject._id,
        amount: rowObject.gains || rowObject.expenses,
        attribution: rowObject.attribution,
        code: rowObject.code,
        date: rowObject.unformattedDate,
        description: rowObject.description,
        gains: rowObject.gains,
        expenses: rowObject.expenses,
      };
    };
  }
})();
