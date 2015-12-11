(function() {
  'use strict';
  angular.module('team.app').controller('OverviewCtrl', OverviewCtrl);

  OverviewCtrl.$inject = [ '$filter', 'uiGridConstants','attribution', 'recordset', 'resource', 'util' ];
  function OverviewCtrl($filter, uiGridConstants, attribution, recordset, resource, util) {
    var vm = this;
    vm.gridOptions = {
      data: 'vm.data',
      columnDefs: [
        { field: 'code', name: 'Code', enableColumnMenu: false, width: 150 },
        { field: 'date', name: 'Datum', enableColumnMenu: false, width: 150 },
        { field: 'description', name: 'Text', enableColumnMenu: false, width: 150 },
        { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: resource.templates.table_cell_number},
        { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum , cellTemplate: resource.templates.table_cell_number},
      ],
      enableGridMenu: true,
      exporterMenuPdf: false,
      gridFooterTemplate: '<div>pink floyd</div>',
      showColumnFooter: true,
      exporterCsvFilename: 'myFile.csv',
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      //exporterCsvFooter: true,
      appScopeProvider: {
        formatCurrency : function(cellValue) {
          return util.currency(cellValue);
        },
      }
    };

    init();
    function init() {
      window.scrollTo(0, 0);
      attribution.get().then(function(response) {
        vm.attributions = response;
      }).then(function() {
        recordset.get().then(function(response) {
          vm.data = response;
          vm.data.forEach(function(entry){
            // util.formatAllNumbers(entry);
            entry.date = util.formatDate(entry.date);
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
        { field: 'code', name: 'Code', enableColumnMenu: false, width: 150 },
        { field: 'date', name: 'Datum', enableColumnMenu: false, width: 150, }, // cellTemplate: resource.templates.table_cell_date },
        { field: 'description', name: 'Beschreibung', enableColumnMenu: false, width: 150 },
        { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: resource.templates.table_cell_currency },
        { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: resource.templates.table_cell_currency },
      ];
      vm.attributions.forEach(function(entry){
        if(entry.type === 'in') {
          colDefs.push({ field: entry.name, name: entry.displayName + " (E)", enableColumnMenu: false, width: 120, aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: resource.templates.table_cell_currency });
        } else {
          colDefs.push({ field: entry.name, name: entry.displayName + " (A)", enableColumnMenu: false, width: 120, aggregationType: uiGridConstants.aggregationTypes.sum, cellTemplate: resource.templates.table_cell_currency });
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
        console.log(error);
      });
    }

  }
})();
