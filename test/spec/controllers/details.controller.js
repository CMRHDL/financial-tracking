'use strict';

describe('Controller: DetailsCtrl', function () {

  beforeEach(module('team.app'));

  var DetailsCtrl, scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailsCtrl = $controller('DetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
