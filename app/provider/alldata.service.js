(function() {
    'use strict';

    angular.module('team.app').service('allData', allData);

    //allData.$inject = [''];
    function allData() {

        var service = this; // jshint ignore:line
        var refNumber = 1;

        service.delegates = {
            gains: ['Kulturamt', 'Spenden', 'Beiträge'],
            expenses: ['Miete', 'Energie', 'Versicherung'],
        };

        service.delegatesArr = [];

        service.allData = {
            gains: {},
            expenses: {},
        };

        service.update = function() {

        };

        service.get = function() {
            return service.allData;
        };

        service.getDelegates = function() {
            return service.delegates;
        };

        service.getDelegatesAsArr = function() {
            return service.delegatesArr;
        };

        service.add = function(entry) {
            var kindOf = entry.type === "Einnahme" ? 'gains' : 'expenses';
            entry.refNumber = refNumber;
            service.allData[kindOf][entry.delegate].push(entry);
            refNumber++;
        };

        service.addDelegate = function(kindOf, prop) {
            service.delegates[kindOf].push(prop);
            service.allData[kindOf][prop] = [];
            service.delegatesArr.push({ name: prop, type: kindOf === 'gains' ? 'Einnahmearten' : 'Ausgabearten' });
        };

        service.remove = function() {

        };

        service.clear = function() {

        };

        init();
        function init() {
            service.delegates.gains.forEach(function(entry){
                service.delegatesArr.push({ name: entry, type: 'Einnahmearten' });
                service.allData.gains[entry] = [];
            });

            service.delegates.expenses.forEach(function(entry){
                service.delegatesArr.push({ name: entry, type: 'Ausgabearten' });
                service.allData.expenses[entry] = [];
            });
            console.log(service.delegatesArr);
        }

    }
})();