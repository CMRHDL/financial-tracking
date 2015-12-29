(function() {
  'use strict';
  angular.module('team.app').controller('AttributionCtrl', AttributionCtrl);

  AttributionCtrl.$inject = [ 'attribution', 'resource', '$http', '$scope' ];
  function AttributionCtrl(attribution, resource, $http, $scope) {
    var attr = this;

    attr.resource = resource;
    attr.currentlyRenaming = false;

    attr.add = add;
    attr.cancelRenaming = cancelRenaming;
    attr.check = check;
    attr.finishRenaming = finishRenaming;
    attr.renameAttribution = renameAttribution;

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
      };
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

    function cancelRenaming() {
      initRenaming();
    }

    function check() {
      var type = attr.new.val.substring(0, 1) === '-' ? 'out' : attr.new.val.substring(0, 1) === '+' ? 'in' : null;
      attr.new.displayName = attr.new.val.substring(1, attr.new.val.length);
      attr.new.name = attr.new.displayName + "_" + type;
      if(attr.new.val.length > 0 && type) {
        attr.new.isValid = true;
        attr.addKindOfAttr = type === 'out' ? 'Ausgabe hinzufügen' : 'Einnahme hinzufügen';
        attr.new.type = type;
        attr.new.isDuplicate = false;
        attr.new.group = type === 'in' ? 'Einnahmearten' : 'Ausgabearten';
        for (var i = 0, len = attr.all.length; i < len; i++) {
          if(attr.all[i].name === attr.new.name) {
            attr.new.isDuplicate = true; break;
          }
        }
      } else {
        reset();
      }
    }

    function finishRenaming() {
      if(attr.newDisplayName) {
        attr.renaming.newDisplayName = attr.newDisplayName;
        $http.patch('/api/attr/', attr.renaming)
          .then(
            function(res){
              attribution.get().then(function(response) {
                attr.all = response;
              });
            }, 
            function(err){
              console.log(err);
            }
          )
          .then(
            function(res){
              $http.patch('/api/recordset/attribution', attr.renaming).then(function(res){
                initRenaming();
              });
            }
          );
      } else {
        // show hint
      }
    }

    function renameAttribution(attribtuion) {
      attr.renaming = attribtuion;
      attr.currentlyRenaming = true;
    }

    function reset() {
      init(false);
    }

    function resetFull() {
      init(true);
    }

    function initRenaming() {
      attr.newDisplayName = null
      attr.renaming = null;
      attr.currentlyRenaming = false;
    }


    attr.dbClear = dbClear;

    function dbClear() {
      $http.delete('/api/attr').then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });

      $http.delete('/api/code').then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });

      $http.delete('/api/recordset').then(function(res){
        console.log(res);
      },
      function(err){
        console.log(err);
      });
    }

  }
})();