(function() {
  'use strict';
  angular.module('team.app').controller('InputCtrl', InputCtrl);

  InputCtrl.$inject = [ '$filter', '$scope', '$uibModal', 'attribution', 'codeService', 'recordset', 'resource', 'util' ];
  function InputCtrl($filter, $scope, $uibModal, attribution, codeService, recordset, resource, util) {
    var vm = this;

    vm.codes = [];
    vm.data = [];
    vm.showDatePicker = false;

    attribution.get().then(function(response) {
      vm.delegates = response;
    });

    vm.openNewAttributionDialog = openNewAttributionDialog;
    vm.refeshPage = refeshPage;
    vm.saveAll = saveAll;
    vm.saveDataSet = saveDataSet;

    function openNewAttributionDialog() {
      var attributionDialog = $uibModal.open({
        animation: false,
        templateUrl: 'attribution-dialog.html',
        controller: 'AttributionDialogCtrl',
        size: 'lm',
      });

      attributionDialog.result.then(function () {
        attribution.get().then(function(response) {
          vm.delegates = response;
        });
      }, function () {
        attribution.get().then(function(response) {
          vm.delegates = response;
        });
      });
    }

    function refeshPage() {
      location.reload();
    }

    function saveAll() {
      if(vm.data.length > 0){
        recordset.add(vm.data);
        vm.codes.push(codeService.getCode());
        codeService.add(vm.codes);
        vm.data = [];
        vm.codes = [];
        /* Modal */
        var modalInstance = $uibModal.open({
          animation: false,
          templateUrl: 'hue.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
        });
      }
    }

    function saveDataSet() {
      if(vm.progressBarValue === 100) {
        var income = vm.params.selectedDelegate.model.group === 'Einnahmearten' ? true : false;
        // var amount = $filter('currency')(vm.params.amount.model.replace(/,/, '.'));
        var amount = parseFloat(vm.params.amount.model.replace(/,/, '.')).toFixed(2);
        vm.data.push({
          amount: amount,
          attribution: vm.params.selectedDelegate.model,
          date: vm.params.date.model,
          description: vm.params.description.model,
          gains: income ? amount : '',
          expenses: income ? '' : amount,
          code: codeService.getCode(),
        });
        vm.codes.push(codeService.getCode());
        vm.params.amount.model = undefined;
        vm.params.description.model = undefined;
        vm.params.selectedDelegate.model = null;
        codeService.increase('position');
      }
    }

    var deleteCell = '<button ng-click="grid.appScope.delete(row)" title="Datensatz entfernen">X</button>';

    vm.gridOptions = {
      data: 'vm.data',
      enableColumnResizing: true,
      columnDefs: [
        { field: 'code', name:'Code', enableColumnMenu: false, enableSorting: false, width: 120},
        { field: 'date', name:'Datum', enableColumnMenu: false, enableSorting: false, width: 155,
          cellTemplate: resource.templates.table_cell_date
        },
        { field: 'description', name:'Beschreibung', enableColumnMenu: false, enableSorting: false},
        { field: 'amount', name:'Betrag', enableColumnMenu: false, enableSorting: false,
          cellTemplate: resource.templates.table_cell_currency
        },
        { field: 'attribution.displayName', name:'Zuordnung', enableColumnMenu: false, enableSorting: false},
        { field: 'attribution.group', name:'Art', enableColumnMenu: false, enableSorting: false},
        //{ field: 'x', name:'X', enableColumnMenu: false, enableSorting: false, width: '5%', cellTemplate: deleteCell},
      ],
      appScopeProvider: {
        delete : function(row) {
          vm.codes.splice(vm.codes.indexOf(row.entity.code), 1);
          vm.data.splice(vm.data.indexOf(row.entity), 1);
        },
        formatCurrency : function(cellValue) {
          return util.currency(cellValue);
        },
      }
    };

    vm.progressBarValue = 0;
    vm.progressBarType = 'info';

    vm.params = {
      date: { model: null, tracked: false },
      amount: { model: null, tracked: false },
      selectedDelegate: { model: null, tracked: false },
      description: { model: null, tracked: false },
    };

    recordset.getLastAddedDate().then(function(res) {
      vm.params.date.model = res && res.date && moment(res.date).toDate() || '';
    });

    $scope.$watch('vm.params', parseParams, true);

    function parseParams() {
      for(var key in vm.params) {
        if(vm.params[key].model && !vm.params[key].tracked) {
          vm.progressBarValue += 25;
          vm.params[key].tracked = true;
        }
        if(!vm.params[key].model && vm.params[key].tracked) {
          vm.progressBarValue -= 25;
          vm.params[key].tracked = false;
        }
      }

      if(vm.progressBarValue === 100) {
        vm.progressBarType = 'success';
      } else {
        vm.progressBarType = 'info';
      }
    }
  }

  angular.module('team.app').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
      $uibModalInstance.close();
    };
    $scope.overview = function () {
      window.location = '/#/overview';
      $uibModalInstance.close();
    };
  });

  angular.module('team.app').controller('AttributionDialogCtrl', function ($scope, $uibModalInstance) {
    $scope.close = function () {
      $uibModalInstance.close();
    };
  });
})();
