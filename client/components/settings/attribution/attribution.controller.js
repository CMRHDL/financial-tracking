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

    init(true);
    function init(resetName) {
      attr.new = {
        name: resetName ? '' : attr.new.name,
        realName: resetName ? '' : attr.new.realName,
        isValid: false,
        isDuplicate: false,
        type: null,
      }
      attr.addKindOfAttr = 'Zuordnung hinzufügen';
    }
    
    function add() {
      if(attr.new.isValid && !attr.new.isDuplicate) {
        attribution.add(attr.new.type, attr.new.realName);
        attr.all = attribution.get();
        resetFull();
      }
    }

    function check() {
      var firstLetter = attr.new.name.substring(0, 1);
      attr.new.realName = attr.new.name.substring(1, attr.new.name.length);
      if(attr.new.name.length > 1 && (firstLetter === '-' || firstLetter === '+')) {
        attr.new.isValid = true;
        attr.addKindOfAttr = firstLetter === '-' ? 'Ausgabe hinzufügen' : 'Einnahme hinzufügen';
        attr.new.type = firstLetter === '-' ? 'out' : 'in';
        attr.new.isDuplicate = false;
        for (var i = 0, len = attr.all[attr.new.type].length; i < len; i++) {
          if(attr.all[attr.new.type][i].name === attr.new.realName) {
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