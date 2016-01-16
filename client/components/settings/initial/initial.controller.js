(function() {
  'use strict';
  angular.module('team.app').controller('InitialCtrl', InitialCtrl);

  InitialCtrl.$inject = [ 'initial', '$http' ];
  function InitialCtrl(initial, $http) {
    var vm = this;

    vm.initialAmount = 0;

    $http.get('/api/setting/')
      .then(
        function(res){
          console.log(res);
          vm.initialAmount = res.data[res.data.length-1].initialAmount;
        },
        function(err){
          console.log(err);
        }
      );

    vm.saveInitialAmount = saveInitialAmount;

    function saveInitialAmount() {
      console.log('name');
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
