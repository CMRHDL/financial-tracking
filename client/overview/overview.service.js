(function() {
  'use strict';

  angular.module('team.app').service('overview', overview);

  overview.$inject = [ '$route', 'attribution', 'gridSettings', 'resource', 'uiGridConstants' ];
  function overview($route, attribution, gridSettings, resource, uiGridConstants) {
    var service = this; // jshint ignore:line

    service.saveTableLayout = function(width, height, layout){
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

    service.getCurrentAmount = function(initial, data) {
      var total = initial;
      data.forEach(function(entry){
        total += entry.gains;
        total -= entry.expenses;
      });
      return total;
    }

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
    }

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
    }
  }
})();
