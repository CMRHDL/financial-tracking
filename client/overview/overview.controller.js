(function() {
  'use strict';
  angular.module('team.app').controller('OverviewCtrl', OverviewCtrl);

  OverviewCtrl.$inject = [ '$http', '$filter', '$route', '$scope', 'uiGridConstants','uiGridEditConstants', 'attribution', 'recordset', 'resource', 'util', 'gridSettings' ];
  function OverviewCtrl($http, $filter, $route, $scope, uiGridConstants, uiGridEditConstants, attribution, recordset, resource, util, gridSettings) {
    var vm = this;

    vm.gridOptions = {
      data: 'vm.data',
      enableGridMenu: true,
      exporterMenuPdf: false,
      gridFooterTemplate: '<div>pink floyd</div>',
      showColumnFooter: true,
      exporterCsvFilename: 'myFile.csv',
      exporterFieldCallback: function ( grid, row, col, value ){
        if(col.colDef.type === 'number' && value) {
          value = value.toFixed(2);
          return value.toString().replace(/\./, ',');
        }
        return value;
      },
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      //exporterCsvFooter: true,
      appScopeProvider: {
        formatCurrency : function(cellValue) {
          return util.currency(cellValue);
        },
        selectedAttribution : function(attribution, rowObject) {
          vm.data[_.findIndex(vm.data, function(o) { return o['_id'] == rowObject['_id']; })].attribution = attribution;
          $scope.$broadcast(uiGridEditConstants.events.END_CELL_EDIT);
        },
        adjustSum: function(col) {
          return col.aggregationValue.toFixed(2);
        },
      },
      saveSort: false,
      saveFilter: false,
    };

    vm.gridOptions.onRegisterApi = function(gridApi){
      vm.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };

    $scope.saveRow = function(rowEntity) {
      var arr = rowEntity.date.split('.');
      arr[0] = arr[0][0] === '0' ? '0' + (parseInt(arr[0], 10) - 1) : parseInt(arr[0], 10) - 1;
      var newDate = arr[2] + '-' + arr[1] + '-' + arr[0] + 'T23:00:00.000Z';
      rowEntity.unformattedDate = newDate;
      vm.gridApi.rowEdit.setSavePromise( rowEntity, recordset.patch(recordset.getCleanRecordsetFromRowobject(rowEntity)) );
    };
    init();
    function init() {
      gridSettings.getById('grid2').then(function(res) {
        vm.tableWidth = res[0].width;
        vm.tableHeight = res[0].height;
        vm.desiredTableWidth = res[0].width;
        vm.desiredTableHeight = res[0].height;
        vm.tableLayout = res[0].layout;
      }).then(function() {
        attribution.get().then(function(response) {
          vm.attributions = response;
        }).then(function() {
          recordset.get().then(function(response) {
            vm.data = response;
            vm.data.forEach(function(entry){
              // util.formatAllNumbers(entry);
              entry.unformattedDate = entry.date;
              entry.date = util.formatDate(entry.date);
              vm.attributions.forEach(function(attr){
                entry[attr.name] = entry.attribution.name === attr.name ? entry.amount : '';
              });
            });
            buildColDefs();
            $http.get('/api/setting/')
              .then(
                function(res){
                  if(res.data.length > 0) {
                    vm.initialAmount = res.data[res.data.length-1].initialAmount;
                    vm.currentAmount = vm.initialAmount;
                    vm.data.forEach(function(entry){
                      vm.currentAmount += entry.gains;
                      vm.currentAmount -= entry.expenses;
                    });
                  } else {
                    alert('Bitte Initialwerte setzen (Einstellungen -> Initialwerte)');
                  }
                },
                function(err){
                  console.log(err);
                }
              ).then(function() {
                vm.gridApi.saveState.restore( $scope, vm.tableLayout );
              });
          });
        });
      });
    }

    function buildColDefs() {
      var colDefs = [
        { field: 'code', name: 'Code', enableColumnMenu: false, width: 150 },
        { field: 'date', name: 'Datum', enableColumnMenu: false, width: 150, }, // cellTemplate: resource.templates.table_cell_date },
        { field: 'description', name: 'Beschreibung', enableColumnMenu: false, width: 150 },
        { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum, footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>', cellTemplate: resource.templates.table_cell_currency, type: 'number' },
        { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum, footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>',cellTemplate: resource.templates.table_cell_currency, type: 'number' },
        {
          field: 'attribution.displayName',
          name: 'Zuordnung',
          enableColumnMenu: false,
          width: 150,
          editableCellTemplate: resource.templates.table_cell_attributin_picker,
        },
      ];
      vm.attributions.forEach(function(entry){
        if(entry.type === 'in') {
          colDefs.push({ field: entry.name, name: entry.displayName + " (E)", enableColumnMenu: false, type: 'number', width: 120,
            aggregationType: uiGridConstants.aggregationTypes.sum,
            footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>',

            cellTemplate: resource.templates.table_cell_currency, enableCellEdit: false });
        } else {
          colDefs.push({ field: entry.name, name: entry.displayName + " (A)", enableColumnMenu: false, type: 'number', width: 120,
            aggregationType: uiGridConstants.aggregationTypes.sum,
            footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>',
            cellTemplate: resource.templates.table_cell_currency, enableCellEdit: false });
        }
      });
      attribution.get().then(function(response) {
        colDefs[5].editableCellValues = response;
        vm.gridOptions.columnDefs = colDefs;
      });
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

    vm.saveTableLayout = saveTableLayout;
    function saveTableLayout() {

      var tableSetting = {
        id: 'grid2',
        width: vm.tableWidth,
        height: vm.tableHeight,
        layout: vm.gridApi.saveState.save(),
      };
      gridSettings.setById(tableSetting).then(function(res) {
          $route.reload();
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }
})();
