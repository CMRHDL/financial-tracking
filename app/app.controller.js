(function() {
    'use strict';
    angular.module('team.app').controller('AllCtrl', AllCtrl);

    //AllCtrl.$inject = [ '' ];
    function AllCtrl($scope, $rootScope) {
        var all = this;

        all.addDelegate = addDelegate;
        all.removeDelegate = removeDelegate;

        function addDelegate(delegate) {
            all.delegates.push(delegate);
        }

        function removeDelegate(delegate) {
            all.delegates.splice(all.delegates.indexOf(delegate),1);
        }

    }
})();
