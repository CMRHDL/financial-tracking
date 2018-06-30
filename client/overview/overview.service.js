(function() {
  'use strict';

  angular.module('team.app').service('overview', overview);

  overview.$inject = [ 'uiGridExporterConstants', 'uiGridExporterService', '$route', 'attribution', 'gridSettings', 'resource', 'uiGridConstants' ];
  function overview(uiGridExporterConstants, uiGridExporterService, $route, attribution, gridSettings, resource, uiGridConstants) {
    var service = this; // jshint ignore:line

    service.saveTableLayout = function(width, height, layout) {
      var tableSetting = {
        id: 'grid2',
        width: width,
        height: height,
        layout: layout,
      };
      gridSettings.setById(tableSetting).then(function(res) {
          $route.reload();
        },
        function(err) {
          console.log(err);
        }
      );
    };

    service.total = 0;
    service.initial = 0;
    service.getCurrentAmount = function(initial, data) {
      service.initial = initial;
      var total = initial;
      data.forEach(function(entry){
        total += entry.gains;
        total -= entry.expenses;
      });
      service.total = total;
      return total;
    };

    service.buildColDefs = function(attributionsWithValue) {
      var colDefs = [
        {
          field: 'aaa',
          name: 'Funktionen',
          enableColumnMenu: false,
          width: 150,
          cellTemplate:
          '<div class="glyphicon glyphicon-trash tableicon" title="Datensatz löschen" ng-click="grid.appScope.deleteRow(row.entity)"></div>' +
          '<div class="glyphicon glyphicon-floppy-save tableicon" title="Sicherung erstellen" ng-click="grid.appScope.createBackup()"></div>'

        },
        { field: 'code', name: 'Code', enableColumnMenu: false, width: 150 },
        { field: 'date', name: 'Datum', enableColumnMenu: false, width: 150, }, // cellTemplate: resource.templates.table_cell_date },
        { field: 'description', name: 'Beschreibung', enableColumnMenu: false, width: 150 },
        { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum, footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>', cellTemplate: resource.templates.table_cell_currency, kindof: 'number' },
        { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, width: 100, aggregationType: uiGridConstants.aggregationTypes.sum, footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>',cellTemplate: resource.templates.table_cell_currency, kindof: 'number' },
        {
          field: 'attribution.displayName',
          name: 'Zuordnung',
          enableColumnMenu: false,
          width: 150,
          editableCellTemplate: resource.templates.table_cell_attributin_picker,
        },
      ];

      return attribution.get().then(function(response) {
        response.forEach(function(entry){
          if(_.indexOf(attributionsWithValue, entry.name) > -1) {
            if(entry.type === 'in') {
              colDefs.push({ field: entry.name, name: entry.displayName + " (E)", enableColumnMenu: false, kindof: 'number', width: 120,
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>',

                cellTemplate: resource.templates.table_cell_currency, enableCellEdit: false });
            } else {
              colDefs.push({ field: entry.name, name: entry.displayName + " (A)", enableColumnMenu: false, kindof: 'number', width: 120,
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellTemplate: '<div>total: {{grid.appScope.adjustSum(col)}}</div>',
                cellTemplate: resource.templates.table_cell_currency, enableCellEdit: false });
            }
          }
        });
        colDefs[6].editableCellValues = response;
      }).then(function(response) {
        return colDefs;
      });
    };

    service.createFilterObject = function(attributionsToFilter, minDate, maxDate) {
      var attributionIds = attributionsToFilter.reduce(function(prev, curr) {
        prev.push(curr._id);
        return prev;
      }, []);

      var filter = {
        attributionIds: attributionIds,
        minDate: minDate,
        maxDate: maxDate,
      };

      return filter;
    };

    service.exportData = function(gridApi, exportDataFileName) {
      var colHeader = uiGridExporterService.getColumnHeaders(gridApi.grid, uiGridExporterConstants.VISIBLE);
      var gridData = uiGridExporterService.getData(gridApi.grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE, false);
      var csv = uiGridExporterService.formatAsCsv(
        uiGridExporterService.getColumnHeaders(gridApi.grid, uiGridExporterConstants.VISIBLE),
        uiGridExporterService.getData(gridApi.grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE, false)
      );
      var finalData = '"Ausgangswert",' + service.initial + ',"Endwert",' + service.total + '\n\n' + csv + '\n\n' + buildLastCsvRow(colHeader, gridData);
      uiGridExporterService.downloadFile(exportDataFileName + '.csv', finalData, true);
    };

    function buildLastCsvRow(colHeader, gridData) {
      var sum = gridData.reduce(function(previous, current) {
        current.forEach(function(entry, index) {
          if(isNumberColumn(index, colHeader) && entry.value) {
            var adjustedNumber = parseFloat(entry.value.replace(',', '.'));
            previous[index] = previous[index] ? previous[index] + adjustedNumber : adjustedNumber;
          }
        });
        return previous;
      }, {});

      var lastRow = '';
      for (var i = 0, len = colHeader.length; i < len; i++) {
        lastRow += isNumberColumn(i, colHeader) ? '"' + sum[i].toFixed(2).replace('.', ',') + '", ' : '"",';
        // trim last ', '
        if (i === len-1) {
          lastRow = lastRow.substring(0, lastRow.length-2);
        }
      }
      return lastRow;
    }

    function isNumberColumn(index, colHeader) {
      var numberColumns = [];
      colHeader.forEach(function(entry, index) {
        if (!/Funktionen|Code|Datum|Beschreibung|Zuordnung/.test(entry.displayName)) {
          numberColumns.push(index);
        }
      });
      return _.includes(numberColumns, index);
    }
  }
})();
