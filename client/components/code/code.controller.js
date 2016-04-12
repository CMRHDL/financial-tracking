(function() {
  'use strict';
  angular.module('team.app').controller('CodeCtrl', CodeCtrl);

  CodeCtrl.$inject = [ 'codeService', 'resource' ];
  function CodeCtrl(codeService, resource) {
    var code = this;

    code.decrease = decrease;
    code.increase = increase;
    code.set = set;

    codeService.getHighestCode().then(function(response) {
      code.codes = response;
    });

    codeService.getHighestCodeByYear(2014).then(function(response) {
      console.log(response);
    });

    code.resource = resource;
    code.secureMode = true;

    function decrease(type) {
      codeService.decrease(type);
      getCodes();
    }

    function increase(type) {
      codeService.increase(type);
      getCodes();
    }

    function set(type, number) {
      codeService.set(type, number);
      getCodes();
    }

    function getCodes() {
      code.codes = codeService.get();
    }
  }
})();
