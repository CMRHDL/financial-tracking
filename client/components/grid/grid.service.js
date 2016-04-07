(function() {
  'use strict';

  angular.module('team.app').service('gridSettings', gridSettings);

  gridSettings.$inject = [ '$http' ];
  function gridSettings($http) {

    var service = this; // jshint ignore:line
    var defaultTableSetting = {
      height: 250,
      width: 900,      
    };

    service.setById = function(tablesetting) {
      return $http.patch('/api/tablesetting/', tablesetting).then(function(res){
          console.log(res);
        },
        function(err){
          console.log(err);
        });
    };

    service.getById = function(id) {
      return $http.get('/api/tablesetting/' + id).then(function(res){
        if(res.data.length) {
          return res.data
        } else {
          defaultTableSetting.id = id;
          $http.post('/api/tablesetting', defaultTableSetting).then(function(res){
            console.log(res);
          },
          function(err){
            console.log(err);
          });
          return defaultTableSetting;
        }
      },
      function(err){
        console.log(err);
      });
    };
  }
})();