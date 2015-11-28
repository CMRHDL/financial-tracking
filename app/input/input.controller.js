(function() {
    'use strict';
    angular.module('team.app').controller('InputCtrl', InputCtrl);

    InputCtrl.$inject = [ '$filter', '$rootScope', '$scope', 'allData', '$uibModal' ];
    function InputCtrl($filter, $rootScope, $scope, allData, $uibModal) {
        var vm = this;

        vm.showDatePicker = false;
        vm.amount = undefined;
        vm.data = [];
        vm.delegates = allData.getDelegates();
        vm.delegatesArr = allData.getDelegatesAsArr();
        vm.description = undefined;
        vm.bankStatement = "1-1-1";

        vm.saveAll = saveAll;
        vm.init = init;
        vm.saveDataSet = saveDataSet;
        vm.getSaveState = getSaveState;

        var saveState, count;

        function init() {
            bankPosNr += 1;
            vm.amount = undefined;
            vm.description = undefined;
            bankBuildStatement();   
        }
        function getSaveState() {
            saveState = vm.amount && vm.bankStatement && vm.description && vm.date && vm.selectedDelegate
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
                    amount: vm.amount,
                    bankStatemement: vm.bankStatement,
                    description: vm.description,
                    date: $filter('date')(vm.date, 'dd.MMMM.yyyy', 'CET'),
                    delegate: vm.selectedDelegate.name,
                    type: vm.selectedDelegate.type === 'Einnahmearten' ? 'Einnahme' : 'Ausgabe',
                });
            }
        }

        var deleteCell = '<button ng-click="grid.appScope.delete(row)" title="Datensatz entfernen">X</button>';

        vm.gridOptions = {
            data: 'vm.data',
            enableColumnResizing: true,
            columnDefs: [
                { field: 'date', name:'Datum', enableColumnMenu: false, enableSorting: false, width: 155},
                { field: 'description', name:'Beschreibung', enableColumnMenu: false, enableSorting: false},
                { field: 'bankStatemement', name:'Kto-Auszug', enableColumnMenu: false, enableSorting: false},
                { field: 'amount', name:'Betrag in €', enableColumnMenu: false, enableSorting: false},
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

    }

    angular.module('team.app').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, count) {

      $scope.count = count;

      $scope.ok = function () {
        $uibModalInstance.close();
      };
    });
})();