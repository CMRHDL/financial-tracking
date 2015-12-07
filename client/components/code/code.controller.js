(function() {
  'use strict';
  angular.module('team.app').controller('CodeCtrl', CodeCtrl);

  CodeCtrl.$inject = [ 'codeService' ];
  function CodeCtrl(codeService) {
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
  }
})();