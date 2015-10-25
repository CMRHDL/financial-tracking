(function() {
    'use strict';
    angular.module('team.app').controller('InputCtrl', InputCtrl);

    InputCtrl.$inject = [ '$filter', '$rootScope', '$scope', 'allData' ];
    function InputCtrl($filter, $rootScope, $scope, allData) {
        var vm = this;

        vm.addDelegate = addDelegate;
        vm.amount = undefined;
        vm.data = [];
        vm.delegates = allData.getDelegates();
        vm.delegatesArr = allData.getDelegatesAsArr();
        vm.description = undefined;

        vm.saveAll = saveAll;
        vm.init = init;
        vm.saveDataSet = saveDataSet;

        function init() {
            vm.amount = undefined;
            vm.description = undefined;
        }

        function saveAll() {
            // kindOf, prop, entry
            vm.data.forEach(function(entry){
                allData.add(entry);
            });
            vm.data = [];
        }

        function saveDataSet() {
            vm.data.push({ 
                amount: vm.amount,
                bankStatemement: vm.bankStatement,
                description: vm.description,
                date:$filter('date')(new Date(), 'dd.MMMM.yyyy HH:mm', 'CET'),
                delegate: vm.selectedDelegate.name,
                type: vm.selectedDelegate.type === 'Einnahmearten' ? 'Einnahme' : 'Ausgabe',
            });
        }

        function addDelegate(delegate) {
            allData.addDelegate(delegate.indexOf('-') > -1 ? 'expenses' : 'gains', delegate.replace(/-/, ''));
        }

        var deleteCell = '<button ng-click="grid.appScope.delete(row)" title="Datensatz entfernen">X</button>';

        vm.gridOptions = {
            data: 'vm.data',
            enableColumnResizing: true,
            columnDefs: [
                { field: 'date', name:'Erstellt am', enableColumnMenu: false, enableSorting: false, width: 155},
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

    }
})();
