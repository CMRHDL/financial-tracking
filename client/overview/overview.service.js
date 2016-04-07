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

    var total, initial;
    service.getCurrentAmount = function(initial, data) {
      initial = initial;
      var total = initial;
      data.forEach(function(entry){
        total += entry.gains;
        total -= entry.expenses;
      });
      return total;
    };

    service.buildColDefs = function(attributionsWithValue) {
      var colDefs = [
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
        colDefs[5].editableCellValues = response;
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

    service.exportData = function(gridApi) {
      var colHeader = uiGridExporterService.getColumnHeaders(gridApi.grid, uiGridExporterConstants.VISIBLE);
      var gridData = uiGridExporterService.getData(gridApi.grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE, false);
      var csv = uiGridExporterService.formatAsCsv(
        uiGridExporterService.getColumnHeaders(gridApi.grid, uiGridExporterConstants.VISIBLE),
        uiGridExporterService.getData(gridApi.grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE, false)
      );
      //var finalData = '"Ausgangswert",' + initial + ',"Endwert",' + total + '\n\n' + csv + '\n\n'
      buildCsvFooter(colHeader, gridData);
    };

    function buildCsvFooter(colHeader, gridData) {
      var csvFooter = "";

      var sums = {};

      colHeader.forEach(function(entry, index) {
        sums[index] = {
          index: index,
          name: entry.displayName,
          sum: 0,
        };
      });

      sums = gridData.reduce(function(previous, current) {
        current.forEach(function(entry, index) {
          var currentValue;

          if (typeof entry.value === 'string') {
            currentValue = parseFloat(entry.value.replace(',', '.'));
          }
          if (typeof currentValue === 'number' && currentValue) {
            previous[index].sum += currentValue;
          }
        });
        return previous;
      }, sums);

      setTimeout(function(){
            console.log(sums);
      }, 100);

      for (var i = 0, len = colHeader.length; i < len; i++) {
        switch (colHeader[i].displayName) {
          case "Code":
          case "Datum":
          case "Beschreibung":
          case "Zuordnung":
            csvFooter += '"",'
            break;
          case "Einnahmen":

          case "Ausgaben":
            break;
          default:
            // csvFooter +=
            break;
        }
      }

      return csvFooter;
    }
  }
})();
