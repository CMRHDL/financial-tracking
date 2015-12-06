(function() {
  'use strict';
  angular.module('team.app').controller('AttributionCtrl', AttributionCtrl);

  AttributionCtrl.$inject = [ 'attribution', 'resource', '$http' ];
  function AttributionCtrl(attribution, resource, $http) {
    var attr = this;

    attr.resource = resource;
    attr.all = attribution.get();

    attr.add = add;
    attr.check = check;

    attr.all = [];
    attribution.get().then(function(response) {
      attr.all = response;
    });

    init(true);
    function init(resetName) {
      attr.new = {
        val: '',
        name: resetName ? '' : attr.new.name,
        displayName: resetName ? '' : attr.new.displayName,
        isValid: false,
        isDuplicate: false,
        type: null,
        group: null,
      }
      attr.addKindOfAttr = 'Zuordnung hinzufügen';
    }
    
    function add() {
      if(attr.new.isValid && !attr.new.isDuplicate) {
        attribution.add(attr.new);
        attribution.get().then(function(response) {
          attr.all = response;
        });
        resetFull();
      }
    }

    function check() {
      var type = attr.new.val.substring(0, 1) === '-' ? 'out' : attr.new.val.substring(0, 1) === '+' ? 'in' : null;
      attr.new.displayName = attr.new.val.substring(1, attr.new.val.length);
      attr.new.name = attr.new.displayName + "_" + type;
      if(attr.new.val.length > 0 && type) {
        attr.new.isValid = true;
        attr.addKindOfAttr = type === 'out' ? 'Ausgabe hinzufügen' : 'Einnahme hinzufügen';
        attr.new.type = type
        attr.new.isDuplicate = false;
        attr.new.group = type === 'in' ? 'Einnahmearten' : 'Ausgabearten' 
        for (var i = 0, len = attr.all.length; i < len; i++) {
          if(attr.all[i].name === attr.new.name) {
            attr.new.isDuplicate = true; break;
          }
        }
      } else {
        reset();
      }
    }

    function reset() {
      init(false);
    }

    function resetFull() {
      init(true);
    }




    attr.dbGet = dbGet;
    attr.dbAdd = dbAdd;
    attr.dbClear = dbClear;

    function dbGet() {
      $http.get('/api/attr').then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });
    }

    function dbAdd() {
      $http.post('/api/attr', { name: 'Zildjian' }).then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });
    }

    function dbClear() {
      $http.delete('/api/attr').then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });
    }

  }
})();