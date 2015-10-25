'use strict';

describe('Controller: InputCtrl', function () {

  beforeEach(module('team.app'));

  var InputCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InputCtrl = $controller('InputCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
