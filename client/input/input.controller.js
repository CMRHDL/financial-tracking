(function() {
  'use strict';
  angular.module('team.app').controller('InputCtrl', InputCtrl);

  InputCtrl.$inject = [ '$filter', '$rootScope', '$scope', '$uibModal', 'attribution', 'recordset', 'resource' ];
  function InputCtrl($filter, $rootScope, $scope, $uibModal, attribution, recordset, resource) {
    var vm = this;

    vm.showDatePicker = false;
    vm.data = [];
    attribution.get().then(function(response) {
      vm.delegates = response;
    });

    vm.saveAll = saveAll;
    vm.saveDataSet = saveDataSet;

    var count;

    function saveAll() {
      recordset.add(vm.data);
      // console.log(vm.data[0]);
      vm.data = [];

      /* Modal */
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
      });
    }

    function saveDataSet() {
      if(vm.progressBarValue === 100) {
        var income = vm.params.selectedDelegate.value.group === 'Einnahmearten' ? true : false;
        // var amount = $filter('currency')(vm.params.amount.value.replace(/,/, '.'));
        var amount = parseFloat(vm.params.amount.value.replace(/,/, '.')).toFixed(2);
        vm.data.push({
          amount: amount,
          attribution: vm.params.selectedDelegate.value,
          date: vm.params.date.value,
          description: vm.params.description.value,
          gains: income ? amount : '',
          expenses: income ? '' : amount,
        });
        vm.params.amount.value = undefined;
        vm.params.description.value = undefined;
        vm.params.selectedDelegate.value = null;
      }
    }

    var deleteCell = '<button ng-click="grid.appScope.delete(row)" title="Datensatz entfernen">X</button>';

    vm.gridOptions = {
      data: 'vm.data',
      enableColumnResizing: true,
      columnDefs: [
        { field: 'date', name:'Datum', enableColumnMenu: false, enableSorting: false, width: 155,
          cellTemplate: resource.templates.table_cell_date
        },
        { field: 'description', name:'Beschreibung', enableColumnMenu: false, enableSorting: false},
        { field: 'amount', name:'Betrag', enableColumnMenu: false, enableSorting: false,
          cellTemplate: resource.templates.table_cell_number
        },
        { field: 'attribution.displayName', name:'Zuordnung', enableColumnMenu: false, enableSorting: false},
        { field: 'attribution.group', name:'Art', enableColumnMenu: false, enableSorting: false},
        { field: 'x', name:'X', enableColumnMenu: false, enableSorting: false, width: '5%', cellTemplate: deleteCell},
      ],
      appScopeProvider: {
        delete : function(row) {
          vm.data.splice(vm.data.indexOf(row.entity), 1);
        },
      }
    }

    vm.progressBarValue = 0;
    vm.progressBarType = 'info';

    vm.params = {
      date: { value: null, tracked: false },
      amount: { value: null, tracked: false },
      selectedDelegate: { value: null, tracked: false },
      description: { value: null, tracked: false },
    }


    $scope.$watch('vm.params', parseParams, true);

    function parseParams() {
      for(var key in vm.params) {
        if(vm.params[key].value && !vm.params[key].tracked) {
          vm.progressBarValue += 25;
          vm.params[key].tracked = true;
        }
        if(!vm.params[key].value && vm.params[key].tracked) {
          vm.progressBarValue -= 25;
          vm.params[key].tracked = false;
        }
      }

      if(vm.progressBarValue == 100) {
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
})();