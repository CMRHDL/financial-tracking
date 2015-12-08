(function() {
  'use strict';
  angular.module('team.app').controller('CodeCtrl', CodeCtrl);

  CodeCtrl.$inject = [ 'codeService', 'util' ];
  function CodeCtrl(codeService, util) {
    var code = this;

    code.decrease = decrease;
    code.incease = incease;

    code.codes = codeService.get();

    function decrease(type) {
      codeService.decrease(type);
      code.codes = codeService.get();
    }

    function incease(type) {
      codeService.incease(type);
      code.codes = codeService.get();
    }

    console.log(util.prependZeroes(1, 5));
    console.log(util.prependZeroes(55555, 5));
    console.log(util.prependZeroes(55, 3));
  }
})();