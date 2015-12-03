(function() {
  'use strict';
  angular.module('team.app').controller('AttributionCtrl', AttributionCtrl);

  AttributionCtrl.$inject = [ 'attribution', 'resource' ];
  function AttributionCtrl(attribution, resource) {
    var attr = this;
    attr.resource = resource;

    attr.all = attribution.get();

    initNewAttr();
    function initNewAttr() {
      attr.newAttr = {
        name: '',
        realName: '',
        isValid: false,
        isDuplicate: false,
        kindOfAttr: null,
      }
      attr.addKindOfAttr = 'Zuordnung hinzufügen';
    }

    attr.addNewAttribution = addNewAttribution;
    function addNewAttribution() {
      if(attr.newAttr.isValid && !attr.newAttr.isDuplicate) {
        attribution.add(attr.newAttr.kindOfAttr, {name: attr.newAttr.realName});
        attr.all = attribution.get();
        //attr.all[attr.newAttr.kindOfAttr].push({name: attr.newAttr.realName});
        initNewAttr();
      }
    }

    attr.checkNewAttr = checkNewAttr;
    function checkNewAttr() {
      var firstLetter = attr.newAttr.name.substring(0, 1);
      attr.newAttr.realName = attr.newAttr.name.substring(1, attr.newAttr.name.length);
      if(attr.newAttr.name.length > 1 && (firstLetter === '-' || firstLetter === '+')) {
        attr.newAttr.isValid = true;
        attr.addKindOfAttr = firstLetter === '-' ? 'Ausgabe hinzufügen' : 'Einnahme hinzufügen';
        attr.newAttr.kindOfAttr = firstLetter === '-' ? 'out' : 'in';
        attr.newAttr.isDuplicate = false;
        for (var i = 0, len = attr.all[attr.newAttr.kindOfAttr].length; i < len; i++) {
          if(attr.all[attr.newAttr.kindOfAttr][i].name === attr.newAttr.realName) {
            attr.newAttr.isDuplicate = true; break;
          }
        }
      } else {
        attr.newAttr.isValid = false;
        attr.newAttr.isDuplicate = false;
        attr.newAttr.kindOfAttr = null;
        attr.addKindOfAttr = 'Zuordnung hinzufügen';
      }
    }
  }
})();