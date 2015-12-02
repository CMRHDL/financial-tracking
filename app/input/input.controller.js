(function() {
  'use strict';
  angular.module('team.app').controller('InputCtrl', InputCtrl);

  InputCtrl.$inject = [ '$filter', '$rootScope', '$scope', 'allData', '$uibModal' ];
  function InputCtrl($filter, $rootScope, $scope, allData, $uibModal) {
    var vm = this;

    vm.showDatePicker = false;
    vm.data = [];
    vm.delegates = allData.getDelegates();
    vm.delegatesArr = allData.getDelegatesAsArr();
    vm.bankStatement = "1-1-1";


    vm.saveAll = saveAll;
    vm.init = init;
    vm.saveDataSet = saveDataSet;
    vm.getSaveState = getSaveState;

    var saveState, count;

    function init() {
      bankPosNr += 1;
      vm.params.amount.value = undefined;
      vm.params.description.value = undefined;
      bankBuildStatement();
    }
    function getSaveState() {
      saveState = vm.params.amount.value && vm.bankStatement && vm.params.description.value && vm.params.date.value && vm.params.selectedDelegate.value
      return saveState ? 'btn-success' : 'btn-warning';
    }

    function saveAll() {
      // kindOf, prop, entry
      count = 0;
      vm.data.forEach(function(entry){
        allData.add(entry);
        count++;
      });
      vm.data = [];
          /* Modal */

      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
        count: function () {
          return count;
        }
        }
      });
    }

    function saveDataSet() {
      if(saveState) {
        vm.data.push({
          amount: $filter('currency')(vm.params.amount.value.replace(/,/, '.')),
          bankStatemement: vm.bankStatement,
          description: vm.params.description.value,
          date: $filter('date')(vm.params.date.value, 'dd.MM.yyyy', 'CET'),
          delegate: vm.params.selectedDelegate.value.name,
          type: vm.params.selectedDelegate.value.type === 'Einnahmearten' ? 'Einnahme' : 'Ausgabe',
        });
      }

      vm.params.amount.tracked = false;
      vm.params.description.tracked = false;
      vm.progressBarValue = 50;
      vm.progressBarType = 'info';
    }

    var deleteCell = '<button ng-click="grid.appScope.delete(row)" title="Datensatz entfernen">X</button>';

    vm.gridOptions = {
      data: 'vm.data',
      enableColumnResizing: true,
      columnDefs: [
        { field: 'date', name:'Datum', enableColumnMenu: false, enableSorting: false, width: 155},
        { field: 'description', name:'Beschreibung', enableColumnMenu: false, enableSorting: false},
        { field: 'bankStatemement', name:'Kto-Auszug', enableColumnMenu: false, enableSorting: false},
        { field: 'amount', name:'Betrag', enableColumnMenu: false, enableSorting: false,
          cellTemplate: '<div class="grid-number-cell">{{row.entity[col.field]}}</div>'
        },
        { field: 'delegate', name:'Zuordnung', enableColumnMenu: false, enableSorting: false},
        { field: 'type', name:'Art', enableColumnMenu: false, enableSorting: false},
        { field: 'x', name:'X', enableColumnMenu: false, enableSorting: false, width: '5%', cellTemplate: deleteCell},
      ],
      appScopeProvider: {
        delete : function(row) {
          vm.data.splice(vm.data.indexOf(row.entity), 1);
        },
      }
    }

    var bankstatementNr = 1;
    var bankPageNr = 1;
    var bankPosNr = 1;

    vm.bankFinishPage = bankFinishPage;
    vm.bankFinishStatement = bankFinishStatement;

    function bankFinishPage(){
      bankPageNr += 1;
      bankPosNr = 1;
      bankBuildStatement();
    }
    function bankFinishStatement(){
      bankPageNr = 1;
      bankPosNr = 1;
      bankstatementNr += 1;
      bankBuildStatement();
    }
    function bankBuildStatement() {
      vm.bankStatement = bankstatementNr + "-" + bankPageNr + "-" + bankPosNr;
    }

    vm.progressBarValue = 0;
    vm.progressBarType = 'info';

    vm.params = {
      date: { value: null, tracked: false },
      amount: { value: null, tracked: false },
      selectedDelegate: { value: null, tracked: false },
      description: { value: null, tracked: false },
    }


    $scope.$watch('vm.params', function(newData){
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
    }, true);
  }

  angular.module('team.app').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, count) {

    $scope.count = count;

    $scope.ok = function () {
    $uibModalInstance.close();
    };
  });
})();