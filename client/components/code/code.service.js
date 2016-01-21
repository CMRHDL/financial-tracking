(function() {
  'use strict';
  angular.module('team.app').service('codeService', codeService);

  codeService.$inject = [ '$http', 'util' ];
  function codeService($http, util) {
    var service = this; // jshint ignore:line

    service.getHighestCode = function() {
      return $http.get('/api/code/max').then(function(res){
        if(res.data && res.data.code) {
          service.codes = parseCode(res.data.code);
          setCode();
          return service.codes;
        } else {
          service.codes = {
            year: 2015,
            number: 1,
            page: 1,
            position: 1,
            code: null,
          };
          setCode();
          return service.codes;
        }
      },
      function(err){
        console.log(err);
      });
    };

    service.getHighestCodeByYear = function(year) {
      return $http.post('/api/code/maxByYear', { year: year}).then(function(res){
        return res;
      },
      function(err){
        console.log(err);
      });
    };

    service.getCode = function() {
      return service.codes.code;
    };

    service.get = function() {
      return service.codes;
    };

    service.decrease = function(type) {
      service.codes[type]--;
      setCode();
    };

    service.increase = function(type) {
      service.codes[type]++;
      setCode();
    };

    service.set = function(type, number) {
      service.codes[type] = number;
      setCode();
    };

    service.add = function(codes) {
      codes.forEach(function(entry){
        $http.post('/api/code', { code: entry }).then(function(res){
          console.log(res);
        },
        function(err){
          console.log(err);
        });
      });
    };

    function setCode() {
      service.codes.code = util.prependZeroes(service.codes.year, 4) + util.prependZeroes(service.codes.number, 3) + util.prependZeroes(service.codes.page, 2) + util.prependZeroes(service.codes.position, 2);
    }

    function parseCode(code) {
      return {
        year: code.substring(0, 4),
        // remove leading zeroes
        number: code.substring(4, 7).replace(/^0/, '').replace(/^0/, ''),
        page: code.substring(7, 9).replace(/^0/, ''),
        position: code.substring(9, 11).replace(/^0/, ''),
        code: code,
      };
    }
  }
})();