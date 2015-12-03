(function() {
  'use strict';
  angular.module('team.app').controller('OverviewCtrl', OverviewCtrl);

  //OverviewCtrl.$inject = [ 'uiGridConstants' ];
  function OverviewCtrl($scope, $rootScope, uiGridConstants, allData) {
    var vm = this;

    vm.allData = allData.get();
    vm.data = [];

    vm.delegatesArr = allData.getDelegatesAsArr();

    init();
    function init() {


      window.scrollTo(0, 0);
      for(var key in vm.allData.expenses) {
        vm.allData.expenses[key].forEach(function(entry){
          var obj = {
            date: entry.date,
            description: entry.description,
            bankStatemement: entry.bankStatemement,
            refNumber: entry.refNumber,
            gains: '',
            expenses: entry.amount,
          };
          vm.delegatesArr.forEach(function(dele){
            obj[dele.name] = dele.name === entry.delegate ? entry.amount : '';
          });
          vm.data.push(obj);
        });
      }
      for(var key in vm.allData.gains) {
        vm.allData.gains[key].forEach(function(entry){
          var obj = {
            date: entry.date,
            description: entry.description,
            bankStatemement: entry.bankStatemement,
            refNumber: entry.refNumber,
            gains: entry.amount,
            expenses: '',
          };
          vm.delegatesArr.forEach(function(dele){
            obj[dele.name] = dele.name === entry.delegate ? entry.amount : '';
          });
          vm.data.push(obj);
        });
      }
    }

    var colDefs = [];
    buildColDefs();
    function buildColDefs() {
      colDefs = [
        { field: 'date', name: 'Datum', enableColumnMenu: false, width: 150 },
        { field: 'description', name: 'Text', enableColumnMenu: false, width: 150 },
        { field: 'bankStatemement', name: 'Kto-A', enableColumnMenu: false, width: 100 },
        { field: 'refNumber', name: 'Beleg', enableColumnMenu: false, width: 100, cellTemplate: '<div class="grid-number-cell">{{row.entity[col.field]}}</div>'},
        { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: '<div class="grid-number-cell">{{row.entity[col.field]}}</div>'},
        { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: '<div class="grid-number-cell">{{row.entity[col.field]}}</div>'},
      ]
      vm.delegatesArr.forEach(function(dele){
        colDefs.push({ field: dele.name, name: dele.name, enableColumnMenu: false, width: 120, aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: '<div class="grid-number-cell">{{row.entity[col.field]}}</div>'});
      });
    }

    vm.gridOptions = {
      data: 'vm.data',
      columnDefs: colDefs,
      enableGridMenu: true,
      exporterMenuPdf: false,
      showColumnFooter: true,
      exporterCsvFilename: 'myFile.csv',
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    }
  }
})();
