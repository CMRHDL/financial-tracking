(function() {
  'use strict';
  angular.module('team.app').controller('OverviewCtrl', OverviewCtrl);

  OverviewCtrl.$inject = [ '$filter', '$http', '$scope', 'attribution', 'gridSettings', 'overview', 'recordset', 'uiGridEditConstants', 'uiGridExporterConstants', 'uiGridExporterService', 'util' ];
  function OverviewCtrl($filter, $http, $scope, attribution, gridSettings, overview, recordset, uiGridEditConstants, uiGridExporterConstants, uiGridExporterService, util) {
    var vm = this;

    vm.attributionsToFilter = [];

    vm.applyFliter = applyFliter;
    vm.addAttributiontoFilter = addAttributiontoFilter;
    vm.removeFilter = removeFilter;
    vm.saveTableLayout = saveTableLayout;

    attribution.get().then(function(response) {
      vm.allAttributions = response;
    });

    vm.exportDataFileName = 'finanzen_' + $filter('date')(new Date(), 'dd.MM.yyyy HH:mm', 'CET');

    vm.gridOptions = {
      data: 'vm.data',
      enableGridMenu: true,
      exporterMenuPdf: false,
      showColumnFooter: true,
      exporterCsvFilename: 'finanzen_' + $filter('date')(new Date(), 'dd.MM.yyyy HH:mm', 'CET') + '.csv',
      exporterFieldCallback: function ( grid, row, col, value ){
        if(col.colDef.kindof === 'number' && value) {
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
        deleteRow: function(row) {
          recordset.deleteById(row._id).then(function(response) {
            console.log(response);
          });
        },
      },
      saveSort: false,
      saveFilter: false,
      onRegisterApi: function(gridApi){
        vm.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
      },
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
        if (res) {
          vm.tableWidth = res[0].width;
          vm.tableHeight = res[0].height;
          vm.desiredTableWidth = res[0].width;
          vm.desiredTableHeight = res[0].height;
          vm.tableLayout = res[0].layout;
        }
      }).then(function() {
        attribution.get().then(function(response) {
          vm.attributions = response;
        }).then(function() {
          recordset.get().then(function(response) {
            buildDataset(response);
          });
        });
      });
      /* manually adding footer on export later on
      console.log(uiGridExporterService);
      setTimeout(function(){
        console.log(uiGridExporterService.formatAsCsv(
          uiGridExporterService.getColumnHeaders(vm.gridApi.grid, uiGridExporterConstants.ALL),
          uiGridExporterService.getData(vm.gridApi.grid, uiGridExporterConstants.ALL, uiGridExporterConstants.ALL, false)
          )
        );
      }, 1000);
      */
    }

    function buildColDefs(attributionsWithValue) {
      overview.buildColDefs(attributionsWithValue).then(function(data){
        vm.gridOptions.columnDefs = data;
      });
    };

    function addAttributiontoFilter() {
      vm.attributionsToFilter.push(vm.filterAttribution);
      vm.allAttributions.splice(vm.allAttributions.indexOf(vm.filterAttribution), 1);
      vm.filterAttribution = null;
    }

    function applyFliter() {
      var filter = overview.createFilterObject(vm.attributionsToFilter, vm.minDate, vm.maxDate);

      if(filter.attributionIds.length > 0 || filter.minDate || filter.maxDate) {
        $http.post('/api/recordset/filter', filter).then(function(res){
          buildDataset(res.data);
        },
        function(err){
          console.log(err);
        });
      } else {
        recordset.get().then(function(response) {
          buildDataset(response);
        });
      }
    }

    function removeFilter(index) {
      vm.allAttributions.push(vm.attributionsToFilter[index]);
      vm.attributionsToFilter.splice(index, 1);
    }

    function buildDataset(res) {
      vm.data = res;
      var attributionsWithValue = [];
      vm.data.forEach(function(entry){
        // util.formatAllNumbers(entry);
        entry.unformattedDate = entry.date;
        entry.date = util.formatDate(entry.date);
        attributionsWithValue.push(entry.attribution.name);
        vm.attributions.forEach(function(attr){
          entry[attr.name] = entry.attribution.name === attr.name ? entry.amount : '';
        });
      });
      buildColDefs(attributionsWithValue);
      $http.get('/api/setting/')
        .then(
          function(res){
            if(res.data.length > 0) {
              vm.initialAmount = res.data[res.data.length-1].initialAmount;
              vm.currentAmount = overview.getCurrentAmount(vm.initialAmount, vm.data);
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
    }

    /*
     * Helper Functions
     */
    function saveTableLayout() {
      overview.saveTableLayout(vm.tableWidth, vm.tableHeight, vm.gridApi.saveState.save());
    }

    vm.exportData = exportData;
    function exportData() {
      overview.exportData(vm.gridApi, vm.exportDataFileName);
    }
  }
})();
