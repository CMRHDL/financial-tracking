(function() {
    'use strict';
    angular.module('team.app').controller('OverviewCtrl', OverviewCtrl);

    //OverviewCtrl.$inject = [ '' ];
    function OverviewCtrl($scope, $rootScope, allData) {
        var vm = this;

        vm.allData = allData.get();
        vm.data = [];

        vm.delegatesArr = allData.getDelegatesAsArr();

        init();
        function init() {
            for(var key in vm.allData.expenses) {
                vm.allData.expenses[key].forEach(function(entry){
                    var obj = {
                        date: entry.date,
                        description: entry.description,
                        bankStatemement: entry.bankStatemement,
                        refNumber: entry.refNumber,
                        gains: '',
                        expenses: entry.amount,
                    };
                    vm.delegatesArr.forEach(function(dele){
                        obj[dele.name] = dele.name === entry.delegate ? entry.amount : '';
                    });
                    vm.data.push(obj);
                });
            }
            for(var key in vm.allData.gains) {
                vm.allData.gains[key].forEach(function(entry){
                    var obj = {
                        date: entry.date,
                        description: entry.description,
                        bankStatemement: entry.bankStatemement,
                        refNumber: entry.refNumber,
                        gains: entry.amount,
                        expenses: '',
                    };
                    vm.delegatesArr.forEach(function(dele){
                        obj[dele.name] = dele.name === entry.delegate ? entry.amount : '';
                    });
                    vm.data.push(obj);
                });
            }
        }

        var colDefs = [];
        buildColDefs();
        function buildColDefs() {
            colDefs = [
                { field: 'date', name: 'Datum', enableColumnMenu: false, enableSorting: false, width: 150},
                { field: 'description', name: 'Text', enableColumnMenu: false, enableSorting: false, width: 150},
                { field: 'bankStatemement', name: 'Kto-A', enableColumnMenu: false, enableSorting: false, width: 100},
                { field: 'refNumber', name: 'Beleg', enableColumnMenu: false, enableSorting: false, width: 100},
                { field: 'gains', name: 'Einnahmen', enableColumnMenu: false, enableSorting: false, width: 100},
                { field: 'expenses', name: 'Ausgaben', enableColumnMenu: false, enableSorting: false, width: 100},
            ]
            console.log(vm.delegatesArr);
            vm.delegatesArr.forEach(function(dele){
                colDefs.push({ field: dele.name, name: dele.name, enableColumnMenu: false, enableSorting: false, width: 120});
            });
        }

        vm.gridOptions = {
            data: 'vm.data',
            columnDefs: colDefs,
        }

        // $scope.$watchCollection(allData.get(), allDataWatch, true);

        // function allDataWatch(newData) {
        //     vm.data = newData;
        //     console.log(newData);
        // }
    }
})();
