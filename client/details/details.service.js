(function() {
  'use strict';
  angular.module('team.app').service('details', details);

  details.$inject = [ '$http' ];
  function details($http) {
    var service = this; // jshint ignore:line

    service.getInitial = () => Rx.Observable.fromPromise($http.get('/api/setting/'));

  }
})();
