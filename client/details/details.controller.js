(function() {
  'use strict';
  angular.module('team.app').controller('DetailsCtrl', DetailsCtrl);

  DetailsCtrl.$inject = [ 'recordset' ];
  function DetailsCtrl(recordset) {
    var vm = this;

    recordset.get().then(function(response) {
      console.log(response);
    });

  }
})();
