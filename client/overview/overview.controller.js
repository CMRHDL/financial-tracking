(function() {
  'use strict';
  angular.module('team.app').controller('OverviewCtrl', OverviewCtrl);

  OverviewCtrl.$inject = [ 'uiGridConstants','attribution', 'recordset', 'resource' ];
  function OverviewCtrl(uiGridConstants, attribution, recordset, resource) {
    var vm = this;
    vm.gridOptions = {
      data: 'vm.data',
      columnDefs: [
        { field: 'date', name: 'Datum', enableColumnMenu: false, width: 150 },
        { field: 'description', name: 'Text', enableColumnMenu: false, width: 150 },
        { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: resource.templates.table_cell_number},
        { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: resource.templates.table_cell_number},
      ],
      enableGridMenu: true,
      exporterMenuPdf: false,
      showColumnFooter: true,
      exporterCsvFilename: 'myFile.csv',
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    }

    init();
    function init() {
      window.scrollTo(0, 0);
      attribution.get().then(function(response) {
        vm.attributions = response;
      }).then(function() {
        recordset.get().then(function(response) {
          vm.data = response;
          console.log(vm.data);
          vm.data.forEach(function(entry){
            vm.attributions.forEach(function(attr){
              entry[attr.name] = entry.attribution.name === attr.name ? entry.amount : '';
            });
          });
          buildColDefs();
        });
      });
    }

    function buildColDefs() {
      var colDefs = [
        { field: 'date', name: 'Datum', enableColumnMenu: false, width: 150 },
        { field: 'description', name: 'Text', enableColumnMenu: false, width: 150 },
        { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: resource.templates.table_cell_number},
        { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: resource.templates.table_cell_number},
      ];
      vm.attributions.forEach(function(entry){
        if(entry.type == 'in') {
          colDefs.push({ field: entry.name, name: entry.displayName + " (E)", enableColumnMenu: false, width: 120, aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: resource.templates.table_cell_number});
        } else {
          colDefs.push({ field: entry.name, name: entry.displayName + " (A)", enableColumnMenu: false, width: 120, aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: resource.templates.table_cell_number});
        }
      });
      vm.gridOptions.columnDefs = colDefs;
    }

    vm.deleteAll = deleteAll;

    function deleteAll() {
      recordset.delete().then(function(response){
        init();
      },
      function(error){
        console.log(error);;
      });
    }

  }
})();
