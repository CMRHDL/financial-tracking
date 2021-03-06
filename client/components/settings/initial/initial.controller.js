(function() {
  'use strict';
  angular.module('team.app').controller('InitialCtrl', InitialCtrl);

  InitialCtrl.$inject = [ '$http' ];
  function InitialCtrl($http) {
    var vm = this;

    vm.initialAmount = 0;

    $http.get('/api/setting/')
      .then(
        function(res){
          if(res.data.length > 0) {
            vm.initialAmount = res.data[res.data.length-1].initialAmount;
          } else {
            vm.initialAmount = 0;
          }
        },
        function(err){
          console.log(err);
        }
      );

    vm.saveInitialAmount = saveInitialAmount;

    function saveInitialAmount() {
      vm.initialAmount = vm.initialAmount.replace(/,/, '.');
      $http.post('/api/setting', { initialAmount: vm.initialAmount})
        .then(
          function(res){
            console.log(res);
          },
          function(err){
            console.log(err);
          }
        )
    }
  }
})();
